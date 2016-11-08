// Initializes the game
function init_game()
{
    // Initialize game display
    game.display = new Display;
    game.display.setSize(640, 384);
    game.display.attach(document.body);
    
    // Initialize framerate system
    game.framerate = new Framerate;
    game.framerate.setRate(20);
    game.framerate.reset();
    //game.framerate.setRate(20);
    //game.framerate.setSkip(3);
    
    // Initialize input system
    game.input = new Input;
    game.input.register(game.display);
}

function calculate_scroll()
{
    game.scroll_x = game.player.x - 320;
    game.scroll_y = game.player.y - 192;
    if (game.scroll_x < 0) game.scroll_x = 0;
    if (game.scroll_y < 0) game.scroll_y = 0;
    if (game.scroll_x > (game.map_width << 6) - 640)
        game.scroll_x = (game.map_width << 6) - 640;
    if (game.scroll_y > (game.map_height << 6) - 384)
        game.scroll_y = (game.map_height << 6) - 384;
}

// Initialize in-game stuff
function init_ingame()
{
    // Set up game variables
    game.score = 0;
    game.footprint = 0;
    
    // Create container for items
    game.items = new Items;
    
    // Load level data
    load_level();
    
    // Create player
    game.player = new Player;
    
    // Set background color
    game.display.setBGColor(64, 112, 255);
    
    // Create tilemap
    game.tilemap = new Tilemap;
    game.tilemap.setMapData(game.layout_map);
    game.tilemap.setMapSize(game.map_width, game.map_height);
    game.tilemap.setImage("./supercat/level_tiles_1.png");
    game.tilemap.setTileSize(64, 64);
    game.tilemap.setVisibleArea(11, 7);
    
    // Set index coordinates
    set_level_tiles();
    
    // Initialize tilemap
    calculate_scroll();
    game.tilemap.setParent(game.display);
    game.tilemap.initTilemap();
    game.tilemap.setScroll(game.scroll_x, game.scroll_y);
    
    // Reset generic global animation counter
    game.global_anim = 0;
    
    // Start game
    loop_ingame();
}

// In-game main control loop
function loop_ingame()
{
    var num_frames;
    
    // Get amount of frames to process
    num_frames = game.framerate.getFrames();

    // No frames to process?
    //if (!game.framerate.checkFrame())
    if (num_frames <= 0)
    {
        setTimeout("loop_ingame()", 15);
        return;
    }
    
    // Update input status
    game.input.poll();
    
    // For every frame we have to run...
    while (num_frames > 0)
    {
        // Update player
        game.player.update();
        
        // Update items
        game.items.run();
        
        // Increase global animation counter
        game.global_anim++;
        
        // Next frame
        num_frames--;
    }
    
    // Calculate scroll location
    calculate_scroll();
    
    // Update tilemap position
    game.tilemap.setScroll(game.scroll_x, game.scroll_y);
    
    // Update video output
    game.player.updateSprite();
    game.items.draw();
    
    // DEBUG
    document.getElementById("debug_score").innerHTML = "SCORE: " + game.score;
    document.getElementById("debug_footprint").innerHTML = "PAWS: "
        + game.footprint;
    
    // Next frame
    setTimeout("loop_ingame()", 30);
}

// Start game
init_game();
init_ingame();
