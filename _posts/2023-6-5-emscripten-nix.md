---
layout: post
title:  "Running C SDL2 application in browser with Emscripten"
date:   2024-05-05 13:43:00 +0300
categories: technology webdev c 
---

Building working WASM application is pretty straightforward, but here I will discuss some quirks I found when developing on my NixOS machine. All files can be found at a sample Github [project](https://www.github.com/eikrt/freakout).

First I had to make sure it worked with gcc, hence the Makefile. Then I started working with Emscripten compiler (emcc). I could build it with Makefile too but I was too lazy for that. Instead there is a shell script, which contains these two lines:

{% highlight bash %}
emcc util.c perlin.c draw.c coll.c elem.c mov.c main.c -c -s USE_SDL=2 -s USE_SDL_MIXER=2 -s USE_SDL_IMAGE=2
emcc util.o perlin.o draw.o coll.o elem.o mov.o main.o -s USE_SDL=2 -sALLOW_MEMORY_GROWTH -sASYNCIFY -o freakout.html --preload-file assets/
{% endhighlight %}

There are two weird things that need some tweaking. First of all, Emscripten tries to write to the nix read-only partition, so that needs to be addressed. Luckily I found a solution from [this](https://github.com/NixOS/nixpkgs/issues/139943) Github issue.

{%highlight bash %}
cp -r /nix/store/<nix-hash>-emscripten-2.0.27/share/emscripten/cache ~/.emscripten_cache
chmod u+rwX -R ~/.emscripten_cache
export EM_CACHE=~/.emscripten_cache
{% endhighlight %}

The other thing was missing headers of the SDL2_mixer. For that, I had to find the suitable release for my other SDL dependencies, clone it to my machine and add the next snippet to my Makefile. This only affect those who want a working desktop application for testing.

{%highlight makefile %}
CFLAGS = -ISDL-release-2.30.3/include/ ... 
{% endhighlight %}

I probably will continue this post if images have some quirks too!
