//
// Display object
//
// attach() ........ Attaches the display to an HTML object
// setSize() ....... Changes the size of the display
// setBGColor () ... Sets the background color of the display
//

function Display()
{
    var myself = this;
    
    // Create <div> object
    this.div_id = document.createElement("div");
    
    // Some initialization
    this.div_id.style.position = "relative";
    this.div_id.style.backgroundColor = "#808080";
    this.div_id.style.overflow = "hidden";
    this.div_id.style.zIndex = 0;
    
    //
    // Attaches the <div> object to something else
    // Needed to get it to show somewhere in the page
    //
    // @param new_parent ... Parent object for the <div> object
    //
    if (!Display.prototype.attach)
    Display.prototype.attach = function(new_parent)
    {
        this.div_parent = new_parent;
        this.div_parent.appendChild(this.div_id);
    }
    
    //
    // Changes the size of the display
    // Dimensions are given in pixels
    //
    // @param new_width .... Display width
    // @param new_height ... Display height
    //
    if (!Display.prototype.setSize)
    Display.prototype.setSize = function(new_width, new_height)
    {
        this.width = new_width;
        this.height = new_height;
        this.div_id.style.width = this.width + "px";
        this.div_id.style.height = this.height + "px";
    }
    
    //
    // Sets the background color of the display
    // Components range from 0 (unlit) to 255 (fully lit)
    //
    // @param red ..... Red component
    // @param green ... Green component
    // @param blue .... Blue component
    //
    if (!Display.prototype.setBGColor)
    Display.prototype.setBGColor = function(red, green, blue)
    {
        // Calculate RGB color value
        var color = (red & 0xFF) << 16 |
                    (green & 0xFF) << 8 |
                    (blue & 0xFF);
        
        // Set <div> background color
        // TO-DO: this code works, but there MUST be a proper way to get a
        // hexadecimal number string with padding... The googles do nothing
        // though >_>
        this.div_id.style.backgroundColor = "#" +
                                         ((color >> 20) & 0xF).toString(16) +
                                         ((color >> 16) & 0xF).toString(16) +
                                         ((color >> 12) & 0xF).toString(16) +
                                         ((color >> 8) & 0xF).toString(16) +
                                         ((color >> 4) & 0xF).toString(16) +
                                         (color & 0xF).toString(16);
    }
    
    // Use sensible defaults
    this.setSize(0, 0);
    this.setBGColor(0, 0, 0);
    
    // Needed for a horrible hack to get the Input object to work on Firefox
    this.input_id = document.createElement("input");
    this.input_id.style.position = "absolute";
    this.input_id.style.left = "-1000px";
    this.input_id.style.top = "0px";
    this.input_id.style.width = "0px";
    this.input_id.style.height = "0px";
    this.div_id.appendChild(this.input_id);
    
    if (this.div_id.addEventListener)
    {
        this.div_id.addEventListener("click", function()
            { myself.input_id.focus(); }, false);
    }
    
    // Return pointer to this display object
    return this;
}
