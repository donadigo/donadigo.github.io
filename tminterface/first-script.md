---
layout: tminterface-docs
title: TMInterface Guide
---

## Your first script
Scripts are a simple way of executing timed inputs within the game, but are not exclusively limited to injecting inputs. A script is a text file stored in `C:\Users\username\Documents\TMInterface\Scripts` (the folder is created upon the first launch of TMInterface).

<br>
To create a new script, type `open_scripts_folder` into the console and press enter to open the directory in which all of your scripts will be stored. Then create a new file in it, naming it however you want, for example: `inputs.txt`. This file will contain all the inputs we want to execute in a race. Open the file with Notepad or other text editor and write the following line in it:
```
0 press up
```

**Breakdown:**
* `0` — the time at which the command will be injected at the time of the race. Because we want to accelerate at the beginning of the race, we insert the command at time 0.
* `press` - The command we are executing. We want to begin accelerating, which we do by pressing a button. Releasing a button would be `rel` instead.
* `up` - we are pressing the up arrow, which is responsible for acceleration. We can use other actions here, such as `left`, `right`, `down`, `delete`, `enter` or `horn`.

<br>
Save the file and come back to the game. To load your first script, type `load inputs.txt` (given that you have named your file `inputs.txt`). If all went well, the console should display a success message that the script is now loaded. You can now test the script by playing any map within the game — the car should begin accelerating by itself at the beginning of the race.

### More inputs
This is pretty great — but how can we execute more advanced sequences of inputs? You can add more commands simply by putting the next command at the next line of the file, like so:
```
0 press up
2.00 press left
3.00 rel left
6.12 press down
7.98 rel down
8.43 steer 13292
```

**The following script:**
* Accelerates at the beginning of the race
* Steers to the left for 2 seconds, for a total of 1 second
* Brakes at time 6.12s and stops braking at 7.98s
* Steers to the right with an analog value of `13292` at 8.43s

You can check out all available input commands [here]({{ site.baseurl }}/tminterface/commands#input-commands).

<br>
TMInterface will reload your script everytime it changes so there is no need to execute the `load` command again. Restart the race and you should now see all actions we've inserted into the file be executed at their respective timestamps. **You can now freely adjust all the timings & commands inside your script to create your first full tool assisted run!** To unload the current script, simply type `unload` into the console and press enter.