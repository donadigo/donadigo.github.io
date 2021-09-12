---
layout: tminterface-docs
title: TMInterface Guide
---

## Available commands
### General
* `help` - Displays a short help for each command available.

    Syntax & Example: `help`

<br>
* `quit` - Immediately terminates the game process quitting the game.

    Syntax & Example: `quit`

<br>
* `set` - Sets a variable within TMInterface. Setting custom variables is not supported at the moment. If no value is provided, the variable is reset back to its default value.

    Syntax: `set [variable_name] [value]`

    Example: `set speed 2` - Set speed to `2`.<br>
    Example: `set speed` - Resets the `speed` variable back to 1.

<br>
* `vars` - Displays all available variables and their current values. The command also copies a config string into the clipboard that can be used to reproduce exact same settings at later point or share them with someone else.

    Syntax: `vars [variable name]`<br>
    Example: `vars` - displays all varialbes and their values and copies the config string into the clipboard.<br>
    Example: `vars speed` - displays the value of variable `speed`.

<br>
* `clear` - Clears the output of the console, leaving it blank.

    Syntax & Example: `clear`

<br>
* `sleep` - Synchronously sleeps an amount of specified seconds, pausing the game & render loop. You can specify a float time to sleep e.g. 0.5 seconds.

    Syntax: `sleep [time in seconds]`<br>
    Example: `sleep 2` - Sleep 2 seconds.<br>
    Example: `sleep 0.3` - Sleep 0.3 seconds.

<br>
* `bind` - Binds a key to a user-defined command. A key can be bound to a command made of multiple commands as well by separating them with a `;`. For function keys use `f1` to `f16` as the key string.

    Syntax: `bind [key] [command]`<br>
    Example: `bind u unload` - Binds the u key to the `unload` command.<br>
    Example: `bind f2 "set speed 2"` - Binds the F2 key to double the speed of the game.<br>
    Example: `bind 0 "set execute_commands false; set speed 1"` - Binds the 0 key to set `execute_commands` to false and reset the speed.

<br>
* `unbind` - Unbinds a key that has been bound before. The same bind rules apply to the key string to this command.

    Syntax: `unbind [key]`<br>
    Example: `unbind f2` - Unbinds the F2 key.

<br>
* `open_scripts_folder` - Opens the script folder that's defined by the `script_folder` variable in the Windows explorer.

    Syntax & Example: `open_scripts_folder`

<br>
* `open_stdout` - Opens the internal console used for standard output. This is not the interface console seen in game and is mostly used for outputting data when bruteforcing a replay.

    Syntax & Example: `open_stdout`

<br>
* `load_infinity` - Loads TMInfinity into the existing game client. Note that this command should only ever be executed at the beginning, in the profile menu and not anywhere else.

    Syntax & Example : `load_infinity`

<br>
* `map` - Immediately loads a specified map from the Tracks folder. Autocomplete is available and the list of tracks will be regularly refreshed while typing out the name of the map file.

    Syntax & Example : `map A01-Race.Challenge.Gbx`

### Input commands
* `press` - presses a key to steer, accelerate or respawn the car. Possible actions:
    * `up` - accelerates
    * `down` - brakes
    * `left` - steers left
    * `right` - steers right
    * `enter` - respawns
    * `delete` - restarts the current race

    <br>
    This action supports ranged timestamps such as `0-20000` or `1200-9000`. The first timestamp marks key press and the second, it's release.

    Syntax: `press [action]`<br>
    Example `press up` - accelerates the car<br>
    Example `1000-5000 press left` - presses the left key for 4 seconds, starting at 1 second

<br>
* `rel` - releases a key, previously pressed with `press`

    Syntax: `rel [action]`<br>
    Example: `rel up` - releases the up key

<br>
* `steer` - steers the car using an analog value. The value is an integer in the range of `[-65536,65536]` and represents how much the car will steer and its direction. A negative value represents a steer to the left and a positive value, steer to the right. A `0` value means no steer. This range is the "normal" range that is possible to actually produce by real hardware but an extended range is available with TMInterface of `[-6553600, 6553600]`. Note however that using a value outside of the normal range would be considered a run that is not physically possible with physical hardware, therefore, cheating. This range is only possible because of the internal representation used by the game. This range can be enabled by setting `extended_steer` to `true`.
Additionally `steer` supports ranged timestamps, a command `1000-2000 steer 40000` will be automatically translated to:
```
1000 steer 40000
2000 steer 0
```
    Syntax: `steer [value]`<br>
    Example: `steer 65536` — steers fully to the right<br>
    Example: `steer -20000` — steers slightly to the left

<br>
* `gas` - accelerates the car using an analog value. The value is an integer in the range of `[-65536,65536]` and represents how much the car will accelerate or brake. Note that TMNF/TMUF do not support analog acceleration. The action can still be emitted but the a larger or smaller value will not change the strength of the car acceleration. The exact value at which the car starts accelerating is `-19661` and for braking `19661`.
Additionally `gas` supports ranged timestamps, a command `1000-2000 gas 40000` will be automatically translated to:
```
1000 gas 40000
2000 gas 0
```
    Syntax: `gas [value]`<br>
    Example: `gas -50000` — accelerate<br>
    Example: `gas 50000` - brake<br>
    Example: `gas 0` — reset accelerate and brake

### Run & input playback
* `load` - Loads a script file with game inputs from the current directory, that can be controlled by setting the `scripts_folder` variable. If a file does not exist or the interface could not parse the file, an error will be displayed.
    
    Syntax: `load [filename.txt]`<br>
    Example: `load a01.txt`

<br>
* `unload` - Unloads the current script file loaded with `load` or replayed with `replay`. Unloading the file will make the tool not replay any inputs. If no file is currently loaded, this command will do nothing.

    Syntax & Example: `unload`

<br>
* `replay` - Reads inputs from the current replay simulation and stores them so they will be replayed in a real run. To choose a replay to be validated, open the replay, click "Validate", wait for the simulation to play out and then execute this command. The inputs can be unloaded using `unload`. An additional time parameter may be specified to cut off inputs after this time.
This command can be used anytime after the simulation is done because TMInterface keeps the inputs in the memory at all times, even after `unload` is executed.

    Syntax: `replay [time to stop in milliseconds]`<br>
    Example: `replay` - replays the validation file in its entirety.<br>
    Example: `replay 30000` - replays validation file only to 30s. After that, the control is handed back to the player.

### Save states
* `save_state`: saves the current race state into a 10kb file, stored in the `States` folder inside your `Documents\TMInterface` directory. This file can then be used to restore the exact state later on and can be also shared with others. The file itself *does not* contain the inputs used to get to that state. The primary way to share runs is still sharing the inputs file and save states are great for quick trial and error.

    Syntax: `save_state [filename.bin]`<br>
    Example: `save_state` - saves the current state into a file with an auto-generated filename<br>
    Example: `save_state state.bin` - saves the current state into a file named `state.bin`

<br>
* `load_state`: loads the provided file saved with `save_state`. Note that loading a state from another environment or not loading it in the same race it was saved in, will invalidate the run. You can still however drive the run normally and then merge inputs from before the save state and after it.

    Syntax & Example: `load_state state.bin`

<br>
* `state_info`: displays information about the provided state file such as its version, race time, map name it was saved on and car position

    Syntax & Example: `state_info state.bin`

### Simulation control
* `dump_states` - Dumps internal state names and their corresponding memory address tracked by TMInterface. This command can be used within a normal race to locate memory that tracks car & race state.

    Syntax & Example: `dump_states`

<br>
* `dump_inputs` - Dumps inputs that has been loaded by replay validation. To dump the inputs, execute this command after validating a replay. The inputs will be also copied into the clipboard and can be directly pasted into a script file after.

    Syntax: `dump_inputs [filename.txt]`<br>
    Example: `dump_inputs` - dumps inputs from the currently validated replay and copies them into the clipboard.<br>
    Example: `dump_inputs inputs.txt` - saves inputs from the currently validated replay and saves them to `inputs.txt` located in the Scripts folder.

<br>
* `recover_inputs` - Recovers inputs from the current race in run mode. This command is useful when it is not possible to finish the run to save the inputs. The command will print out all the inputs that happened until the current time and copy them into the clipboard, just like `dump_inputs`.

    Syntax: `recover_inputs [filename.txt]`
    Example: `recover_inputs` - recovers inputs from the current race and copies them into the clipboard.<br>
    Example: `recover_inputs inputs.txt` - saves inputs from the current race and saves them to `inputs.txt` located in the Scripts folder.

### Cheats
* `tp` - Teleports the car to a specified X Y Z coordinates. This command invalidates the run.

    Syntax & Example: `tp 500 9 500` - teleports the car to X: 500, Y: 9, Z: 500

<br>
* `warp` - Changes the race time to a specified time in milliseconds. The value is clamped to a range of `[-2147483640, 2147483640]`. This command invalidates the run.

    Syntax & Example: `warp 15510` - changes the race time to 15.51 seconds ingame

### Widgets
* `toggle_info` - Toggles an info window that displays the raw vectors of position, velocity and the rotation of the car. The command will show the window if it is currently hidden and hide it otherwise.
    Syntax & Example: `toggle_info`

<br>
* `toggle_speed` - Toggles a window visualizing the display speed of the car over time. The command will show the window if it is currently hidden and hide it otherwise.

    Syntax & Example: `toggle_speed`

<br>
* `toggle_inputs` - Toggles a window displaying the current inputs applied as seen by the game. The display will change form dynamically based on the current input. Any input is visualized including tool's own injected inputs and live player inputs. The input display supports two visualization types, see the `viz_type` variable. You can have multiple input display visible at one time. To add new display use the `add_input_display` command. The command will show the window if it is currently hidden and hide it otherwise.

    Syntax & Example: `toggle_inputs`

<br>
* `toggle_console` - Toggles the main console window. The command will show the window if it is currently hidden and hide it otherwise.

    Syntax & Example: `toggle_console`

<br>
* `add_input_display` - Adds a new input display, given a script file. The new input display gets assigned a new ID, which can be viewed using `input_displays`. The inputs loaded from such script are not injected into the game, only visualized in the display.

    Syntax: `add_input_display [filename.txt]`<br>
    Example: `add_input_display b05.txt` - adds an input display that visualizes inputs of a script file `b05.txt`

<br>
* `remove_input_display` - Removes an input display given its ID. To see all currently available displays, use `input_displays`.

    Syntax: `remove_input_display [id]`<br>
    Example: `remove_input_display 2` - removes the input display of ID `2`

<br>
* `input_displays` - Displays all available input displays currently loaded, their ID's and script files they visualize.

    Syntax & Example: `input_displays`

<br>
* `toggle_editor` - Unfinished.

### Bruteforce
* `add_trigger` - Adds a trigger to evaluate the car state when the car hits the specified trigger. The coordinates are specified using a format of: `x1 y1 z1 x2 y2 z2`, all elements are in game units. The two points mark the coordinates of the start and end of the cuboid. The `toggle_info` command can be used to obtain the coordinates at a desired point. 

    Syntax & Example: `add_trigger 500 40 500 800 90 800` - adds a trigger at position `[500 40 500]` expanding to coordinates `[800 90 800]`.

<br>
* `remove_trigger` - Removes a trigger from the trigger list, provided the index. To list all triggers and their indexes use `triggers`.

    Syntax & Example: `remove_trigger 1` - removes the first trigger provided it was added previously.

<br>
* `triggers` - Lists all available triggers and their indexes.

    Syntax & Example: `triggers`