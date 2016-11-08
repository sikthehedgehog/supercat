//
// Tilemap object
//
// setMapSize() ....... Sets the tilemap size
// setImage() ......... Sets the image with the tile graphics
// setTileSize() ...... Sets the tiles size
// setVisibleArea() ... Sets the visible area
// setIndexCoords() ... Sets the image coordinates for the specified index
// setParent() ........ Sets the parent display
// initTilemap() ...... Initializes the tilemap
// setScroll() ........ Sets the scrolling of the tilemap
//

function Tilemap()
{
    // We aren't initialized when created
    this.initialized = false;
    
    // Stores the positions in the image for every tile index
    // TO-DO: find a way for this to not leak memory on object delete in
    // browsers that have shitty garbage collection. But they're shitty,
    // so...
    this.index_coords = new Array;
    
    //
    // Sets the tilemap data
    // It's an array of width * height entries
    // Each entry is the graphic ID for a tile
    // A pointer is stored instead of a copy of the array
    //
    // @param new_data ... Tilemap data
    //
    if (!Tilemap.prototype.setMapData)
    Tilemap.prototype.setMapData = function(new_data)
    {
        this.map_data = new_data;
    }
    
    //
    // Sets the tilemap size
    // Dimensions are given in tiles
    //
    // @param new_width .... Width of the tilemap
    // @param new_height ... Height of the tilemap
    //
    if (!Tilemap.prototype.setMapSize)
    Tilemap.prototype.setMapSize = function(new_width, new_height)
    {
        this.map_width = new_width;
        this.map_height = new_height;
    }
    
    //
    // Sets the image to be used for the <div> objects
    //
    // @param new_url ... Address of the image to use
    //
    if (!Tilemap.prototype.setImage)
    Tilemap.prototype.setImage = function(new_url)
    {
        this.tile_image = new_url;
    }
    
    //
    // Sets the size of the tiles
    // Dimensions are given in tiles
    //
    // @param new_width .... Tile width
    // @param new_height ... Tile height
    //
    if (!Tilemap.prototype.setTileSize)
    Tilemap.prototype.setTileSize = function(new_width, new_height)
    {
        this.tile_width = new_width;
        this.tile_height = new_height;
    }
    
    //
    // Sets the visible area
    // This sets the amount of <div> objects to be used
    // Dimensions are given in tiles
    //
    // @param new_width .... Width of visible area
    // @param new_height ... Height of visible area
    //
    if (!Tilemap.prototype.setVisibleArea)
    Tilemap.prototype.setVisibleArea = function(new_width, new_height)
    {
        this.visible_width = new_width;
        this.visible_height = new_height;
        this.visible_size = this.visible_width * this.visible_height;
    }
    
    //
    // Sets the coordinates in the image for a given index
    // Coordinates belong to the top left corner of the visible portion
    // Dimensions are given in pixels
    // Even if this function is called, index 0 will always be invisible
    //
    // @param index ... Index to specify coordinates for
    // @param x ....... Horizontal coordinate in the image
    // @param y ....... Vertical coordinate in the image
    //
    if (!Tilemap.prototype.setIndexCoords)
    Tilemap.prototype.setIndexCoords = function(index, x, y)
    {
        this.index_coords[index] = (-x) + "px " + (-y) + "px";
    }
    
    //
    // Sets the parent display for the tilemap
    // Our <div> objects are attached to the parent's <div> object
    //
    // @param new_parent ... Parent display
    //
    if (!Tilemap.prototype.setParent)
    Tilemap.prototype.setParent = function(new_parent)
    {
        this.parent = new_parent;
    }
    
    //
    // Initializes the tilemap
    // Many settings take effect here for performance reasons
    // That may be changed in the future
    //
    if (!Tilemap.prototype.initTilemap)
    Tilemap.prototype.initTilemap = function()
    {
        var i, x, y;
        
        // Create <div> objects
        i = 0;
        this.div_array = new Array;
        for (y = 0; y < this.visible_height; y++)
        for (x = 0; x < this.visible_width; x++)
        {
            this.div_array[i] = document.createElement("div");
            this.div_array[i].style.position = "absolute";
            this.div_array[i].style.width = this.tile_width + "px";
            this.div_array[i].style.height = this.tile_height + "px";
            this.div_array[i].style.backgroundImage =
                "url(\"" + escape(this.tile_image) + "\")";
            this.div_array[i].style.backgroundRepeat = "repeat";
            
            this.parent.div_id.appendChild(this.div_array[i]);
            i++;
        }
        
        // Initialize scrolling variables
        this.setScroll(0, 0);
        
        // Set the flag that the tilemap is initialized
        this.initialized = true;
    }
    
    //
    // Sets the scrolling of the tilemap
    // Coordinates are given in pixels
    // Coordinates belong to the top left corner
    //
    // @param new_x ... Horizontal coordinate of the scrolling
    // @param new_y ... Vertical coordinate of the scrolling
    //
    if (!Tilemap.prototype.setScroll)
    Tilemap.prototype.setScroll = function(new_x, new_y)
    {
        var i, x, y, xr, yr, dx, dy, xt, yt;
        var diff_x, diff_y;
        var tile;
        
        // Set new scroll coordinates
        diff_x = new_x - this.scroll_x;
        diff_y = new_y - this.scroll_y;
        this.scroll_x = new_x;
        this.scroll_y = new_y;
        dx = Math.floor(this.scroll_x / this.tile_width);
        dy = Math.floor(this.scroll_y / this.tile_height);
        
        // Move <div> objects accordingly
        i = 0;
        for (y = 0; y < this.visible_height; y++)
        for (x = 0; x < this.visible_width; x++)
        {
            // Update horizontal coordinate
            xr = -(this.scroll_x % this.tile_width) + x * this.tile_width;
            xt = (this.scroll_x / this.tile_width) + x;
            this.div_array[i].style.left = xr + "px";
            
            // Update vertical coordinate
            yr = -(this.scroll_y % this.tile_height) + y * this.tile_height;
            yt = (this.scroll_y / this.tile_height) + y;
            this.div_array[i].style.top = yr + "px";
            
            // Update tile graphic
            // TO-DO: make this happen only when needed
            tile = this.map_data[(x + dx) + (y + dy) * this.map_width];
            
            if (!tile)
                this.div_array[i].style.visibility = "hidden";
            else
            {
                this.div_array[i].style.visibility = "visible";
                this.div_array[i].style.backgroundPosition =
                    this.index_coords[tile];
            }
            
            // Next <div> object
            i++;
        }
    }
    
    // Set some sensible defaults
    this.setImage("");
    this.setTileSize(0, 0);
    this.setVisibleArea(0, 0);
    
    // Return a pointer to this tilemap object
    return this;
}
