function Player()
{
  this.x = 100;
  this.y = 250;
  this.leg1Rotation = QUARTER_PI;
  this.leg2Rotation = -QUARTER_PI/2;
  this.knee1Rotation = 0;
  this.knee2Rotation = -QUARTER_PI;
  this.femurLength = 20;
  this.tibiaLength = 15;
  this.footLength = 5;
  this.xVelocity = 0;
  this.yVelocity = 0;
  this.height = 75;

  this.draw = function()
  {
    if(this.xVelocity > 0 && this.x < width)
    {
      this.x += this.xVelocity;
    }
    else if(this.xVelocity < 0 && this.x > 0)
    {
      this.x += this.xVelocity;
    }
    this.y += this.yVelocity;
    this.knee1X = this.x + this.femurLength * sin(this.leg1Rotation);
    this.knee1Y = this.y + this.femurLength * cos(this.leg1Rotation);
    this.knee2X = this.x + this.femurLength * sin(this.leg2Rotation);
    this.knee2Y = this.y + this.femurLength * cos(this.leg2Rotation);
    this.ankle1X = this.knee1X + this.tibiaLength * sin(this.knee1Rotation);
    this.ankle1Y = this.knee1Y + this.tibiaLength * cos(this.knee1Rotation);
    this.ankle2X = this.knee2X + this.tibiaLength * sin(this.knee2Rotation);
    this.ankle2Y = this.knee2Y + this.tibiaLength * cos(this.knee2Rotation);
    this.toe1X = this.ankle1X + this.footLength * cos(this.knee1Rotation);
    this.toe1Y = this.ankle1Y - this.footLength * sin(this.knee1Rotation);
    this.toe2X = this.ankle2X + this.footLength * cos(this.knee2Rotation);
    this.toe2Y = this.ankle2Y - this.footLength * sin(this.knee2Rotation);
    this.ankleX = this.kneeX
    this.shoulderX = this.x;
    this.shoulderY = this.y - this.height*4/7;
    this.armLength = 25;
    this.armAngle = atan((this.shoulderY - mouseY)/(this.shoulderX - mouseX));
    this.handX = this.shoulderX + this.armLength * cos(this.armAngle);
    this.handY = this.shoulderY + this.armLength * sin(this.armAngle);
    this.gunLength = 15;
    this.gunX = this.handX + this.gunLength * cos(this.armAngle);
    this.gunY = this.handY + this.gunLength * sin(this.armAngle);
    //this.gunGripLength = 10;
    //this.gunGripX = this.handX - this.gunGripLength * sin(this.armAngle);
    //this.gunGripY = this.handY + this.gunGripLength * cos(this.armAngle);
    strokeWeight(3);
    stroke(0, 0, 0);
    //leg 1
    line(this.x, this.y, this.knee1X, this.knee1Y);
    line(this.knee1X, this.knee1Y, this.ankle1X, this.ankle1Y);
    line(this.ankle1X, this.ankle1Y, this.toe1X, this.toe1Y);
    //leg 2
    line(this.x, this.y, this.knee2X, this.knee2Y);
    line(this.knee2X, this.knee2Y, this.ankle2X, this.ankle2Y);
    line(this.ankle2X, this.ankle2Y, this.toe2X, this.toe2Y);
    //body
    line(this.x, this.y, this.x, this.y - this.height);
    //head
    ellipse(this.x, this.y - this.height, 25);
    //shooting arm?
    line(this.shoulderX, this.shoulderY, this.handX, this.handY);
    //other arm
    line(this.shoulderX, this.shoulderY, this.shoulderX - 5, this.shoulderY + 25);
    line(this.shoulderX - 5, this.shoulderY + 25, this.shoulderX - 5, this.shoulderY + 40);
    //gun?
    strokeWeight(7);
    line(this.handX, this.handY, this.gunX, this.gunY);
    //line(this.handX, this.handY, this.gunGripX, this.gunGripY);
  }
}
