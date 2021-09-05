---
layout: tminterface-docs
title: TMInterface Guide
---

## Script syntax
The scripting syntax is designed for fast & easy modification and is the same as the one used in TMInterface's console.

**Here are some basic facts about the scripting syntax:**
* There are two types of commands: timed and immediate
* The line ordering of timed commands does not matter (unless two commands share the same time)
* You can execute any command within the script file, not just input commands such as `press` or `steer`
* You can treat script files as config files as well, by not prefixing your commands with a time, for example: `set log_bot true` will set the `log_bot` variable to `true` immediately after loading the script

### Timed commands
A timed command is prefixed with a time, such as `9.43`. This signifies that the command is to be executed at the game race time of 9.43 seconds. The same time can be replaced with a numeric format: `9430`. The millisecond format always needs to end with `0`. Both formats do not have any difference in behaviour — the format is purely a personal preference.

Because the time completely determines when the command will be injected — line ordering within the script does not matter, except one case. The following:
```
2.34 press up
9.23 press enter
```
**is equivalent to:**
```
9.23 press enter
2.34 press up
```

<br>
However, if the two or more commands share the same time and execute the same command, line ordering does matter:
```
4.32 steer 65536
4.32 steer 0
```

**will set the steering value to `0` at time `4.32`, but:**
```
4.32 steer 0
4.32 steer 65536
```
**will set the steering value to `65536` instead.**

<br>
Timed commands also can be extended by an "ending" timestamp. The ending timestamp signifes when an input should be disabled/ending. For example:
```
2.00-3.00 press up
```
**is equivalent to:**
```
2.00 press up
3.00 rel up
```

<br>
The same is the case for the `steer` command:
```
4890-5130 steer -300
```
**is equivalent to:**
```
4890 steer -300
5130 steer 0
```

### Immediate commands
An immediate command is any command that is not prefixed with a time, such as `set speed 10`, `toggle_inputs`, `press up` etc. These commands are executed immediately when the script is loaded or when they are typed into the console. This is useful when you want to create a script file that acts as a loadable config, for example: 
```
set controller bruteforce
set bf_inputs_min_time 4000
set sim_debug true
set sim_speed 10
```

### Comments
A script file can contain empty lines and comments. A comment is prefixed with the `#` character and can be inserted at the beginning of the line or after a command, like so:
```
# Setup for A01
0 press up
300 steer 6732 # steer to the right a little bit

#300 steer 8000 <- this is commented out because the car crashes with this value!
```

### Multiple commands in one line
You can also stack commands in one line by separating them with the `;` character like so:
```
set speed 8; set log_bot true; 5.32 toggle_inputs; toggle_console
```