//
// Sprite object
//
// attach() ........ Attaches the sprite to a display
// setImage() ...... Changes the image file used by the sprite
// setPos() ........ Changes the position of the sprite
// setSize() ....... Changes the size of the sprite
// setImagePos() ... Changes the portion of the image to show
//

function Sprite()
{
    // Create <div> object
    this.div_id = document.createElement("div");
    
    // Some initialization
    this.div_id.style.position = "absolute";
    this.div_id.style.backgroundRepeat = "repeat";
    
    //
    // Attaches the <div> object to a display object
    // Needed to get it to show in a display
    // Sprites can be attached only to one display object
    //
    // @param new_parent ... Display object for the <div> object
    //
    if (!Sprite.prototype.attach)
    Sprite.prototype.attach = function(new_parent)
    {
        this.div_parent = new_parent;
        this.div_parent.div_id.appendChild(this.div_id);
    }
    
    //
    // Detaches the <div> object from its parent
    //
    if (!Sprite.prototype.detach)
    Sprite.prototype.detach = function()
    {
        this.div_parent.div_id.removeChild(this.div_id);
    }
    
    //
    // Changes the image file used by the sprite
    // The image is given as an URL
    //
    // @param new_url ... URL of the image to use
    //
    if (!Sprite.prototype.setImage)
    Sprite.prototype.setImage = function(new_url)
    {
        this.image = new_url;
        this.div_id.style.backgroundImage =
            "url(\"" + escape(this.image) + "\")";
    }
    
    //
    // Changes the position of the sprite
    // Coordinates are given in pixels
    // Coordinates belong to the top left corner of the sprite
    //
    // @param new_x ... Sprite horizontal coordinate
    // @param new_y ... Sprite vertical coordinate
    //
    if (!Sprite.prototype.setPos)
    Sprite.prototype.setPos = function(new_x, new_y)
    {
        this.x = new_x;
        this.y = new_y;
        this.div_id.style.left = this.x + "px";
        this.div_id.style.top = this.y + "px";
    }
    
    //
    // Changes the size of the sprite
    // Dimensions are given in pixels
    //
    // @param new_width .... Sprite width
    // @param new_height ... Sprite height
    //
    if (!Sprite.prototype.setSize)
    Sprite.prototype.setSize = function(new_width, new_height)
    {
        this.width = new_width;
        this.height = new_height;
        this.div_id.style.width = this.width + "px";
        this.div_id.style.height = this.height + "px";
    }
    
    //
    // Changes the position of the portion of the image to show
    // Coordinates are given in pixels
    // Coordinates belong to the top left corner of the portion to show
    // Size of the portion to show is the same as the size of the sprite
    //
    // @param new_x ... Image portion horizontal coordinate
    // @param new_y ... Image portion vertical coordinate
    //
    if (!Sprite.prototype.setImagePos)
    Sprite.prototype.setImagePos = function(new_x, new_y)
    {
        this.image_x = new_x;
        this.image_y = new_y;
        this.div_id.style.backgroundPosition = (-this.image_x) + "px " +
                                               (-this.image_y) + "px";
    }
    
    //
    // Changes the Z index of the sprite
    //
    // @param new_index = Sprite Z index
    //
    if (!Sprite.prototype.setZIndex)
    Sprite.prototype.setZIndex = function(new_index)
    {
        this.z_index = new_index;
        this.div_id.style.zIndex = this.z_index;
    }
    
    // Use sensible defaults
    this.setImage("");
    this.setPos(0, 0);
    this.setSize(0, 0);
    this.setImagePos(0, 0);
    
    // Return pointer to sprite object
    return this;
}
