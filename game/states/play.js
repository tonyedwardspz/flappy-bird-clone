  'use strict';

  // call our prefabs
  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');

  function Play() {}
  Play.prototype = {
    create: function() {
      // enable arcade physics engine
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // set the gravity strength (acceleration towards ground @ 500px per second)
      this.game.physics.arcade.gravity.y = 500;

      // add the background
      this.background = this.game.add.sprite(0, 0, 'background');

      // create bird object and add it to the game
      this.bird = new Bird(this.game, 100, this.game.height/2);
      this.game.add.existing(this.bird);

      // create gound object and add it to the game
      // (game, x, y, width, height, key)
      this.ground = new Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);
    },
    update: function() {
      // check for collisions between brid and ground
      this.game.physics.arcade.collide(this.bird, this.ground);
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;