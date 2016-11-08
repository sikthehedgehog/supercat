//
// Items object
//
// add() .... Adds an object to the list
// run() .... Calls the run function for all objects
// draw() ... Calls the draw function for all objects
//

function Items()
{
    // Where we store the object list
    this.list = new Array;
    
    //
    // Adds an object to the list
    //
    // @param new_object ... New object to push
    //
    if (!Items.prototype.add)
    Items.prototype.add = function(new_object)
    {
        this.list.push(new_object);
    };
    
    //
    // Calls the run() function for all objects
    //
    if (!Items.prototype.run)
    Items.prototype.run = function()
    {
        var i;
        
        for (i = 0; i < this.list.length; i++)
            if (this.list[i].run)
                this.list[i].run(i);
    };
    
    //
    // Calls the draw() function for all objects
    //
    if (!Items.prototype.draw)
    Items.prototype.draw = function()
    {
        var i;
        
        for (i = 0; i < this.list.length; i++)
            if (this.list[i].draw)
                this.list[i].draw(i);
    };
    
    //
    // Removes an item from the list
    // WARNING: the IDs of the following objects will be shifted down by 1
    // This function is meant to be used to let items to remove themselves,
    // as they're given their ID when calling the run() and draw() options.
    //
    // @param item_id ... ID of item to remove
    //
    if (!Items.prototype.removeByID)
    Items.prototype.removeByID = function(item_id)
    {
        this.list.splice(item_id, 1);
    }
    
    // Return a pointer to this container
    return this;
}
