---
layout: post
title:  TrackMania Competition Patch
date:   2020-12-05 23:00:13 +0200
permalink: tmcp
hidden: true
redirect_from:
    - /tmcomppatch
---

### What is Competition Patch?
TrackMania Competition Patch is a special patch for the game that does not allow means of cheating such as using macros, slowing down the game and other forms of injecting inputs. **If you use the Steam version of the game, it is strongly recommended to use the standalone version before installing the patch – you can download it directly [here](https://nadeo-download.cdn.ubi.com/trackmaniaforever/tmnationsforever_setup.exe).**

<div class="row">
    <div class="col-auto" style="padding-right: 0px">
        <form action="{{ site.url_tmcp_latest }}">
            <i class="fa fa-download button-icon" style="color: #ffffff; margin-top: 15px"></i>
            <input type="submit" class="download-button" value="Download the newest version" style="width: 280px"/>
        </form>
    </div>

    <div class="col-auto" style="padding-right: 0px">
        <form action="https://discord.gg/tD4rarRYpj">
            <i class="fab fa-discord fa-2x button-icon" style="color: #ffffff; margin-top: 7px"></i>
            <input type="submit" class="discord-button" value="Discord" style="width: 220px"/>
        </form>
    </div>

    <div class="col-auto">
        <form action="https://paypal.me/donadigos">
            <i class="fab fa-paypal fa-2x button-icon" style="color: #0079C1; margin-top: 7px"></i>
            <input type="submit" class="support-button" value="Support me" style="width: 200px"/>
        </form>
    </div>
</div>

<br>
*Got any issues? Discuss issues or bugs in the **#issues-bugs** Discord channel.*

<div style="display: flex; margin-top: 30px">
    <div class="card shadow" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title warning">Warning</h5>
            <p class="card-text">
                The tool may be detected as malicious by your browser/antivirus. It is recommended to disable antivirus while installing the tool,
                and adding the game installation folder to a list of antivirus exceptions. <a href="#common-questions">See how.</a> This is because the tool injects its own DLL into the game,
                which is seen as malicious by antiviruses.
            </p>
        </div>
    </div>
</div>

### Why is there a need for this patch?
The patch is meant to solidify & validate records uploaded on important TMX categories such as Official Campaigns and Classic tracks. With the increasing interest in TAS'ing the game, the patch is a leeway into ensuring the leaderboards will stay clean for the forseeable future. Support for this patch is currently being implemented to TMX. 

### How does it work?
The patch is simply installed into the game's installation directory and from there, the patch will always work when you open the game. Under the hood, the patch overrides the input system of TrackMania so that it can verify that all inputs come from a real hardware device. The patch is in no way invasive - it **does not** install any low level drivers on your system or collect any data about it. 

### How do I tell I'm running the game with the patch?
To check if you're running the Competition Patch, look at the game's window title. If the game is fullscreen, switch to windowed mode and a (Competition Patch) should be visible in the title of the window. 

### Common questions
* **Q:** I cannot click the Next button when choosing the install location.<br>
**A:** The Competition Patch has to be installed in the game install directory. This is usually `C:\Program Files (x86)\TmNationsForever`.
Make sure that the folder you are choosing contains the `TmForever.exe` file.<br><br>
* **Q:** The patch gets detected as malicious by my antivirus.<br>
**A:** Add a folder exception to your antivirus so that it doesn't scan the game directory for malicious files. For Windows Defender:
    * Go to Windows Settings -> Updates and security -> Windows security -> Protection against viruses and threats -> Manage settings.
    * Scroll down and choose "Add or delete exceptions".
    * Click "Add exception" and "Folder".
    * Choose the directory in which your game is installed, this is usually `C:\Program Files (x86)\TmNationsForever`.
    * Confirm adding the exception.


### Other features
Besides verifying that your replays are valid, the patch also provides some nice QoL changes:

* Using a PS4 controller will no longer crash the game
* Lifts the maximum recording limit of 2h for all replays
* Disables restarting the race after clicking on opponents in top left corner, preventing from accidental resets

### Downloads
Head to the top of the page to download the installer for the newest version. If you cannot use the installer for some reason (strongly recommended!), [download the raw .zip installation files]({{ site.url_tmcp_latest_zip }}). Extract these installation files into your game directory, usually `C:\Program Files (x86)\TmNationsForever` `C:\Program Files (x86)\TmUnitedForever` or `C:\Program Files (x86)\Steam\steamapps\common\TrackMania Nations Forever`.

### How do I install?

* Simply download the file, double click it and the installer will guide you through the steps to install the patch.
* You may need to change the install path to point to your game folder, if you installed TrackMania in a custom directory.


### How do I uninstall?

If you want to uninstall the patch, navigate to the game directory (usually `C:\Program Files (x86)\TmNationsForever`) and rename `dinput8.dll` to anything other than that and the patch should stop working. Deleting `dinput8.dll` and `TMCompPatch.dll` should also work.
