---
layout: document
title:  TMInterface Commands
date:   2021-06-24 23:00:13 +0200
permalink: tminterface-commands
---

<style>
    h2 {
        margin-top: 100px !important;
    }
</style>

## Commands
### General
* `help` - Displays a short help for each command available.

    Syntax & Example: `help`

* `quit` - Immediately terminates the game process quitting the game.

    Syntax & Example: `quit`

* `set` - Sets a variable within TMInterface. Setting custom variables is not supported at the moment. If no value is provided, the variable is reset back to its default value.

    Syntax: `set [variable_name] [value]`

    Example: `set speed 2` - Set speed to `2`.

    Example: `set speed` - Resets the `speed` variable back to 1.

* `vars` - Displays all available variables and their current values. The command also copies a config string into the clipboard that can be used to reproduce exact same settings at later point or share them with someone else.

    Syntax: `vars [variable name]`

    Example: `vars` - displays all varialbes and their values and copies the config string into the clipboard.

    Example: `vars speed` - displays the value of variable `speed`.

* `clear` - Clears the output of the console, leaving it blank.

    Syntax & Example: `clear`

* `sleep` - Synchronously sleeps an amount of specified seconds, pausing the game & render loop. You can specify a float time to sleep e.g. 0.5 seconds.

    Syntax: `sleep [time in seconds]`

    Example: `sleep 2` - Sleep 2 seconds.

    Example: `sleep 0.3` - Sleep 0.3 seconds.

* `bind` - Binds a key to a user-defined command. A key can be bound to a command made of multiple commands as well by separating them with a `;`. For function keys use `f1` to `f16` as the key string.

    Syntax: `bind [key] [command]`

    Example: `bind u unload` - Binds the u key to the `unload` command.

    Example: `bind f2 "set speed 2"` - Binds the F2 key to double the speed of the game.

    Example: `bind 0 "set execute_commands false; set speed 1"` - Binds the 0 key to set `execute_commands` to false and reset the speed.

* `unbind` - Unbinds a key that has been bound before. The same bind rules apply to the key string to this command.

    Syntax: `unbind [key]`

    Example: `unbind f2` - Unbinds the F2 key.

* `open_scripts_folder` - Opens the script folder that's defined by the `script_folder` variable in the Windows explorer.

    Syntax & Example: `open_scripts_folder`

* `open_stdout` - Opens the internal console used for standard output. This is not the interface console seen in game and is mostly used for outputting data when bruteforcing a replay.

    Syntax & Example: `open_stdout`

* `load_infinity` - Loads TMInfinity into the existing game client. Note that this command should only ever be executed at the beginning, in the profile menu and not anywhere else.

    Syntax & Example : `load_infinity`

* `map` - Immediately loads a specified map from the Tracks folder. Autocomplete is available and the list of tracks will be regularly refreshed while typing out the name of the map file.

    Syntax & Example : `map A01-Race.Challenge.Gbx`

### Input control
* `press` - "presses" a provided key to steer, accelerate or respawn the car. Possible actions:
    * `up` - accelerates
    * `down` - brakes
    * `left` - steers left
    * `right` - steers right
    * `enter` - respawns
    * `delete` - restarts the current race

    This action supports ranged timestamps such as `0-20000` or `1200-9000`. The first timestamp marks key press and the second, it's release.

    Syntax: `press [action]`

    Example `press up` - accelerates the car

    Example `1000-5000 press left` - presses the left key for 4 seconds, starting at 1 second

* `rel` - "releases" a provided key, previously pressed with `press`

    Syntax: `rel [action]`

    Example: `rel up` - releases the up key

* `steer` - steers the car using an analog value. The value is an integer in the range of `[-65536,65536]` and represents how much the car will steer and its direction. A negative value represents a steer to the left and a positive value, steer to the right. A `0` value means no steer. This range is the "normal" range that is possible to actually produce by real hardware but an extended range is available with TMInterface of `[-6553600, 6553600]`. Note however that using a value outside of the normal range would be considered a run that is not physically possible with physical hardware, therefore, cheating. This range is only possible because of the internal representation used by the game. This range can be enabled by setting `extended_steer` to `true`.
Additionally `steer` supports ranged timestamps, a command `1000-2000 steer 40000` will be automatically translated to:
```
1000 steer 40000
2000 steer 0
```

* `gas` - accelerates the car using an analog value. The value is an integer in the range of `[-65536,65536]` and represents how much the car will accelerate or brake. Note that TMNF/TMUF do not support analog acceleration. The action can still be emitted but the a larger or smaller value will not change the strength of the car acceleration. The exact value at which the car starts accelerating is `-19661` and for braking `19661`.
Additionally `gas` supports ranged timestamps, a command `1000-2000 gas 40000` will be automatically translated to:
```
1000 gas 40000
2000 gas 0
```

### Run & input playback
* `load` - Loads a script file with game inputs from the current directory, that can be controlled by setting the `scripts_folder` variable. If a file does not exist or the interface could not parse the file, an error will be displayed.
    
    Syntax: `load [file_name.txt]`

    Example: `load a01.txt`

* `unload` - Unloads the current script file loaded with `load` or replayed with `replay`. Unloading the file will make the tool not replay any inputs. If no file is currently loaded, this command will do nothing.

    Syntax & Example: `unload`

* `replay` - Reads inputs from the current replay simulation and stores them so they will be replayed in a real run. To choose a replay to be validated, open the replay, click "Validate", wait for the simulation to play out and then execute this command. The inputs can be unloaded using `unload`. An additional time parameter may be specified to cut off inputs after this time.
This command can be used anytime after the simulation is done because TMInterface keeps the inputs in the memory at all times, even after `unload` is executed.

    Syntax: `replay [time to stop in milliseconds]`

    Example: `replay` - replays the validation file in its entirety.

    Example: `replay 30000` - replays validation file only to 30s. After that, the control is handed back to the player.

### Save states
* `save_state`: saves the current race state into a 10kb file, stored in the `States` folder inside your `Documents\TMInterface` directory. This file can then be used to restore the exact state later on and can be also shared with others. The file itself *does not* contain the inputs used to get to that state. The primary way to share runs is still sharing the inputs file and save states are great for quick trial and error.

    Syntax: `save_state [filename.bin]`
    
    Example: `save_state` - saves the current state into a file with an auto-generated filename

    Example: `save_state state.bin` - saves the current state into a file named `state.bin`

* `load_state`: loads the provided file saved with `save_state`. Note that loading a state from another environment or not loading it in the same race it was saved in, will invalidate the run. You can still however drive the run normally and then merge inputs from before the save state and after it.

    Syntax & Example: `load_state state.bin`

* `state_info`: displays information about the provided state file such as its version, race time, map name it was saved on and car position

    Syntax & Example: `state_info state.bin`

### Simulation control
* `dump_states` - Dumps internal state names and their corresponding memory address tracked by TMInterface. This command can be used within a normal race to locate memory that tracks car & race state.

    Syntax & Example: `dump_states`

* `dump_inputs` - Dumps inputs that has been loaded by replay validation. To dump the inputs, execute this command after validating a replay. The inputs will be also copied into the clipboard and can be directly pasted into a script file after.

    Syntax: `dump_inputs [filename.txt]`

    Example: `dump_inputs` - dumps inputs from the currently validated replay and copies them into the clipboard.

    Example: `dump_inputs inputs.txt` - saves inputs from the currently validated replay and saves them to `inputs.txt` located in the Scripts folder.


* `recover_inputs` - Recovers inputs from the current race in run mode. This command is useful when it is not possible to finish the run to save the inputs. The command will print out all the inputs that happened until the current time and copy them into the clipboard, just like `dump_inputs`.

    Syntax: `recover_inputs [filename.txt]`

    Example: `recover_inputs` - recovers inputs from the current race and copies them into the clipboard.

    Example: `recover_inputs inputs.txt` - saves inputs from the current race and saves them to `inputs.txt` located in the Scripts folder.

### Cheats
* `tp` - Teleports the car to a specified X Y Z coordinates. This command invalidates the run.

    Syntax & Example: `tp 500 9 500` - teleports the car to X: 500, Y: 9, Z: 500

* `warp` - Changes the race time to a specified time in milliseconds. The value is clamped to a range of `[-2147483640, 2147483640]`. This command invalidates the run.

    Syntax & Example: `warp 15510` - changes the race time to 15.51 seconds ingame

### Widgets
* `toggle_info` - Toggles an info window that displays the raw vectors of position, velocity and the rotation of the car. The command will show the window if it is currently hidden and hide it otherwise.

    Syntax & Example: `toggle_info`

* `toggle_speed` - Toggles a window visualizing the display speed of the car over time. The command will show the window if it is currently hidden and hide it otherwise.

    Syntax & Example: `toggle_speed`

* `toggle_inputs` - Toggles a window displaying the current inputs applied as seen by the game. The widget will change form dynamically based on the current input. Any input is visualized including tool's own injected inputs and live player inputs. The input widget supports two visualization types, see the `viz_type` variable. You can have multiple input widgets visible at one time. To add new widgets use the `add_input_widget` command. The command will show the window if it is currently hidden and hide it otherwise.

    Syntax & Example: `toggle_inputs`

* `toggle_console` - Toggles the main console window. The command will show the window if it is currently hidden and hide it otherwise.

    Syntax & Example: `toggle_console`

* `add_input_widget` - Adds a new input widget, given a script file. The new input widget gets assigned a new ID, which can be viewed using `input_widgets`. The inputs loaded from such script are not injected into the game, only visualized in the display.

    Syntax: `add_input_widget [filename.txt]`

    Example: `add_input_widget b05.txt` - adds an input widget that visualizes inputs of a script file `b05.txt`

* `remove_input_widget` - Removes an input widget given its ID. To see all currently available widgets, use `input_widgets`.

    Syntax: `remove_input_widget [id]`

    Example: `remove_input_widget 2` - removes the input widget of ID `2`

* `input_widgets` - Displays all available input widgets currently loaded, their ID's and script files they visualize.

    Syntax & Example: `input_widgets`

* `toggle_editor` - Unfinished.

### Bruteforce
* `add_trigger` - Adds a trigger to evaluate the car state when the car hits the specified trigger. The coordinates are specified using a format of: `x y z size_x size_y size_y`, all elements are in game units, where one platform block = 32x8x32 units. The `toggle_info` command can be used to obtain the coordinates at a desired point.

    Syntax & Example: `add_trigger 500 40 500 32 8 32` - adds a trigger at position `[500 40 500]` of size `[32 8 32]`.

* `remove_trigger` - Removes a trigger from the trigger list, provided the index. To list all triggers and their indexes use `triggers`.

    Syntax & Example: `remove_trigger 1` - removes the first trigger provided it was added previously.

* `triggers` - Lists all available triggers and their indexes.

    Syntax & Example: `triggers`

## Variables
* `speed`  - Controls the speed of the entire game. You can use a float value to set the speed to a lower value than 1. Setting the speed to very high values like `100` may result in skipping inputs by the game which can cause desyncs. This is not because TMInterface cannot apply inputs at this speed, but because the game will intentionally stop reading input state at each tick. By default this is `1`.

* `replay_speed` - Controls the speed of the game while replaying inputs loaded with a `replay` command. The speed will be automatically managed when using the `replay` command to allow for quick run resetting & attempts. The speed will be applied at the beginning of the run and reset 1 second before the specified time used in the `replay` command. If no time specified, the speed will not be reset. By default this is `1`.

* `countdown_speed` - Controls the speed of the countdown phase. The speed will be automatically applied only for the countdown, simulating a faster countdown seen in TM2020. Note that this is not modifying the internal countdown time offset and only setting the global speed. The former is possible but not desired, since it affects the physics in some cases. By default this is `5`.

* `script_folder` - The absolute path to the script folder in which all of your scripts are stored. By default this is `C:\Users\username\Documents\TMInterface\Scripts`.

* `execute_commands` - Whether or not TMInterface should inject inputs that are currently loaded with `load` or `replay`. By default this is `true`. Set to `false` to disable input replaying.

* `log_simulation` - Prints information in the console about the simulation / race events. These events include: 
    - Beginning a new simulation
    - Ending a simulation
    - Passing through a checkpoint
    - Beginning a new lap
    - Finishing the race
    - Message signaling that the run was driven with TMInterface

* `log_bot` - Prints inputs in the console as they are being applied by the bot. By default this is `true`.

* `draw_game` - Disables or enables drawing of the game. Setting this to `false` will not disable drawing of widgets provided by TMInterface or the console itself. By default this is `true`.

* `use_valseed` - When set to `true`, enables an internal feature ingame that randomizes start state of the car, given a seed. The seed is generated by TMInterface itself, but the randomization happens in the native game code. This invalidates every run, and makes the game physics random. By default this is `false`.

* `skip_map_load_screens` - Skips map load screens including "Press any key to continue" in the load screen and choose opponents screen. By default this is `false`.

* `cmd_base_time` - The base time of all timed commands. This variable can be used to offset a group of commands in a script file, without changing timestamp of each command. The injection time is calcuated as `current_race_time + cmd_base_time`. This value is always reset to `0` at the beggining of the race, to prevent its side effects across loading other scripts. Setting this variable at time `0` is valid and will work.

* `cmd_steer_invert` - Inverts the steering axis for all `steer` and `press` commands that steer the car. Setting this to `true` will result in all `steer` commands having a flipped sign, all `press left` commands steering right and all `press right` commands steering left. This value is always reset to `false` at the beggining of the race, to prevent its side effects across loading other scripts. Setting this variable at time `0` is valid and will work.

* `cmd_steer_offset` - Adds a fixed offset to every applied analog steer value. This is useful when wanting to change the strenghtness of multiple steer values at once in a script. Be aware that if the resulting value overflows the range `[-65536,65536]`, TMInterface will clamp it down. This clamping will be only performed when the original value was previously in the range. The formula for calculating the value is as follows: `floor (value * cmd_steer_multiplier + cmd_steer_offset)` This value is always reset to `0` at the beggining of the race, to prevent its side effects across loading other scripts. Setting this variable at time `0` is valid and will work.

* `cmd_steer_multiplier` - Multiplies by a fixed amount every applied analog steer value. This is useful when wanting to change the strenghtness of multiple steer values at once in a script. This value is always reset to `0` at the beggining of the race, to prevent its side effects across loading other scripts. Setting this variable at time `0` is valid and will work.

* `sim_priority` - Specifies what process priority should be used for the game process when a simulation is playing out. The following values are available:
    - `none` - normal priority
    - `high` - high priority
    - `realtime` - realtime priority

    By default this is `none`.

* `sim_debug` - Enables a debug mode for simulations in which the game runs all game-related systems, such as input, graphics and sound. In this mode TMInterface will
enable the game camera and perform modifications in the game scene to make it able to view the simulation play-out live. Note that in debug mode, the simulation will take longer time because of additional overhead. You can modify the simulation speed by setting `sim_speed`.

* `sim_speed` - Modifies the simulation speed in debug mode. This is not the same as the `speed` variable, which controls the speed of the entire game. By default, this is equal to `5` which is also what the game uses for simulation by default. This variable does not affect anything when `sim_debug` is `false`.

* `sim_show_valid_window` - If set to `false`, TMInterface will hide the "Validating" message window while simulating the race. `true` by default.

* `extended_steer` - If set to `true`, enables the extended steering range of `[-6553600, 6553600]`. Note that this range is not physically possible, therefore this variable is by default set to `false`.

* `start_time` - The countdown duration in milliseconds. Note that this is not the *speed* of the countdown but rather its actual duration. Note that changing the start time may invalidate the physics of the race. By default this is `-1`, which means disabled.

* `random_seed` - Unfinished.
* `background` - Draws a solid background behind all the widgets, while covering the entire game's screen with a single color. Useful when wanting to key out certain elements like the input viewer. To set a new color, provide a hex value like `#FF0000` which is red: `set background #FF0000`.
* `viz_type` - the vizualization style in which the input widget shows inputs. This can be one of the following:
    - `standard` - the standard input viewer
    - `joystick` - a circular joystick vizualization, used exclusively for analog inputs

* `controller` - The controller that will be executed at simulation time. This can be:
    - `bruteforce` - The bruteforce script. To bruteforce a replay, choose the replay you want to bruteforce, click Launch and then Validate. TMInterface will automatically open a standard output console alongside the game's window when bruteforcing, to print all relevant information and inputs if a better time is found. The script may be stopped at any point by pressing the Escape key on the keyboard (the console window has to be focused).

        The bruteforce controller can work for different targets. The default target is the finish time. Other available targets are checkpoint time and trigger. See `bf_target_cp` and `bf_target_trigger`. 

        If `bf_target_cp` is `-1`, `bf_target_trigger` is checked, if `bf_target_trigger` is `-1`, then finish time is chosen.
    - `none` - No controller.

* `bf_print_cps` - Whether or not to print information about passed checkpoints when bruteforcing a replay.

* `bf_inputs_extend_steer` - Whether or not to increase the amount of inputs that can be modified by filling ticks without a steer command with previous steer values on the replay timeline.

* `bf_modify_prob` - The probability that a steer input may get modified. This probability is used for each and every input that exists in the replay. By default this is `0.002` which is 0.2%.

* `bf_max_steer_diff` - The maximum difference that a steer value may be changed by in either direction. If the resulting steer falls out of the normal range, it's discarded. By default this is `10000`. Setting this value can also affect `press left/right` input. For example `2000-3000 press left` with `bf_max_steer_diff` set to `10000` may get transformed to:
```
2000 steer -58567
3000 steer 0
```

* `bf_max_time_diff` - The maximum difference that the time of an input may be changed in either direction. This difference applies to all commands and not only steer commands. By default this is `0`, which means disabled.

* `bf_override_stop_time` - If set, overrides the finish time of the original replay. This variable is useful when trying to achieve a time below a specified time. By default this is `-1`, which means disabled. This variable also works for checkpoints and triggers.

* `bf_inputs_min_time` - If set, specifies the minimum time for an input to qualify to be changed. By default this is `-1` which means disabled.

* `bf_inputs_max_time` - If set, specifies the maximum time for an input to qualify to be changed. By default this is `-1` which means disabled.

* `bf_search_forever` - If set to `true`, after finding a better time, the script will set the new inputs as original inputs and begin to search for a lower time than the previous one. The inputs will always be printed immediately after finding a faster time. By default this is `false`, which means the script will stop when a new time is found.

* `bf_target_cp` - the target checkpoint index to optimise for. Note that checkpoints are ordered in the way the bruteforced replay passed them. The first checkpoint has an index of `1`, second - `2` and so on. By default this is `-1`.

* `bf_target_trigger` - the target custom trigger index to optimise for. A possible target trigger does not need to be passed by the bruteforced replay. The first trigger has an index of `1`, second - `2` and so on. By default this is `-1`.

## TMInterface Scripts
An TMInterface script is used to program runs in Trackmania and its contents are parsed by TMIntrface to be replayed in the game deterministically. The script file usually has a `.txt` extension and each input occupies one line of the script. The script can contain empty lines and lines prepended with a `#` are comments and are ignored by the parser. A comment may also be inserted just after the command.

An input script can contain any arbitrary commands that are part of TMInterface's console. That means you can include any command that would otherwise be executed in the console, such as `set log_simulation true` or even `load other_file.txt`. In most cases, the file will contain input commands, that make up a run you want to replay.

An example of a script:
```
# This is a script
0 set speed 5
0 press up
1200-3000 press left
3000 press down
3010 rel down
5110 steer 20000 # slightly steer to the right
6230 steer 0
8000 set speed 1
9000 press enter
```

## config.txt
The `config.txt` file resides in the `C:\Users\username\Documents\TMInterface` directory and is loaded by TMInterface when the game starts. This file contains any command you'd like to execute always at the start so that it is not needed on every startup. Here, you can also insert comments, just like in the script format.
An example of the `config.txt` file:
```
# The config file
bind f1 "set speed 1"
bind f2 "set speed 2"
bind f3 "set speed 4"
bind f4 "set speed 8"
bind f5 "set speed 12"
bind f6 "set speed 0.5"
bind f7 "set speed 0.2"
bind f8 unload
bind i toggle_info
bind p toggle_speed
bind n toggle_inputs # Bind "n" to toggle the inputs display
set log_simulation false # Turn off information about simulation
```

## TMInterface Innerworkings
This section describes internal game structures and how the game works internally.

### Events that can be saved by the game in a race:
* `Accelerate`
* `Brake`
* `SteerLeft`
* `SteerRight`
* `Steer`
* `Respawn`
* `Horn`
* `Gas`
* `_FakeIsRaceRunning`
* `_FakeFinishLine`

## The race timeline
A TrackMania race starts with a countdown phase. The length of this phase is variable depending on the context you're in:
* Test mode in editor: 100ms
* Validate mode: 2600ms
* Online: variable

In the countdown phase, no input is applied to the car but it is not guaranteed that the state of the car will not change. A specific start blockmix may push the car out of its spawning position even in the countdown. This is why the countdown is always played out, even when the game simulates the race in validation. Changing the length of the countdown may also result in an invalid run depending on the map. This is because the state of roulette boosters is depending entirely on the current time. This is not random, but means that the game always needs to set the proper state for the roulette boosters depending on the context for the race to be valid.

In online play, the countdown time is variable and dependent on unknown factors.

After the countdown, at time `0` or simulation time `2600`, a `_FakeIsRaceRunning` event is added to signal the start of the race. No other events happen at this time. It is however possible for the game to emit events such as `Respawn` before the running event.

In the next tick `10`, it is now possible to emit events by the player. Events are always sorted by time, and stored from oldest to newest.

At the end of the race, a `_FakeFinishLine` with a finish time is appended to the event buffer and the race is ended.

