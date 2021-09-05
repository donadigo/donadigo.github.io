---
layout: tminterface-docs
title: TMInterface Guide
---

## Context modes
TMInterface diffrentiates between two context modes: the *run* mode and the *simulation* mode.

The run mode is active at all times, e.g when in a regular race or in a menu. The simulation mode is active whenever a replay is being validated. The start and end of the simulation is marked by the `S_ON_SIM_BEGIN` and `S_ON_SIM_END` messages. You can query the current mode by sending a `C_GET_CONTEXT_MODE` message to the server. The call returns an integer signifying which mode TMInterface is currently in:

```cpp
enum class ContextMode 
{
	kSimulation = 0,
	kRun = 1
};

struct GetContextModeData
{
	ContextMode mode = ContextMode::kRun;
};
```

It is important to note that the implementation of server calls may differ for each mode, e.g. calling `C_RESPAWN` in the run mode will queue a native game call inside TMInterface and in the simulation mode, it will add an input event to an event buffer instead.