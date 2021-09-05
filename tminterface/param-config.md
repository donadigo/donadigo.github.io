---
layout: tminterface-docs
title: TMInterface Guide
---

<style>
    #content img {
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        background-color: #151614;
        padding: 10px;
        border-radius: 5px;
    }

    #content .col {
        padding-left: 30px;
        padding-right: 30px;
    }

    .col-p {
        text-align: center;
    }
</style>

## Parameter configuration
The bruteforce script can be configured through the settings UI or console commands. You should always reconfigure and check your bruteforce settings for each specific map and replay. **There are no universal settings that work for all replays.**

The bruteforce strategy is the most effective in chaotic scenarios, where an input change leading to an improvement cannot be easily deducted by a human. Because TrackMania itself is largely a chaotic environment, it is possible that the bruteforce script will find a better solution relatively quickly based on your initial replay.

<h3 class="col-p"><b>Console variable cheatsheet</b></h3>

<div class="row" style="margin-top: 60px">
    <div class="col">
        <h4 style="text-align: center;"><b>bf_modify_prob</b></h4>
        <p class="col-p">The chance of each input being modified</p>
        <img src="{{ site.baseurl }}/assets/images/bruteforce/bf_modify_prob.png">
        <p class="col-p">With <b>bf_modify_prob = 0.1</b>, ~1 out of 10 inputs in a replay will be considered for changing.</p>
    </div>

    <div class="col">
        <h4 style="text-align: center;"><b>bf_max_steer_diff</b></h4>
        <p class="col-p">The difference that a steer value can be changed in either direction</p>
        <img src="{{ site.baseurl }}/assets/images/bruteforce/bf_max_steer_diff.png">
        <p class="col-p">With <b>bf_max_steer_diff = 20000</b>, a steer value can be changed by 20000 units in either direction.</p>
    </div>

    <div class="col">
        <h4 style="text-align: center;"><b>bf_max_time_diff</b></h4>
        <p class="col-p">The difference that a time value can be changed in either direction</p>
        <img src="{{ site.baseurl }}/assets/images/bruteforce/bf_max_time_diff.png">
        <p class="col-p">With <b>bf_max_time_diff = 1000</b>, a time value can be changed by 1 second in either direction.</p>
    </div>
</div>

<div class="row" style="width: 80%; margin-left: auto; margin-right: auto; margin-top: 30px">
    <div class="col">
        <h4 style="text-align: center;"><b>bf_inputs_min/max_time</b></h4>
        <p class="col-p">Define in which timeframe inputs can be changed</p>
        <img src="{{ site.baseurl }}/assets/images/bruteforce/bf_inputs_minmax_time.png">
        <p class="col-p">With <b>min = 10120</b> and <b>max = 10190</b>, inputs can be only changed in between 10.12s and 10.19s.</p>
    </div>

    <div class="col">
        <h4 style="text-align: center;"><b>bf_inputs_fill_steer</b></h4>
        <p class="col-p">Fill in all steer values to increase the number of steering inputs in a replay, without modifying the base replay</p>
        <img src="{{ site.baseurl }}/assets/images/bruteforce/bf_inputs_fill_steer.png">
        <p class="col-p">With <b>bf_inputs_fill_steer = true</b>, the steering inputs are filled.</p>
    </div>
</div>


### What if I get yellow/warning text in the bruteforce console?
If the bruteforce console repeatedly displays a warning text:
<pre class="highlight">
<code style="color: yellow">
[Warning] Exceeded limit of recursive calls for generating a new solution!
Make sure that your bruteforce settings allow for changing the inputs of this replay.
</code>
</pre>

then it means that your bruteforce settings do not allow the script to modify the inputs inside your replay. This can happen when your `bf_modify_prob` console variable is set to a low value. To fix this issue, increase the `bf_modify_prob` value or adjust it in the **Input modification** section available in the **Bruteforce** settings UI. It is generally recommended to tweak the value such that the number of inputs changed (seen in the brackets in the bruteforce console) averages at 1-6 inputs.