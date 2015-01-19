'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // set anchor to center
  this.anchor.setTo(0.5, 0.5);

  // add and play animation
  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  // enable physics on the prefab
  this.game.physics.arcade.enableBody(this);
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  
  // rotate bird toward ground if angle is less than 2.5 degrees
  if (this.angle < 90){
  	this.angle += 2.5;
  }
  
};

Bird.prototype.flap = function() {
  
  // make the bird flap upwards (400px per second)
  this.body.velocity.y = -400;

  // rotate the bird to 40 degrees over 100ms
  this.game.add.tween(this).to({angle: -40}, 100).start();
};

module.exports = Bird;
