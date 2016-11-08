// Loads the data of the current level
function load_level()
{
    var i, x, y, obj;
    
    // Characters to be used for decoding
    var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnop" +
                     "qrstuvwxyz!?"
    
    // For now...
    var id = 0;
    
    // Retrieve map dimensions
    game.map_width = game.level_data[id].width;
    game.map_height = game.level_data[id].height;
    game.start_x = (game.level_data[id].start_x << 6) + 0x20;
    game.start_y = (game.level_data[id].start_y << 6) + 0x3F;
    
    // Generate array for the layout tilemap
    i = 0;
    game.layout_map = new Array;
    for (y = 0; y < game.map_height; y++)
    for (x = 0; x < game.map_width; x++)
    {
        game.layout_map[i] = characters.indexOf
            (game.level_data[id].layout.charAt(i));
        i++;
    }
    
    // Generate array for the collision tilemap
    i = 0;
    game.coll_map = new Array;
    for (y = 0; y < game.map_height; y++)
    for (x = 0; x < game.map_width; x++)
    {
        game.coll_map[i] = characters.indexOf
            (game.level_data[id].coll.charAt(i));
        i++;
    }
    
    // Create all objects as needed
    i = 0;
    for (i = 0; game.level_data[id].items[i].type != "--end--"; i++)
    {
        // To shorten the lines >_>
        x = game.level_data[id].items[i].x;
        y = game.level_data[id].items[i].y;
        
        // Create object
        if (game.level_data[id].items[i].type == "10points")
            obj = new Collectible(x, y, 0);
        else if (game.level_data[id].items[i].type == "25points")
            obj = new Collectible(x, y, 1);
        else if (game.level_data[id].items[i].type == "ball")
            obj = new Ball(x, y);
        else if (game.level_data[id].items[i].type == "dog")
            obj = new Dog(x, y);
        
        // Add object to item list
        game.items.add(obj);
    }
}

// Sets the tile positions for the current level
function set_level_tiles()
{
    game.tilemap.setIndexCoords(1, 0, 0x20);
    game.tilemap.setIndexCoords(2, 0, 0);
    game.tilemap.setIndexCoords(3, 0x40, 0x40);
    game.tilemap.setIndexCoords(4, 0x80, 0);
    game.tilemap.setIndexCoords(5, 0x40, 0);
    game.tilemap.setIndexCoords(6, 0x80, 0x40);
    game.tilemap.setIndexCoords(7, 0xC0, 0);
    game.tilemap.setIndexCoords(8, 0xC0, 0x40);
    game.tilemap.setIndexCoords(9, 0x100, 0x40);
    game.tilemap.setIndexCoords(10, 0x120, 0);
    game.tilemap.setIndexCoords(11, 0x100, 0);
    game.tilemap.setIndexCoords(12, 0x50, 0xA0);
    game.tilemap.setIndexCoords(13, 0x40, 0xA0);
    game.tilemap.setIndexCoords(14, 0x50, 0x80);
    game.tilemap.setIndexCoords(15, 0x40, 0x80);
    game.tilemap.setIndexCoords(16, 0x60, 0x80);
    game.tilemap.setIndexCoords(17, 0x60, 0xA0);
    game.tilemap.setIndexCoords(18, 0, 0xA0);
    game.tilemap.setIndexCoords(19, 0, 0x60);
    game.tilemap.setIndexCoords(20, 0xA0, 0x80);
    game.tilemap.setIndexCoords(21, 0x120, 0x80);
    game.tilemap.setIndexCoords(22, 0xE0, 0x80);
}
