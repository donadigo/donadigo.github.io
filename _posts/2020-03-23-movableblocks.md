---
layout: post
title:  Movable Blocks for Openplanet
date:   2020-03-23 23:00:13 +0200
permalink: movableblocks
---

### Introduction
Movable Blocks is a plugin for Openplanet that allows you to introduce movement into your TrackMania maps. 

### Features
With Movable Blocks you can:

* Create "movables" which are simple scripts that define how a block will move on the map
* Control the state of these movables through MediaTracker clips
* Share the maps that use movable blocks and have them played by other people (the Movable Blocks script is required)

### Note
*It is recommended that you disable the script if you're playing online / any competitions!*

### How to use?
First, go to the TrackMania editor and create a new track. Press "F3" to show the Openplanet top menu. **There now should be a new window called "Movable Blocks"** visible. If the window doesn't show make sure that you installed the plugin correctly and that the "Movable Blocks" checkbox in Openplanet -> Settings -> Plugins is checked.

Below is a video illustrating creating a simple track with movable blocks:
<iframe src="https://www.youtube.com/embed/O3c3qRGHAz0" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### MediaTracker commands
Any clip that uses these commands needs to have a prefix of `opclip`.

Available MediaTracker commands as of 0.1:

* enable `movable id`: enables the movable, if the movable is already enabled, this does nothing
* disable `movable id`: disables the movable, if the movable is already disabled, this does nothing
* toggle `movable id`: toggles the movable, making it enabled when it is disabled and vice versa
* reset `movable id`: resets the movable to it's initial state, disabling it if it's enabled

### Releases
#### 0.3 - June 11th 2020
This release contains new features and command extensions:
* Items can now be moved. Moving an item will also move any of it's triggers, such as CP or finish triggers.
* You can now specify multiple movable ID's in MediaTracker commands. Simply separte them via comma e.g: `enable 1,2,3,9`
* You can also replace a movable ID with a special token `all` to apply the command to all movables e.g: `reset all`.
* Any movable will now move precisely to it's end position, which wasn't the case in previous versions. This allows to create fully smooth surfaces out of multiple movables.
* Added `//depend` for DLL detection by other scripts.

#### 0.2 - February 23rd 2020
**Q: The plugin does not work! What do?**<br>
**A:** If for some reason the plugin does not work after installing it make sure that:
* The `MovableBlocks.dll` file is located within `C:\Users\Username\Openplanet4\` or `C:\Users\Username\Openplanet4\Scripts`
* The `MovableBlocks` folder is located within `C:\Users\Username\Openplanet4\Scripts`<br><br>

**Q: Can I host maps with movable blocks on a server?**<br>
**A:** Yes, you can, but remember that players on the server have to have Openplanet with the script installed in order to have the blocks move on the map. Otherwise, they still can join and play but the blocks will not move.<br><br>


**Q: Will Press Forward maps with movable blocks work?**<br>
**A:** Likely not. Even though the plugin tries hard to provide same movement everytime you play, it does not hook into the game's loop so it's not "consistent" for the game's physics. This is a limitation that cannot be worked around for now. 

### Download & Install
Head over to the [Openplanet plugin](https://openplanet.nl/files/31) site for download and installation instructions. 

### Known issues
* Trying to write anything in the Id field collapses the movable header
* Some blocks that are made of multiple parts will not be entirely moved

