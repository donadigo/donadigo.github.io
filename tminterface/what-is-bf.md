---
layout: tminterface-docs
title: TMInterface Guide
---

## What is Bruteforce?
Bruteforce is an automated script, built into TMInterface, that allows you to search for a faster time. This search is completely automatic and does not require manual adjustments of inputs. You simply run the script and let it simulate 1000's of runs, each time with slightly changed inputs from the original replay. If the bruteforce script finds a faster time than your original replay, it will display the inputs of the new run, as well as save them to a special `result.txt` file.

The bruteforce script can be configured for other targets other than the finish time, such as a specific checkpoint time or triggers. Its settings include how inputs should be changed, when they should be changed and more. See [Parameter configuration]({{ site.baseurl }}/tminterface/param-config.md).

There are no universal settings that apply to any replay. Every replay needs tuning the settings according to the task at hand for optimal search. These settings can be customized in the **Bruteforce** tab in the Settings UI, or through console commands.


### Launching bruteforce
First, you must obtain a **base** replay, which input's will be changed to search for a faster time. After you have obtained a valid replay that finishes the race, you are ready to bruteforce it.

<div style="display: flex; margin-top: 30px">
    <div class="card shadow" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">Prerequisite</h5>
            <p class="card-text">
                The replay you want to bruteforce must finish the race. Replays that are incomplete (did not finish the race) do not contain inputs in the replay file, therefore it is not possible to bruteforce these replays.
            </p>
        </div>
    </div>
</div>

<br>
1. Bring up the console, go to the **Settings** tab, then choose the **Bruteforce** tab.
2. Tick the **Enable Bruteforce** option.
3. Ingame from the main menu, click **Editors**, then **Edit a Replay**, choose the replay you want to bruteforce from the list.
4. Click **Launch** and then **Validate**.

After clicking the **Validate** button, TMInterface will open a separate console window in which you can see the results of the script. **If the console repeadetly displays yellow text, see [Parameter configuration]({{ site.baseurl }}/tminterface/param-config.md).**

<br>
Each line displayed in the console represents one combination of inputs that has been checked. For example, a line:
```
-1 (3)
```
means that this specific combination of inputs did not finish the track (`-1`), and that overall 3 inputs were changed in this try. If a run did finish but its time is equal to the base run, then that time will be displayed instead. **Once a run with a better time has been found, the script will display the inputs in a green text, like so:**
<pre class="highlight">
<code style="color: lightgreen">
...

7.73 rel up
8.60 press up
8.80 steer 0
8.82 rel down

The solution has been saved to C:\Users\username\Documents\TMInterface\Scripts\result.txt
Found lower finish time: 8.78 (-0.08), iterations: 137
</code>
</pre>

### Checking out the results of bruteforce
You can stop the bruteforce script at any time by focusing the bruteforce console window and pressing the `Esc` key on your keyboard. If the bruteforce script found any time improvement, it will get saved into a script named `result.txt` (configurable in the Settings UI). To load the result use the `load` command in the console:
```
load result.txt
```
and load the map the replay was driven on.


### Innerworkings
The bruteforce script works by repurposing the Validation feature of the game to use a "simulation only" mode of the game to simulate physics as fast as it is possible. This allows for great performance and usable results in many scenarios. While the simulation runs, TMInterface will monitor its status to determine what action to take next, be it rewinding to a specific state or evaluating results. Because TMInterface natively supports save states, it can use them to significantly reduce the time it takes to try an input combination. For example, if an input was changed at 23 seconds, the bruteforce script will not simulate the entirety of those 23 seconds before the change. Instead, it will restore a save state that has been saved before the search phase, to immediately jump to where an input change happened.

It is also worth noting that you can write your own bruteforce evaluation scripts and even completely take over the simulation with the [TMInterface API]({{ site.baseurl }}/tminterface/dev-intro).