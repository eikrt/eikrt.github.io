---
layout: page
title: Enewald project specification 
permalink: /enewald/
---

## ENEWALD – Secure, purely functional, publish-subscribe Linux distribution

[Documentation](/enewald_documentation)
### Inspired by Nix, Gentoo and Guix 

Enewald is a project aiming to provide a lightweight system for embedded and IoT. The system is configured and written 100% with Lua. Enewald is divided to three parts:

![enewald triotomy](/assets/trio.png)

The clients subscribe to core server with config_\<id\>.lua as a MQTT payload. The server responds with something called "profile", which is a composed binary/dependency hierarchy fine-tuned for a client. All updates go through this pipeline. Client and server can reside in a same machine. 

![enewald chart](/assets/enewald_spec.png)



