---
layout: tminterface-docs
title: TMInterface Guide
---

## Key Bindings
TMInterface allows to bind arbitrary commands to keys on the keyboard. These binds can then be put into [the config file]({{ site.baseurl }}/tminterface/config-file) to make them persisent.

**To add a new binding, use the `bind` command, for example:**
```
bind n toggle_inputs
```
binds the "n" key on the keyboard to toggle the input display.

<br>
If the command you are binding contains spaces in it such as `set speed 10`, you need to put it in quotes, like so:
```
bind f10 "set speed 10"
```
This command binds the F10 key to set the race speed to 10x.

If you want your binds to persistent after closing the game, simply put the bind commands [into your `config.txt` file]({{ site.baseurl }}/tminterface/config-file).

### Unbinding keys
You can also revert the binding, by using the `unbind` command, for example:
```
unbind n
```
would unbind the "n" key on the keyboard from executing the `toggle_inputs` command.

### Available keys
* letters: `a-z`
* function keys: `f1-f19`
* numpad keys: `num0-num9`
* special keys:
    * `pause` - the Pause key
    * `pgup` - the Page Up key
    * `pgdown` - the Page Down key
    * `home` - the Home key
    * `end` the End key
