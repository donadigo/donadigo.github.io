---
layout: tminterface-docs
title: TMInterface Guide
---

## Using save states
TMInterface provides builtin save state functionality, that allows you to load & restore a save state across game sessions and share them with others.
A save state is a binary file with `.bin` extension. All of your save states are saved in the `C:\Users\username\Documents\TMInterface\States` directory.

<div style="display: flex; margin-top: 30px">
    <div class="card shadow" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">Important</h5>
            <p class="card-text">
                A save state does <b>not</b> contain inputs that led to that state. For that purpose, use script files.
            </p>
        </div>
    </div>
</div>

### Save a state to a file
To save a save state into a file, use the `save_state` command:
```
save_state
```
The command saves the state at the current point in time, which is why it's worth it to bind it to a key when driving.
As seen here, no argument is provided for the filename of the save state, which means it will be generated automatically in the format of: `MapName_RaceTime_LocalTime.bin`. You can check the filename by inspecting the contents of the `States` directory, or typing `load_state ` into the console and let it complete the rest for you. 

Alternatively, you can provide your own filename:
```
save_state a01.bin
```
This will save current car state into `a01.bin`.

### Loading a save state
You can load a save state by using the `load_state` command:
```
load_state a01.bin
```
This command will load previously saved state named `a01.bin` stored in the `States` directory.

### Binding load_state
Usually, you will want to save a state once and then reload it many times to improve a certain section on a track. To quickly restore a save state, simply bind it to a key:
```
bind f "load_state state.bin"
```
This command will bind the F key on your keyboard to load the desired state for quick access.

### Combining inputs from a run restored from a save state
Because save states do not contain inputs, after finishing a run restored from a save state, you need to combine the inputs from before the save state and after it. This is done by [extracting inputs]({{ site.baseurl }}/tminterface/input-extraction) from the run you just drove, and appending the inputs into the original script.
**You might need to adjust inputs where the two runs meet to properly chain the two replays.**
