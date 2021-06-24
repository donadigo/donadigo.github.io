---
layout: document
title:  TMInterface Server API
date:   2021-06-24 23:00:13 +0200
permalink: tminterface-server
---

<style>
    h2 {
        margin-top: 100px !important;
    }
</style>

TMInterface allows for external simulation control via the server API. The API allows to connect to a game instance running with TMInterface and interrupt
important game functions such as the physics step. A client can connect to as many instances of TMInterface as it wants, and one TMInterface instance can have only one
client controlling it. There can be a maximum of 16 TMInterface instances running on one system. Clients can call the API to execute console commands, analyze / override simulation state and inject inputs. 

***To get started, [view the official Python client implementation](https://github.com/donadigo/TMInterfaceClientPython).***

### Interprocess communication & message system
TMInterface uses a mapped memory buffer to communicate with the client that's currently connnected to the instance. When TMInterface is starting, it creates a new mapped file with a filename `TMInterface0` to `TMInterface15` depending on which one is currently available. The mapped file buffer is used to send / receive messages by both, the server and the client. Its size is constant: 65535 bytes. A message is a raw data buffer, typically represented by a native C++ struct. Each message has its own type, error code and the actual message data. All struct types and layouts are described in [`Shared.h`](https://github.com/donadigo/TMInterfacePublic/blob/master/Shared.h). A message can be:
* **a server call** (message type prefixed by `S_`) which is a synchronous call to the client that has to get answered by another message from the client  of type `C_PROCESSED_CALL`.
Such calls are completely synchronous, meaning that at this time, no game code is executed. If the client  is not answering in a defined time window, TMInterface
will skip the response and automatically deregister the client. This time window is configurable via the `C_SET_TIMEOUT` call.
* **a client call** which modifies the game state or retrieves it,
such as the simulation state (message type prefixed by `C_`). Such calls are picked up by the internal server thread. They can be only sent when in a server call, never outside of it.<br>

After a succcessful message exchange, the message sender is responsible for clearing the buffer - that is clearing it with 0's. An example might be:
- The client sends a `C_SET_GAME_SPEED` message to the server to set the game speed.
- The server processes the message, clears the previous message and sends an `S_RESPONSE` message back signaling that it has processed the message.
- The client now clears the memory buffer with 0's and continues execution.

A server/client message has the following structure:
{% highlight cpp %}
struct Message
{
    int32_t type;
    int32_t errorCode;
    ... data;
};
{% endhighlight %}

The first 4 bytes of the message describe its **type**, but only the first 2 bytes are used. The first byte is the message type, one of the following listed in [`Shared.h`](https://github.com/donadigo/TMInterfacePublic/blob/master/Shared.h#L25). The second byte signals if the message is ready to be read by the receiver. When the server/client is done writing the message, it sets the second byte of the type to `0xFF` to signify that the message has been written and it can be read.
This provides a synchronisation mechanism and prevents from receiving incomplete messages.

The `errorCode` describes a possible error while sending the message. If there was no error, `errorCode` is set to 0. [View possible error codes.](https://github.com/donadigo/TMInterfacePublic/blob/master/Shared.h#L456)

The **data** is the actual data of the message. The structure of this data for each message type is described in the Shared.h header file. The data can have a minimum size of 4 bytes, and the size of every data field is divisible by 4, including types like booleans. Some data types like `SimEventBufferData` can contain variable size arrays, which are written directly in the message. If the message is too long, `RESPONSE_TOO_LONG` error code will be set, and the message will be truncated.

The first 4 bytes of the variable sized array are the size of the array and after that, the actual data of the array:
{% highlight cpp %}
struct Array {
    int32_t size;
    ... data;
}
{% endhighlight %}

### Client registration
To receive messages from the server, you must first register your client. This is done by opening a mapped file with the server name of the game instance you want to connect to. To register, send a `C_REGISTER` message. If a client is already registered, the server will repond with `kClientAlreadyRegistered` error code. If the registration was successful, the error code will be 0. To deregister, send a `C_DEREGISTER` message.

### Synchronous server calls
While being registered, TMInterface will call the client on events such as a simulation step, a race step, checkpoint state change and more. Each call is completely synchronous - no game code is being executed while waiting for the client to process the request. A server call is simply a message with a special type prefixed with `S_`. Available calls that need to be handled are:
* `S_SHUTDOWN` - process server shutting down
* `S_ON_RUN_STEP` - process race physics step
* `S_ON_SIM_BEGIN` - process a start of new simulation
* `S_ON_SIM_STEP` - process a single physics simulation tick
* `S_ON_SIM_END` - process the end of a simulation
* `S_ON_CHECKPOINT_COUNT_CHANGED` - process current checkpoint count change
* `S_ON_LAPS_COUNT_CHANGED` - process current laps count change

For a description of each call [refer to the header file.](https://github.com/donadigo/TMInterfacePublic/blob/master/Shared.h#L40)
After processing the call, the client has to respond back with a message of type `C_PROCESSED_CALL`, and with the `which` field set to the call ID it responds to. The server will clear the buffer after receiving a response.

If the client fails to respond within the timeout window (default `2000ms`), the server will automatically deregister the client and will continue to run. This timeout can be configured by sending a message of type `C_SET_TIMEOUT` after registering or in one of the server calls.