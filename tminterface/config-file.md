---
layout: tminterface-docs
title: TMInterface Guide
---

## The config file
The `config.txt` file resides in the `C:\Users\username\Documents\TMInterface` directory and is loaded by TMInterface when the game starts. This file contains any command you'd like to execute always at the start so that it is not needed on every startup. The `config.txt` file is an ordinary script so you can use the same syntax here as well.
An example of the `config.txt` file:
```
# The config file
bind f1 "set speed 1" # Bind F1 key to set speed to 1x
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
set log_simulation false # Turn off information about simulation when validating
```
<!-- 
### The builtin.txt file
The `builtin.txt` file is used for saving existing settings by TMInterface. This file is separate from the `config.txt` file and is loaded before it. If you want to completely disable this functionality, see [What if I want the settings to not save and always have the default ones at startup?]({{ site.baseurl}}/tminterface/settings#what-if-i-want-the-settings-to-not-save-and-always-have-the-default-ones-at-startup). -->