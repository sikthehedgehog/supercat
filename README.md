# Supercat

Some old project from the HTML4 era (no, no canvas around!). Didn't really go much further than a tech demo, but I thought it may be nice to have it available.

## How to play

Download the files, then open `index.html` in the browser. Obviously you must have javascript enabled.

* Make sure to click on game itself!
* Press arrows to run
* Press space to jump

Sorry, you can't get hit by dogs, as I said it was too early. You can stomp on them though!

## FAQ

### Will you finish it?

No.

### Why is the code split between `common` and `supercat`?

The original idea was to share engine code among multiple games. The `common` directory contains the reusable code, while the `supercat` directory contains the game-specific code (and game assets like the graphics).

If you want to go ahead and use the code I don't mind, though you may want to rewrite the graphics code to use canvas instead of a bunch of DIVs.

### How long did it take to write the physics code?

About 10 minutes :P (not like it's doing much...)

### Why are you using DIVs with images?

This is HTML4, not HTML5. I think 2D canvas was a thing but barely was making its way on Firefox and Chrome (and IE wouldn't support it for like at least two more years). This was the era when canvas didn't even support text. So huh, yeah.

The images are stored as spritesheets (PNGs containing multiple sprites in them), the idea was to reduce the amount of files to load. The DIVs only show a portion of the sheet. The level tiles are notorious abusers of this technique, there are some tiles that outright *overlap* with others in the spritesheet, i.e. portions of the image are reused.

### Why is the list of objects ended in `--end--` instead of using foreach?

Probably some brainfart back then.

Amusingly, that quirk aside the format still looks pretty clean. Also I'd still suggest the idea of storing the tilemap in a string, simply because it's way more compact (of course the game parses the string and generates a proper Array from it once it loads).

### Why is the framerate only 20FPS?

Originally it was 10FPS because on IE it lagged horribly. Later I realized some blatant mistake on the framerate code and unsurprisingly now it has great timing. I could have increased the framerate more but I didn't want to tweak things too much so it stuck at 20FPS.

### No sound?

Nope, sorry.
