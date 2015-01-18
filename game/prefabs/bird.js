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
  
  // write your prefab's specific update code here
  
};

module.exports = Bird;
