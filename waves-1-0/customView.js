function View(viewmodel) 
{
  let self = this;
  this._vm = viewmodel;
  this._frame = this._vm._frames;

  noFill();
  stroke(100);



  this.initialise = function()
  {
      background(this._vm._backgroundColor);
      this._frame = this._vm._frames;      
  };

  this.render = function(automaton)
  {
    
    if(this.isFullscreen)
    {
        scale(this._scalingX, this._scalingY);
    }
    background (this._vm._backgroundColor,10);
    const _centerX = this._vm._centerX;
    const _centerY = this._vm._centerY;
    strokeWeight(.75, 25);
    
    //zyklischer Modus
    if (this._vm.isCyclic)
    {   
        beginShape();

        curveVertex(this._vm._agentsX[0] + _centerX, this._vm._agentsY[0] + _centerY);   
        for (let i= 0; i<this._vm._agentsX.length; i++)
            {
                curveVertex(this._vm._agentsX[i] + _centerX, this._vm._agentsY[i] + _centerY);
            }
        curveVertex(this._vm._agentsX[0] + _centerX, this._vm._agentsY[0] + _centerY);    
        endShape(CLOSE);
    }
    //nicht-zyklischer Modus
    else
    {
        beginShape();
        curveVertex(this._vm._posX[0], this._vm._posY[0]); 
        for (let i= 0; i<this._vm._agentsX.length; i++)
        {
             curveVertex(this._vm._posX[i], this._vm._posY[i]);
        }
        curveVertex(this._vm._posX[this._vm._posX.length -1], this._vm._posY[this._vm._posY.length - 1]); 

        endShape();
    }

    this._frame++;
    if (this._frame < this._vm._frames && this._vm._automaton._generationCount !== 0)
    {
        this.setIsRendered(false); 
    }
    else
    {
        this._frame =0;
        this.setIsRendered(true);
        stroke(random(255),random(255), random(255));
    }
  }

  this.clearAll = function()
  {
    background(this._vm._backgroundColor);
    this._vm.reset();
    this._frame = this._vm._frames;
    this.setIsRendered(false);
    //fill(255);
    redraw();
  }
}
