---
layout: tminterface-docs
title: TMInterface Guide
---

## Introduction
TMInterface allows for external simulation control via the server API. The API allows to connect to a game instance running with TMInterface and interrupt important game functions such as the physics step. A client can connect to as many instances of TMInterface as it wants, and one TMInterface instance can have only one client controlling it. There can be a maximum of 16 TMInterface instances running on one system. Clients can call the API to execute console commands, analyze / override simulation state and inject inputs.

With the API you can:
* **Create your own simulation controllers that analyze race state**
* **Create your own scripts to optimize runs**
* **Modify game physics in a deterministic way**
* **Replace the evaulation method of the builtin bruteforce script**
* **Inject input to the game**
* **And more!**

If you want to get started quickly, it is recommended to use [the official Python client implementation](https://github.com/donadigo/TMInterfaceClientPython).