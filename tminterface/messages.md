---
layout: tminterface-docs
title: TMInterface Guide
---

## Messages
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
