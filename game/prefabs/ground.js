'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  // start scrolling
  this.autoScroll(-200, 0);

  // enable physics on the ground sprite to allow collision with bird
  this.game.physics.arcade.enableBody(this);

  // stop gravity
  this.body.allowGravity = false;
  this.body.immovable = true;
  
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Ground;
