//---------------------------------------------------------------------------
// Framerate object
//
// This object acts as a framerate control system. It is basically a timer
// that runs at several cycles per second, and can be used to control the
// framerate for game logic or something similar.
//---------------------------------------------------------------------------
// Functions for this object:
//
// setRate() ..... Sets the rate of the frame counter
// reset() ....... Resets the frame counter
// getFrames() ... Returns the amount of frames elapsed since the last call
//---------------------------------------------------------------------------
function Framerate()
{
    // Return pointer to this object
    return this;
}

//
// Framerate.setRate()
// Changes the rate at which frames are counted
//
// @param rate ... Amount of frames per second
//
Framerate.prototype.setRate = function(rate)
{
    // Calculate new time difference between frames
    this.frameLen = 1000 / rate;
}

//
// Framerate.getFrames()
// Gets the amount of frames elapsed since the last call
// This is calculated based on the current rate
//
// @return ... Amount of frames elapsed since the last call
//
Framerate.prototype.getFrames = function()
{
    // Create Date object
    var d = new Date();
    
    // Get current time, in milliseconds
    var currTime = d.getTime();
    
    // Delete Date object
    delete d;
    
    // Calculate amount of frames elapsed
    // Also update time of the last frame if needed
    var totalFrames = 0;
    while (this.prevTime + this.frameLen <= currTime)
    {
        this.prevTime += this.frameLen;
        totalFrames++;
    }
    
    // Return amount of frames elapsed
    return totalFrames;
}

//
// Framerate.reset()
// Resets the counter used for frame control
//
Framerate.prototype.reset = function()
{
    // Create Date object
    var d = new Date();
    
    // Reset time of the last time to the current one
    this.prevTime = d.getTime();
    
    // Delete Date object
    delete d;
}
