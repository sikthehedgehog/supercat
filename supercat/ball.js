//
// Ball object
//
// run() .... Behaviour function
// draw() ... Sprite update function
//

function Ball(x, y)
{
    // Calculate real coordinates
    this.x = x << 6;
    this.y = y << 6;
    
    // Initialization
    this.visible = false;
    
    // Sprite
    this.sprite_id = new Sprite;
    this.sprite_id.setImage("./supercat/items.png");
    this.sprite_id.setPos(-9001, -9001);
    this.sprite_id.setSize(64, 64);
    this.sprite_id.setImagePos(0, 0);
    this.sprite_id.setZIndex(25);
    this.sprite_id.attach(game.display);
    
    // Function with the behaviour code
    if (!Ball.prototype.run)
    Ball.prototype.run = function()
    {
        // Is the player jumping on us?
        if (game.player.x + 8 >= this.x && game.player.x - 8 <= this.x + 0x3F &&
        game.player.y >= this.y && game.player.y <= this.y + 64 &&
        game.player.gravity > 0)
        {
            // Make player bounce!
            game.player.gravity = -22;
        }
    }
    
    // Function to update the sprite
    if (!Ball.prototype.draw)
    Ball.prototype.draw = function()
    {
        var x = this.x - game.scroll_x;
        var y = this.y - game.scroll_y;
        
        // Out of range?
        if (x < -64 || x > 640 || y < -64 || y > 384)
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
