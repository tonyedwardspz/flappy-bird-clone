  'use strict';

  // call our prefabs
  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');
  var PipeGroup = require('../prefabs/pipeGroup');
  var ScoreBoard = require('../prefabs/ScoreBoard');

  function Play() {}
  Play.prototype = {
    create: function() {
      // enable arcade physics engine
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // set the gravity strength (acceleration towards ground @ 500px per second)
      this.game.physics.arcade.gravity.y = 1200;

      // add the background
      this.background = this.game.add.sprite(0, 0, 'background');

      // create bird object and add it to the game
      this.bird = new Bird(this.game, 100, this.game.height/2);
      this.game.add.existing(this.bird);

      // create and add a group to hold pipeGroups prefab
      this.pipes = this.game.add.group();

      // create gound object and add it to the game
      // (game, x, y, width, height, key)
      this.ground = new Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);

      // stop spacebar moving the webpage
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      // add keyboard controls
      var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      flapKey.onDown.addOnce(this.startGame, this);
      flapKey.onDown.add(this.bird.flap, this.bird);

      // add mouse / touch controls
      this.game.input.onDown.addOnce(this.startGame, this);
      this.input.onDown.add(this.bird.flap, this.bird); 

      // stop spacebar moving the webpage
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      //add the title group
      this.instructionGroup = this.game.add.group();
      this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100, 'getReady'));
      this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325, 'instructions'));
      this.instructionGroup.setAll('anchor.x', 0.5);
      this.instructionGroup.setAll('anchor.y', 0.5);

      // add the score to the game
      this.score = 0;

      // this.game.add.bitmapText(x, y, 'assetKey', 'text', fontSize);
      this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont', this.score.toString(), 25);
      this.scoreText.visible = true;

      //add sound
      this.scoreSound = this.game.add.audio('score');
    },
    update: function() {
      // check for collisions between brid and ground
      this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

      this.pipes.forEach(function(pipeGroup){
        this.checkScore(pipeGroup);
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
      }, this)
    },
    clickListener: function() {
      this.game.state.start('gameover');
    },
    generatePipes: function(){

      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = this.pipes.getFirstExists(false);

      if (!pipeGroup){
        pipeGroup = new PipeGroup(this.game, this.pipes);
      }

      pipeGroup.reset(this.game.width, pipeY);
    },
    deathHandler: function() {  
          this.bird.alive = false;
          this.pipes.callAll('stop');
          this.pipeGenerator.timer.stop();
          this.ground.stopScroll();
          this.scoreboard = new ScoreBoard(this.game);
          this.game.add.existing(this.scoreboard);
          this.scoreboard.show(this.score);
          this.bird.position.y = -500;

    },
    shutdown: function() {  
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();
      this.scoreboard.destroy();
    },
    startGame: function(){
      this.bird.body.allowGravity = true;
      this.bird.alive = true;

      // add a time
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
      this.pipeGenerator.timer.start();

      this.instructionGroup.destroy();
    },
    checkScore: function(pipeGroup){
      if (pipeGroup.exists && !pipeGroup.hasScored && pipeGroup.topPipe.world.x <= this.bird.world.x){
        pipeGroup.hasScored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());
        this.scoreSound.play();
      }
    }
  };
  
  module.exports = Play;