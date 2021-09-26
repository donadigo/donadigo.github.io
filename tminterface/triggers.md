---
layout: tminterface-docs
title: TMInterface Guide
---

## Working with triggers
Triggers are a part of the builtin TMInterface bruteforce script that allow you to optimize a section of a track that does not consist of a checkpoint or a finish. A trigger is a cube placed somewhere on the map that acts as a point of an evaluation for the script. If the car enters the trigger, the state of the car is evaluated and the bruteforce script can accept a new solution, based on this evaluation.

Because triggers are a custom feature of TMInterface, they can be evaluated much more precisely than a simple finish/checkpoint time. There are different metrics available to choose how a trigger should be evaluated.

### Stadium coordinate system
A trigger is marked with begin and end point coordinates that lie within the track. The available Stadium building area itself has a size of **1024x1024x1024** units:

<img style="margin-top: 40px; width: 100%; margin-bottom: 30px" src="{{ site.baseurl }}/assets/images/trigger_stad_1.png"/>

**A single platform block (`6-2-1`) has dimensions of 32x8x32:**
<img style="margin-top: 40px; width: 100%; margin-bottom: 30px" src="{{ site.baseurl }}/assets/images/trigger_stad_2.png"/>


### What do triggers look like?

**The syntax for adding a trigger on the map is:**
```
add_trigger x1 y1 z1 x2 y2 z2
```

The `x1 y1 z1` parameters mark the starting point of the trigger cube and the `x2 y2 z2` parameters - the end of it, for example:
```
add_trigger 512 9 412 544 41 444
```

would add a trigger to the map like this:
<img style="margin-top: 40px; width: 100%; margin-bottom: 30px" src="{{ site.baseurl }}/assets/images/trigger_stad_3.png"/>

This particular trigger has a size of 32x8x32, however, you can add triggers with any size in any direction. The point cooridnates can be swapped in the command without any difference on how the trigger will be placed: `add_trigger 512 9 412 544 41 444` is equivalent to `add_trigger 544 41 444 512 9 412`.

### How do I place a trigger on the map for bruteforce to optimize for?
You can deduce starting and end points by driving the car to the desired points and then using the **Properties** display available within TMInterface. After your car is in e.g. the starting position, execute `toggle_info` in the console to bring up the Properties display, which displays your current car **position**. These coordiantes are your `x1 y1 z1` parameters.  You can then save the coordinates somewhere for later and then drive to the ending point of the trigger. Repeat the process for the ending coordinates. The ending coordinates are your `x2 y2 z2` coordinates.

With your coordinates ready, execute the following command, supplying your points as parameters:
```
add_trigger x1 y1 z1 x2 y2 z2
```

### Testing your trigger placement
<div style="display: flex; margin-top: 30px">
    <div class="card shadow" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">Note</h5>
            <p class="card-text">
                Visualizing trigger placement in-game is not yet available.
            </p>
        </div>
    </div>
</div>
<br>

You can test your newly placed trigger by driving into the trigger area. If you have hit the trigger, an information should be displayed in the console window about the hit:
```
[Triggers] Activated trigger 1 at 8.48 (velocity: 73.0647)
```

which in this case, means that the car has hit the trigger at 8.48s with a velocity of 73.0647.

### Configuring bruteforce for optimizing your trigger
After successfully adding a trigger to your map, you are ready to configure the bruteforce script to optimize your trigger:

1. Bring up the **Settings** panel, go to **Bruteforce**.
2. Tick the **Enable Bruteforce** option.
3. Expand the **Optimization** header.
4. Choose **Trigger time** for the *Optimization Target*.
5. Enter `1` for the **Target Trigger** if it is not already entered.
6. Choose **Distance** for the **Evaluation Metric**.
7. [Launch the Bruteforce script]({{ site.baseurl }}/tminterface/what-is-bf#launching-bruteforce).

This configuration will optimize for the **distance** metric, meaning that bruteforce will accept any solution that was closer to the trigger or reached it faster than the base run.

**Optimizing a trigger has some key differences from other targets:**
* If the trigger you have added was not reached by the base run at all, bruteforce will try to reach it first.
* After reaching the trigger, the further race is completely discarded. Bruteforce will not attempt to finish the run, but will always only optimize for the trigger.
* It is often required that the trigger is placed in an optimal spot, otherwise you may find out that the result is not what you initially wanted to achieve.
* It is likely that at the beginning of each bruteforce session you will get a lot of improvements quickly. This is because even the tiniest improvements are accepted by the script.

### Evaluation metrics
As part of the builtin trigger evaluation, these metrics are available:
* **Distance**: the default metric, compares the time the car reached the trigger first, then the distance to the trigger one tick before the car reached the trigger
* **Distance Then Velocity**: like distance, but if the difference in distance is within 0.01 units, velocity (speed) is compared
* **Velocity**: after reaching the trigger, only velocity (speed) is compared

### Managing triggers
You can see a list of triggers you have added with the `triggers` command:
```
triggers
```

which will display information about currently placed triggers:
```
Trigger 1: Pos (512, 9, 412); Size: (32, 8, 32)
```

If you need to edit a trigger you have placed before, remove it first by executing the `remove_trigger` command:
```
remove_trigger 1
```

which will remove the first trigger added. While TMInterface itself supports adding multiple triggers to the map, the bruteforce script is not able to optimize for multiple triggers at once yet. After removing the trigger, you can add a new trigger with updated coordinates.