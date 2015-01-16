
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    // add the background
    this.background = this.game.add.sprite(0, 0, 'background');

    // add the ground and start scrolling (-x)
    this.ground = this.game.add.tileSprite(0, 400, 335, 112, 'ground');
    this.ground.autoScroll(-200, 0);

    // add a group to manipulate them all
    this.titleGroup = this.game.add.group();

    // add items to the group
    this.title = this.game.add.sprite(0, 0, 'title');
    this.titleGroup.add(this.title);

    //create the bird sprite
    this.bird = this.game.add.sprite(200, 5, 'bird');
    this.titleGroup.add(this.bird);

    //add animation to the bird
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true); 

    // set origination locatation of the group
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    // create oscillating animation tween for the group
    //this.game.add.tween(object).to(properties, duration, ease, autoStart, delay, repeat, yoyo);  
    this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  
    // add start button with call back
    //this.game.add.button(x, y, key, callback, callbackContext);  
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);
  },

  startClick: function(){
    this.game.state.start('play');
  },


  update: function() {

  }
};

module.exports = Menu;
