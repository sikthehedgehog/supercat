//
// Collectible object
//
// run() .... Behaviour function
// draw() ... Sprite update function
//

function Collectible(x, y, type)
{
    // Calculate real coordinates
    this.x = (x << 6) + 14;
    this.y = (y << 6) + 21;
    
    // Initialization
    this.type = type;
    this.visible = false;
    
    // Sprite
    this.sprite_id = new Sprite;
    this.sprite_id.setImage("./supercat/items.png");
    this.sprite_id.setPos(-9001, -9001);
    this.sprite_id.setSize(34, 32);
    this.sprite_id.setImagePos(0x40, type ? 0x20 : 0);
    this.sprite_id.setZIndex(40);
    //this.sprite_id.attach(game.display);
    
    // Function with the behaviour code
    if (!Collectible.prototype.run)
    Collectible.prototype.run = function(item_id)
    {
        // Did the player get us?
        if (game.player.x + 12 >= this.x + 5 &&
        game.player.x - 12 <= this.x + 29 &&
        game.player.y >= this.y &&
        game.player.y - 56 <= this.y + 32)
        {
            // Add score
            game.score += this.type ? 25 : 10;
            game.footprint += this.type ? 2 : 1;
            
            // Delete obejct
            this.sprite_id.detach();
            delete this.sprite_id;
            game.items.removeByID(item_id);
            return;
        }
    }
    
    // Function to update the sprite
    if (!Collectible.prototype.draw)
    Collectible.prototype.draw = function()
    {
        var x = this.x - game.scroll_x;
        var y = this.y - game.scroll_y;
        
        // Out of range?
        if (x < -34 || x > 640 || y < -32 || y > 384)
        {
            if (this.visible)
            {
                this.sprite_id.detach();
                this.visible = false;
            }
        }
        
        // Nope, visible
        else
        {
            if (!this.visible)
            {
                this.sprite_id.attach(game.display);
                this.visible = true;
            }
            
            this.sprite_id.setPos(this.x - game.scroll_x,
                                  this.y - game.scroll_y);
        }
    }
    
    // Return pointer to this object
    return this;
}
