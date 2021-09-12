---
layout: tminterface-docs
title: TMInterface Guide
---

## Interface Console & Settings
The primary way of working with TMInterface is through its own custom console. Once you opened the game with <img src="{{ site.baseurl }}/assets/images/icons/ificon.png" width="20px" style="border-radius: 10%"> <b>TMInterface</b>, the console should show up. You can toggle the console on or off by pressing the tilde `` ` ``  key (just under the `Esc`  key).

**If the console does not show up after installing TMInterface and launching it, it may be a result of an improper installation, see the [FAQ of Installation]({{ site.base_url }}/tminterface/installation#frequently-asked-questions) section.**

<br>
The console allows you to execute various commands which control the game. For example, typing `set speed 5` into the console window and pressing enter, will set the speed of the game race to 5x. Similarly, you can type `set speed 0.5` to set game race speed to 50%. The `set` command can be used for other variables and the console will suggest you possible completions as you type out the command. You can select the completion item by pressing the down arrow key and then using up and down arrow keys to navigate available completions. You can see all available variables you can set [here]({{ site.baseurl }}/tminterface/variables) or by typing `vars` into the console window — this will display all available variables and their current values. The console will display an error if your command is invalid, or if there was some other error while using the tool.

<br>
You can also chain multiple commands within one, separating them by the `;` character  — for example, this command will display the available variables and help one after another: `vars; help`. If you find yourself needing to execute the same command you did before, you can press the up arrow repeatedly on your keyboard while the console input entry is focused to cycle through previous commands that you executed.

<!-- <br>
You can use the builtin Settings tab to tweak the settings using a simple UI. There you can customize many different aspects of TMInterface, including the builtin input display, input commands, bruteforce settings and more. Those settings will be saved for later use when you open TMInterface again. -->

### What if I don't have the tilde key on my keyboard?
If your keyboard does not have a tilde key, you can bind toggling the console to a different key in the special config file. Outside of the game, navigate to `C:\Users\username\Documents\TMInterface` and open the `config.txt` file. If the file does not exist, launch TMInterface.

After opening the `config.txt` file in Notepad or other text editor, copy the following line into it, save the file and restart the client:
```
bind c toggle_console
```

**This will bind the "c" key on your keyboard to toggling the console. You can replace the key with a key of your own choice. See [Available keys]({{ site.baseurl}}/tminterface/bindings#available-keys) for all available options. For changes to take effect, restart TMInterface.**

### What if I want the settings to not save and always have the default ones at startup?
If you do not want the settings to be saved by TMInterface, you can do so by editing the `builtin.txt` config file. Outside of the game, navigate to `C:\Users\username\Documents\TMInterface` and open the `builtin.txt` file. If the file does not exist, create it. Inside the file, put the `#` character at the beginning of the first line like so:
```
#
```
**This will disable saving any settings you set in the UI or by the `set` commands.**