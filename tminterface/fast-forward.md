---
layout: tminterface-docs
title: TMInterface Guide
---

## Fast forward
Besides save states, a common trick to speed up getting to a point in a script quickly is to add certain speed commands to speed up input replaying.
Given an input script:
```
0 press up
...
56.34 steer -10043
```

You can speed up the process for replaying the script by putting `set speed` commands into the file at certain timestamps, like so:
```
0 set speed 30 # Set speed to 30x at the beginning of the race
0 press up
...
56.34 steer -10043
56.34 set speed 1 # Set speed back to 1x after all inputs
```

Because timed commands are not subject to line ordering, you can also do the same at the end of the file:
```
0 press up
...
56.34 steer -10043
0 set speed 30
56.34 set speed 1
```

You can insert the `set speed` command anywhere in your scripts at any timestamp, depending on where you want in the run to reset the speed.