---
layout: tminterface-docs
title: TMInterface Guide
---

## Interprocess communication
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