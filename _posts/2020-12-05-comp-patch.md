---
layout: post
title:  TrackMania Competition Patch
date:   2020-12-05 23:00:13 +0200
permalink: tmcp
redirect_from:
    - /tmcomppatch
---

### What is Competition Patch?
TrackMania Competition Patch is a special patch for the game that does not allow means of cheating such as using macros, slowing down the game and other forms of injecting inputs. **If you use the Steam version of the game, it is strongly recommended to use the standalone version before installing the patch – you can download it directly [here](https://nadeo-download.cdn.ubi.com/trackmaniaforever/tmnationsforever_setup.exe).**

<div style="display: flex;">
    <form action="https://github.com/donadigo/donadigo.github.io/raw/master/data/TMCompetitionPatchSetup_1.4.8.exe" style="margin-right: 20px;">
        <input type="submit" class="download-button" value="Download the newest version"/>
    </form>

    <form action="https://discord.gg/5QYCJJpwAW">
        <input type="submit" class="discord-button" value="Discord"/>
    </form>
</div>

### Why is there a need for this patch?
The patch is meant to solidify & validate records uploaded on important TMX categories such as Official Campaigns and Classic tracks. With the increasing interest in TAS'ing the game, the patch is a leeway into ensuring the leaderboards will stay clean for the forseeable future. Support for this patch is currently being implemented to TMX. 

### How does it work?
The patch is simply installed into the game's installation directory and from there, the patch will always work when you open the game. Under the hood, the patch overrides the input system of TrackMania so that it can verify that all inputs come from a real hardware device. The patch is in no way invasive - it **does not** install any low level drivers on your system or collect any data about it. 

### How do I tell I'm running the game with the patch?
To check if you're running the Competition Patch, look at the game's window title. If the game is fullscreen, switch to windowed mode and a (Competition Patch) should be visible in the title of the window. 

### Other features
Besides verifying that your replays are valid, the patch also provides some nice QoL changes:

* Using a PS4 controller will no longer crash the game
* Lifts the maximum recording limit of 2h for all replays
* Disables restarting the race after clicking on opponents in top left corner, preventing from accidental resets

### Downloads
Head to the top of the page to download the installer for the newest version. If you cannot use the installer for some reason (strongly recommended!), [download the raw .zip installation files](https://github.com/donadigo/donadigo.github.io/raw/master/data/TMCompetitionPatch_1.4.8.zip).

### How do I install?

* Simply download the file, double click it and the installer will guide you through the steps to install the patch.
* You may need to change the install path to point to your game folder, if you installed TrackMania in a custom directory.


### How do I uninstall?

If you want to uninstall the patch, navigate to the game directory (usually `C:\Program Files (x86)\TmNationsForever`) and rename `dinput8.dll` to anything other than that and the patch should stop working. Deleting `dinput8.dll` and `TMCompPatch.dll` should also work.
