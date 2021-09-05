---
layout: tminterface-docs
title: TMInterface
permalink: tminterface
---

<style>
    body {
        background-repeat: no-repeat;
        background-position: right top;
    }

    body, html[data-theme="light"] body {
        background-image: url("{{ site.basuerl }}/assets/images/tmi_overlay_light.png");
    }

    .header-shadow, html[data-theme="light"] .header-shadow {
        text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
    }

    html[data-theme="dark"] body {
        background-image: url("{{ site.basuerl }}/assets/images/tmi_overlay_dark.png");
    }

    html[data-theme="dark"] .header-shadow {
        text-shadow: 0px 2px 3px rgba(0, 0, 0, 1);
    }

    @media (prefers-color-scheme: dark) {
        html[data-theme="light"] body {
            background-image: url("{{ site.basuerl }}/assets/images/tmi_overlay_light.png");
        }

        html[data-theme="light"] .header-shadow {
            text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
        }

        body, html[data-theme="dark"] body {
            background-image: url("{{ site.basuerl }}/assets/images/tmi_overlay_dark.png");
        }

        .header-shadow, html[data-theme="dark"] .header-shadow {
            text-shadow: 0px 2px 3px rgba(0, 0, 0, 1);
        }
    }
</style>

## TMInterface
<p class="header-shadow">
<b>TMInterface</b> is the de facto standard TAS tool for <b>Trackmania Nations and United Forever.</b> It allows you to replay, analyze and modify runs to achieve faster times and push the game to its limits. It is not meant to be a tool for cheating or unfair play and this is why it comes with security features that doesn’t allow for this. 
</p>

<p class="header-shadow">
<b>Do not ever attempt to drive legitimate runs and compete on public leaderboards while running this client.</b> Any run done with TMInterface is a tool assisted run, regardless if the tool injected inputs or not.
</p>

TMInterface is also compatible with the <a target="_blank" href="{{ site.baseurl }}/tmcp">Competition Patch</a> and can load the <a target="_blank" href="https://tmnforever.tm-exchange.com/threadshow/6517627?page=auto">TMUnlimiter</a> mod if you have it installed.

<div class="row">
    <div class="col-auto" style="padding-right: 0px">
        <form action="{{ site.url_tminterface_latest }}">
            <i class="fa fa-download button-icon" style="color: #ffffff; margin-top: 15px"></i>
            <input type="submit" class="download-button button-cyan" value="Download the newest version" style="width: 280px"/>
        </form>
    </div>

    <div class="col-auto" style="padding-right: 0px">
        <form action="https://discord.gg/tD4rarRYpj">
            <i class="fab fa-discord fa-2x button-icon" style="color: #ffffff; margin-top: 7px"></i>
            <input type="submit" class="discord-button" value="Discord"/>
        </form>
    </div>

    <div class="col-auto">
        <form action="https://paypal.me/donadigos">
            <i class="fab fa-paypal fa-2x button-icon" style="color: #0079C1; margin-top: 7px"></i>
            <input type="submit" class="support-button" value="Support me"/>
        </form>
    </div>
</div>

<div style="display: flex; margin-top: 30px">
    <div class="card shadow" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title warning">Warning</h5>
            <p class="card-text">
                The tool may be detected as malicious by your browser/antivirus. It is recommended to disable antivirus while installing the tool,
                and adding the game installation folder to a list of antivirus exceptions.This is because the tool injects its own DLL into the game, which is seen as malicious by antiviruses. See <a href="{{ site.baseurl }}/tminterface/installation">Installation</a> for more instructions.
            </p>
        </div>
    </div>
</div>

### Features
TMInterface comes with plenty of useful features that help you work with the game and extend the tool:
* **Race speed modification**
* **Full, deterministic input playback**
* **A command system with bindable commands**
* **Native save states**
* **Bruteforce script**
* **Server API to hook into the game simulation**
* **Input visualization**
* **And more!**

<a href="{{ site.baseurl }}/assets/images/tmi1.png" target="_blank">
    <img style="margin-top: 40px; width: 100%" src="{{ site.baseurl }}/assets/images/tmi1.png"/>
</a>