---
layout: tminterface-docs
title: TMInterface Guide
---

## Extracting inputs from replays
Replay files produced by the game (even without the client) contain the exact inputs of the ghost that drove the record. These inputs are used for validation purposes, but we can use them for improving current world records and splicing the race. TMInterface allows for easy extraction of those inputs directly in the client.

<div style="display: flex; margin-top: 30px">
    <div class="card shadow" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">Prerequisite</h5>
            <p class="card-text">
                The replay you want to extract inputs from must finish the race. Replays that are incomplete (did not finish the race) do not contain inputs in the replay file, therefore it is not possible to extract inputs from these replays.
            </p>
        </div>
    </div>
</div>

### How do I extract the inputs?
1. From the main menu screen click **Replays**, then **Edit a replay**.
2. Enter the **Replays** folder. Choose a replay from the replay list.
3. Click **Launch** and then **Validate**.
4. After the replay validates (the *This replay is valid* message shows up), bring up the console and type `dump_inputs inputs.txt`. 
5. The inputs are now saved into the `inputs.txt` file located in your scripts folder. You can now load the script by executing `load inputs.txt`.

<br>
**You can also choose not to save the inputs to a file, by simply executing `dump_inputs`. The inputs will be copied into your clipboard instead. The inputs will stay in TMInterface's memory, so you can execute the same commands even after leaving the validation screen and entering a race.**

Validating a replay makes the game load the inputs of a replay you've chosen, which can then be captured by TMInterface. The validate function is used for other purposes as well, such as [bruteforcing]({{ site.baseurl }}/tminterface/what-is-bf).

### The replay is available online but I do not know how to get it into the game.
Usually, you will want to extract inputs from a current world record available on [TMX](https://tmnforever.tm-exchange.com/tracksearch/1001?mode=1), or a replay someone sent you instead. To make the replay show in the ingame list, you have to put the `.Replay.Gbx` file inside your TrackMania Replays folder, which should be located in the respective folder:
* **TrackMania Nations Forever**: `C:\Users\username\Documents\TmForever\Tracks\Replays`
* **TrackMania United Forever**: `C:\Users\username\Documents\TrackMania\Tracks\Replays`

After putting the replay into the folder, restart the game to make the replay appear in the replay list.


### The validate button is greyed out and I cannot click it
If the *Validate* button is greyed out, it means either that the replay did not finish the race, or it is an online replay. At the moment, TMInterface does not support extracting inputs from an online replay, even though it is possible with extrernal scripts. Those scripts are [available publicly](https://github.com/donadigo/gbxtools), but require knowledge on how to properly run them.

### I have extracted the inputs to a file, what now?
Once you have extracted the inputs into a file, you can load them with the `load` command, load the map the replay was driven on and start experimenting with the inputs in a text editor. To learn what commands are available and how to manage your scripts, see [Your first script]({{ site.baseurl}}/tminterface/first-script).

### What if I want to extract the inputs from the current race but cannot finish it?
At any point in the race, you can execute the `recover_inputs` command to extract inputs from the current race you are in. This will extract all inputs up to the current point in time. This command's behaviour is the same as `dump_inputs`, here you can also specify the filename to automatically save the inputs to, like so: `recover_inputs recovered.txt`.