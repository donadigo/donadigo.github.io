---
layout: post
title:  TMInterface Beta
date:   2021-05-30 23:00:13 +0200
permalink: tminterface
---

### What is TMInterface?
TMInterface is a state-of-the-art TAS tool for Trackmania Nations and United Forever. It allows you to replay, analyze and modify runs to achieve faster runs and push the game to its limits.  It was never meant to be a tool for cheating or unfair play and this is why it comes with security features that doesn't allow for this. **Do not** ever attempt to drive legitimate runs and compete on public leaderboards while running the game with the tool injected. Any run done with the tool is as a tool assisted run, regardless if the tool injected inputs or not.

**Note: If you are using the Steam version of the game - first, [apply the Steam TMNF Fix](https://steamcommunity.com/sharedfiles/filedetails/?id=448953593).**

<div style="display: flex;">
    <form action="https://github.com/donadigo/donadigo.github.io/raw/master/data/TMInterface/TMInterfaceBeta_Setup_1.0.7.exe" style="margin-right: 20px;">
        <input type="submit" class="download-button button-cyan" value="Download the newest version"/>
    </form>

    <form action="https://discord.gg/tD4rarRYpj">
        <input type="submit" class="discord-button" value="Discord"/>
    </form>
</div>

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

<a href="{{ site.baseurl }}/assets/images/tmi1.png" target="_blank">
    <img style="margin-top: 40px" src="{{ site.baseurl }}/assets/images/tmi1.png" />
</a>

### How do I use it?
TMInterface bases off everything on console commands, much like Source games such as CS:GO. From setting the speed of the game, to setting up a bruteforce script. You can toggle the console by pressing the tilde `~` key. Script files are stored in `C:\Users\username\Documents\TMInterface\Scripts`. **Launch the tool for it to create this folder, if it does not exist.** There you can create new script files that contain your inputs/other commands that are available with TMInterface. You can open this directory by typing `open_scripts_folder` and hitting enter. Type `help` to get list of all the commands available and their short description. Type `vars` to see all variables you can set. You can check out all available commands & variables [here]({{ site.baseurl }}/tminterface-commands).

The `config.txt` in `C:\Users\username\Documents\TMInterface` file enables you to run a set of commands at the beginning of TMInterface startup. In there, you can put commands like `bind r replay` to bind the R key to the command `replay` permanently.

### Downloads
Head to the top of the page to download the installer for the newest version. If you cannot use the installer for some reason (strongly recommended!), [download the raw .zip installation files](https://github.com/donadigo/donadigo.github.io/raw/master/data/TMInterface/TMInterfaceBeta_1.0.7.zip). Extract these installation files into your game directory, usually `C:\Program Files (x86)\TmNationsForever` `C:\Program Files (x86)\TmUnitedForever` or `C:\Program Files (x86)\Steam\steamapps\common\TrackMania Nations Forever`.

### Useful commands
* `set speed 5` - Sets the global game speed to 5x the normal speed.
* `replay` - Choose a replay in the Edit Replays menu -> Launch -> Validate and type `replay` in the console to load all the inputs of the replay you just validated. Now, load the map the replay was driven on and see all the inputs being replicated.
* `dump_inputs` - Choose a replay in the Edit Replays menu -> Launch -> Validate and type `dump_inputs` in the console to print all the inputs of the replay you just validated. The text is automatically copied into the clipboard for easy access.
* `toggle_inputs` - Toggle a live input widget display, visualizing currently loaded inputs.
* `map` - Load a map immediately from maps available in the `TrackMania` documents folder.
* `bind` - Bind a key to a command e.g: `bind f2 set speed 2`
* `load_infinity` - Loads TMInfinity into the game instance. Only available in the choose profile menu at game startup.

### Useful links
* <a href="{{site.baseurl}}/tminterface-commands" target="_blank">All TMInterface commands</a>
* <a href="https://docs.google.com/spreadsheets/d/1R1N4mQkRyQemJgDAGh54v9_n4fLW4Z3EGp71xrIBRIY/edit?usp=sharing" target="_blank">Nadeo TAS Spreadsheet</a>
* <a href="https://www.mediafire.com/file/05k3fmvz2a32iu6/TAS_donadigo.zip/file" target="_blank">The TAS skin</a>

### Common questions
* **Q:** Is TMInterface compatible with Competition Patch?<br>
**A:** Yes, TMInterface can be installed alongside the Competition Patch.

* **Q:** I cannot click the Next button when choosing the install location.<br>
**A:** TMInterface has to be installed in the game install directory. This is usually `C:\Program Files (x86)\TmNationsForever`.
Make sure that the folder you are choosing contains the `TmForever.exe` file.<br>

* **Q:** "Game is not compatible with TMInterface" error<br>
**A:** It is recommended to use a standalone version of the game available [here](https://nadeo-download.cdn.ubi.com/trackmaniaforever/tmnationsforever_setup.exe).
If you do not want to use the standalone version, [apply the Steam TMNF Fix](https://steamcommunity.com/sharedfiles/filedetails/?id=448953593).

* **Q:** The tool gets deleted repetedly by my antivirus.<br>
**A:** Add a folder exception to your antivirus so that it doesn't scan the game directory for malicious files. For Windows Defender:
    * Go to Windows Settings -> Updates and security -> Windows security -> Protection against viruses and threats -> Manage settings.
    * Scroll down and choose "Add or delete exceptions".
    * Click "Add exception" and "Folder".
    * Choose the directory in which your game is installed, this is usually `C:\Program Files (x86)\TmNationsForever`.
    * Confirm adding the exception.

### Tutorials
*Soon!*

### Planned features
* An interactive inputs editor allowing for rapid experimentation
* Additional programs to extract input from existing game instance, running without TMInterface

### Known issues
* Crashes
* Performance issues
* Cumbersome management of input displays / custom triggers
* Incomplete server API
* Many more
