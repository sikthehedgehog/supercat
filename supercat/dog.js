//
// Dog object
//
// run() .... Behaviour function
// draw() ... Sprite update function
//

function Dog(x, y)
{
    // Calculate real coordinates
    this.x = (x << 6) + 0x20;
    this.y = y << 6;
    
    // Initialization
    this.dir = true;
    this.visible = false;
    
    // Sprite
    this.sprite_id = new Sprite;
    this.sprite_id.setImage("./supercat/items.png");
    this.sprite_id.setPos(-9001, -9001);
    this.sprite_id.setSize(60, 64);
    this.sprite_id.setImagePos(0, 0x80);
    this.sprite_id.setZIndex(50);
    this.sprite_id.attach(game.display);
    
    // Function with the behaviour code
    if (!Dog.prototype.run)
    Dog.prototype.run = function(item_id)
    {
        // Too far to be worth processing?
        var x = this.x - game.scroll_x;
        var y = this.y - game.scroll_y;
        if (x < -128 || x > 768 || y < -128 || y > 512)
            return;
        
        // Did the player collide with us?
        if (game.player.x + 12 >= this.x - 12 &&
        game.player.x - 12 <= this.x + 12 &&
        game.player.y >= this.y + 4 &&
        game.player.y - 56 <= this.y + 59)
        {
            // Is the player stamping us?
            if (game.player.y < this.y + 60 && game.player.gravity > 0 &&
            !game.player.on_floor)
            {
                // Add score
                game.score += 100;
                
                // Make player bounce
                game.player.gravity = -12;
                
                // For now, just disappear
                this.sprite_id.detach();
                delete this.sprite_id;
                game.items.removeByID(item_id);
                return;
            }
        }
        
        // Move left?
        if (this.dir)
        {
            // No way? :(
            if (game.coll_map[((this.x - 22) >> 6) + (this.y >> 6) *
            game.map_width])
            {
                this.dir = false;
            }
            // Oh cool!
            else
            {
                this.x -= 6;
            }
        }
        
        // Move right?
        else
        {
            // No way? :(
            if (game.coll_map[((this.x + 22) >> 6) + (this.y >> 6) *
            game.map_width])
            {
                this.dir = true;
            }
            // Oh cool!
            else
            {
                this.x += 6;
            }
        }
    }
    
    // Function to update the sprite
    if (!Dog.prototype.draw)
    Dog.prototype.draw = function()
    {
        var x = this.x - game.scroll_x;
        var y = this.y - game.scroll_y;
        
        // Out of range?
        if (x < -30 || x > 670 || y < -64 || y > 384)
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
            // Make sprite visible if needed
            if (!this.visible)
            {
                this.sprite_id.attach(game.display);
                this.visible = true;
            }
            
            // Get animation
            if (game.global_anim & 2)
                x = 60;
            else
                x = ((game.global_anim >> 1) & 2) ? 120 : 0;
            
            // Update sprite
            if (this.dir)
            {
                this.sprite_id.setImagePos(x, 0x80);
                this.sprite_id.setPos(this.x - game.scroll_x - 25,
                                      this.y - game.scroll_y);
            }
            else
            {
                this.sprite_id.setImagePos(x, 0x40);
                this.sprite_id.setPos(this.x - game.scroll_x - 35,
                                      this.y - game.scroll_y);
            }
        }
    }
    
    // Return pointer to this object
    return this;
}
