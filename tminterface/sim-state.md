---
layout: tminterface-docs
title: TMInterface Guide
---

## Simulation state
The game simulation state is represented by the [`SimStateData`](https://github.com/donadigo/TMInterfacePublic/blob/master/Shared.h#L394) structure containing multiple data buffers which represent different memory regions which contain the vehicle & game state.

The memory regions themselves are monitored by TMInterface itself and are used for functionality like save states or fast rewind in the bruteforce script. TMInterface may use additional native game methods to restore the state based on information present in some of these memory regions. It is important to note that the buffers contain instance specific fields such as pointers and array sizes. These are masked out automatically by TMInterface when restoring the state (and when calling `C_SIM_REWIND_TO_STATE`). Here is the native definition of `SimStateData`:

```cpp
#define CURRENT_FILE_VERSION 106
struct TMEvent
{
    UInt32 Time;
    int Data;
}

struct CheckpointData
{
    int32_t reserved;
    Array<uint32_t> cpStates;
    Array<TMCheckpoint> cpTimes;
};

struct SimStateData
{
    UInt32 fileVersion = CURRENT_FILE_VERSION;
    UInt32 contextMode = 0;
    UInt32 flags = 0;
    unsigned char timers[212];
    unsigned char dyna[1424];
    unsigned char sceneMobil[2168];
    unsigned char simulationWheels[3056];
    unsigned char plugSolid[68];
    unsigned char cmdBufferCore[264];
    unsigned char playerInfo[952];
    unsigned char inputState[120];

    TMEvent inputRunningState;
    TMEvent inputFinishState;
    TMEvent inputAccelerateState;
    TMEvent inputBrakeState;
    TMEvent inputLeftState;
    TMEvent inputRightState;
    TMEvent inputSteerState;
    TMEvent inputGasState;

    UInt32 numRespawns = 0;

    CheckpointData cpData;
};
```

`fileVersion` - the file version used by TMInterface used for save states. Since a save state file is effectively the binary data of `SimStateData` saved to the file, the file version is included within the structure. You can safely ignore this field in the client.

`contextMode` - the context mode which this simulation state was saved in. If the state was saved in the "run" mode (contextMode = 1), the simulation state is used in a normal race. If contextMode = 0, the simulation state is used in a validation context.

`flags` - the flags representing which buffers were successfully copied to the state data. If the buffer was not copied, it is zero initialized.

{% highlight cpp %}
enum SimStateFlags
{
	kHasTimers = 0x1,
	kHasDyna = 0x2,
	kHasSceneMobil = 0x4,
	kHasSimulationWheels = 0x8,
	kHasPlugSolid = 0x10,
	kHasCmdBufferCore = 0x20,
	kHasInputState = 0x40,
	kHasPlayerInfo = 0x80
};
{% endhighlight %}

`timers` (size: 212) - a memory region containing different game timers located at a static address. This buffer is available in both `kRun` and `kSimulation` contexts. The timers contained within this buffer are static, meaning they also incorporate the countdown time of the race. The race time can be retrived from the `playerInfo` buffer.

`dyna` (class name: `CHmsDyna`, size: 1424) - the buffer containing the most important information about the vehicle state. This buffer contains the true source of variables such as car position, velocity, rotation and more. It is unknown what other variables this class contains.

`sceneMobil` (class name: `CSceneMobil`, size: 2168) - the class representing the visual object of the car ingame. The class itself also contains important variables that affect the simulation, such as the turning rate of the car, steering strengh and direction, acceleration and brakeing.