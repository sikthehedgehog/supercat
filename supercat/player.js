//
// Player object
//
// update() ......... Main update function
// updateSprite() ... Sprite update function
//

function Player()
{
    // List of possible actions
    this.action_list = new Array();
    this.action_list["idle"] = 0;
    this.action_list["walk"] = 1;
    this.action_list["jump"] = 2;
    
    // Initialize player data
    this.x = game.start_x;
    this.y = game.start_y;
    this.direction = false;
    this.speed = 0;
    this.gravity = 0;
    this.on_floor = false;
    
    // For animation purposes
    this.action = this.action_list["idle"];
    this.frame = 0;
    this.prev_frame = 0;
    this.prev_dir = false;
    
    // Create sprite for the player
    this.sprite_id = new Sprite;
    this.sprite_id.setImage("./supercat/supercat.png");
    this.sprite_id.setPos(-9001, -9001);
    this.sprite_id.setSize(80, 80);
    this.sprite_id.setImagePos(this.frame * 80, this.direction ? 80 : 0);
    this.sprite_id.setZIndex(100);
    this.sprite_id.attach(game.display);
    
    // Physics engine (collision against tilemap more than anything else)
    // In a separate function because this is madness >_>
    if (!Player.prototype.engine)
    Player.prototype.engine = function()
    {
        var value;
        
        // Going right?
        if (this.speed > 0)
        {
            // Get tile to check against
            if (this.y <= 0)
                value = game.coll_map[(this.x + 12 + this.speed) >> 6];
            else
                value = game.coll_map[((this.x + 12 + this.speed) >> 6) +
                (this.y >> 6) * game.map_width];
            
            // Tangible block?
            if (value == 1)
            {
                this.x = ((this.x + 13 + this.speed) & ~0x3F) - 13;
                this.speed = 0;
            }
            // Intangible block?
            else
                this.x += this.speed;
        }
        
        // Going left?
        else if (this.speed < 0)
        {
            // Get tile to check against
            if (this.y <= 0)
                value = game.coll_map[(this.x - 12 + this.speed) >> 6];
            else
                value = game.coll_map[((this.x - 12 + this.speed) >> 6) +
                (this.y >> 6) * game.map_width];
            
            // Tangible block?
            if (value == 1)
            {
                this.x = ((this.x - 13 + this.speed) & ~0x3F) + 77;
                this.speed = 0;
            }
            // Intangible block?
            else
                this.x += this.speed;
        }
        
        // Going down?
        if (this.gravity > 0)
        {
            // Get tile to check against
            value = game.coll_map[(this.x >> 6) + ((this.y + this.gravity)
                >> 6) * game.map_width];
            
            // Tangible block?
            if (value == 1)
            {
                this.y = ((this.y + 1 + this.gravity) & ~0x3F) - 1;
                this.gravity = 0;
                this.on_floor = true;
            }
            // Intangible block?
            else
            {
                this.y += this.gravity;
                this.on_floor = false;
            }
        }
        
        // Going up?
        else if (this.gravity < 0)
        {
            this.on_floor = false;
            
            // Get tile to check against
            if (this.y + this.gravity - 60 <= 0)
                value = game.coll_map[this.x >> 6];
            else
                value = game.coll_map[(this.x >> 6) + ((this.y + this.gravity
                - 60) >> 6) * game.map_width];
            
            // Tangible block?
            if (value == 1)
            {
                this.y = ((this.y - 60 + this.gravity) & ~0x3F) + 124;
                this.gravity = 0;
            }
            // Intangible block?
            else
                this.y += this.gravity;
        }
    };
    
    // Main player update function
    if (!Player.prototype.update)
    Player.prototype.update = function()
    {
        // Get control status
        var key_left = game.input.status.hold["left"];
        var key_right = game.input.status.hold["right"];
        var key_jump = game.input.status.press["action_1"];
        if (key_left && key_right)
            key_left = key_right = false;
        
        // Moving left?
        if (key_left)
        {
            this.action = this.action_list["walk"];
            this.direction = true;
            
            // Accelerate
            /*if (this.on_floor)
                this.speed = -10;
            else
            {*/
                this.speed -= 2;
                if (this.speed < -10)
                    this.speed = -10;
            //}
        }
        
        // Moving right?
        else if (key_right)
        {
            this.action = this.action_list["walk"];
            this.direction = false;
            
            // Accelerate
            /*if (this.on_floor)
                this.speed = 10;
            else
            {*/
                this.speed += 2;
                if (this.speed > 10)
                    this.speed = 10;
            //}
        }
        
        // Not moving sideways?
        else
        {
            this.action = this.action_list["idle"];
            
            // Deaccelerate
            if (this.on_floor)
            {
                if (this.speed > 0)
                {
                    this.speed -= 3;
                    if (this.speed < 0)
                        this.speed = 0;
                }
                else if (this.speed < 0)
                {
                    this.speed += 3;
                    if (this.speed > 0)
                        this.speed = 0;
                }
            }
            else
            {
                if (this.speed > 0)
                {
                    this.speed -= 1;
                    if (this.speed < 0)
                        this.speed = 0;
                }
                else if (this.speed < 0)
                {
                    this.speed += 1;
                    if (this.speed > 0)
                        this.speed = 0;
                }
            }
        }
        
        // Jump!
        if (this.on_floor && key_jump)
        {
            this.gravity = -14;
            this.on_floor = false;
        }
        
        // Physics interaction with the map
        this.on_floor = false;
        this.gravity += 1;
        this.engine();
        
        // Falling?
        if (!this.on_floor)
            this.action = this.action_list["jump"];
        
        // Prevent the player from going outbounds
        if (this.x < 0x20)
            this.x = 0x20;
        if (this.x > (game.map_width << 6) - 0x20)
            this.x = (game.map_width << 6) - 0x20;
    };
    
    // Update function for the sprite
    // It isn't called while frameskipping
    if (!Player.prototype.updateSprite)
    Player.prototype.updateSprite = function()
    {
        // Update sprite position
        this.sprite_id.setPos(this.x - game.scroll_x - 40,
                              this.y - game.scroll_y - 75);
        
        // Set frame according to the action
        if (this.action == this.action_list["walk"])
        {
            if (game.global_anim & 2)
                this.frame = 1;
            else
                this.frame = (game.global_anim >> 1) & 2;
        }
        else if (this.action == this.action_list["jump"])
            this.frame = 2;
        else
            this.frame = 0;
        
        // Update sprite frame if needed
        if (this.prev_frame != this.frame || this.direction != this.prev_dir)
        {
            this.prev_frame = this.frame;
            this.prev_dir = this.direction;
            this.sprite_id.setImagePos(this.frame * 80, this.direction ? 80 : 0);
        }
    };
    
    // Return pointer to player object
    return this;
}
