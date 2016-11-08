//
// Input object
//
// register() ... Registers the event handlers for the given object
// poll() ....... Updates the input status
//
// Thanks to Mook for suggesting the <input> hack. Yes, it's hackish indeed,
// but at least gets it to work on Firefox >_>
//

function Input()
{
    // IDs for the keys. Used for initialization purposes mainly.
    this.key_ids = ["up", "down", "left", "right", "action_1", "action_2",
        "start"];
    
    // Clears an array that stores keys status
    // Uses the list of IDs listed above
    if (!Input.prototype.clear_keys)
    Input.prototype.clear_keys = function(array)
    {
        var i;
        
        for (i = 0; i < this.key_ids.length; i++)
            array[this.key_ids[i]] = false;
    };
    
    // Current status of input
    // It's up to date depending on events
    this.curr_status = new Array();
    this.curr_status.press = new Array();
    this.curr_status.hold = new Array();
    this.clear_keys(this.curr_status.press);
    this.clear_keys(this.curr_status.hold);
    
    // Where the polled status is
    // Notice that this does distinguish between pressing (only lasts for one
    // poll) and holding (lasts until the key is released)
    this.status = new function() { return this; };
    this.status.press = new Array();
    this.status.hold = new Array();
    this.clear_keys(this.status.press);
    this.clear_keys(this.status.hold);
    
    // Used to update the status of the keys
    // Generic code for both handlers, bah
    if (!Input.prototype.update_key_status)
    Input.prototype.update_key_status = function(scan_code, value, repeat, e)
    {
        var key_name;
        
        // Determine what key is it
        if (scan_code == 38)
            key_name = "up";
        else if (scan_code == 40)
            key_name = "down";
        else if (scan_code == 37)
            key_name = "left";
        else if (scan_code == 39)
            key_name = "right";
        else if (scan_code == 32)
            key_name = "action_1";
        else if (scan_code == 88)
            key_name = "action_2";
        else if (scan_code == 13)
            key_name = "start";
        else
            return true;
        
        // Update key status
        this.curr_status.hold[key_name] = value;
        if (value && !repeat)
            this.curr_status.press[key_name] = true;
        
        // Prevent default action
        if (e.preventDefault)
            e.preventDefault();
        return false;
    };
    
    //
    // Function for the event handler
    // Uses the standard event method
    //
    if (!Input.prototype.handler)
    Input.prototype.handler = function(e, value, repeat)
    {
        // Get key scan-code
        var scan_code = e.keyCode;
        
        // Update key status
        this.update_key_status(scan_code, value, repeat, e);
    };
    
    //
    // Function for the event handler
    // Uses the legacy IE event method
    //
    if (!Input.prototype.iehandler)
    Input.prototype.iehandler = function(e, value)
    {
        var event_id;
        
        // Retrieve event handler value
        if (e)
            event_id = e;
        else if (event)
            event_id = event;
        else
            return true;
        
        // Process scan code
        event_id.returnValue = this.update_key_status(event_id.keyCode,
            value, false, event_id);
        return event_id.returnValue;
    };
    
    //
    // Handler for whenever the parent loses focus.
    // Clears all keys (setting them as not pressed).
    //
    if (!Input.prototype.clear_all)
    Input.prototype.clear_all = function()
    {
        this.clear_keys(this.curr_status.hold);
        this.clear_keys(this.curr_status.press);
    };
    
    //
    // Registers the event handlers tying them to the given object
    // Such an object is normally a Display object
    //
    // @param new_parent ... Parent object
    //
    if (!Input.prototype.register)
    Input.prototype.register = function(new_parent)
    {
        var myself = this;
        
        // Keep track of our current parent
        this.parent = new_parent;
        
        // Register event handlers
        if (this.parent.input_id.addEventListener)
        {
            this.parent.input_id.addEventListener("keydown",
                function(e) { myself.handler(e, true, false); }, false);
            this.parent.input_id.addEventListener("keypress",
                function(e) { myself.handler(e, true, true); }, false);
            this.parent.input_id.addEventListener("keyup",
                function(e) { myself.handler(e, false, false); }, false);
            this.parent.input_id.addEventListener("blur",
                function(e) { myself.clear_all(); }, false);
        }
        else
        {
            this.parent.div_id.onkeydown =
                function(e) { myself.iehandler(e, true); };
            this.parent.div_id.onkeyup =
                function(e) { myself.iehandler(e, false); };
            this.parent.div_id.onblur =
                function(e) { myself.clear_all(); };
        }
    };
    
    //
    // Polls the status of the input
    //
    if (!Input.prototype.poll)
    Input.prototype.poll = function()
    {
        var i, key_id;
        
        // Cycle through all supported keys
        for (i = 0; i < this.key_ids.length; i++)
        {
            // Get key id
            key_id = this.key_ids[i];
            
            // Update key status
            this.status.hold[key_id] = this.curr_status.hold[key_id];
            this.status.press[key_id] = this.curr_status.press[key_id];
            this.curr_status.press[key_id] = false;
        }
    };
    
    // Return pointer to this object
    return this;
}
