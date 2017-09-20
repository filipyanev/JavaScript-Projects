/// <reference path="../../Lib/phaser.d.ts"/>
///<reference path="../UI/TutorialManager.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FlappyBird;
(function (FlappyBird) {
    var AppChefUI = AppChefContainer.AppChefUI;
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game.prototype.init = function (isRestart) {
            this.isRestart = isRestart;
        };
        Game.prototype.create = function () {
            var _this = this;
            this.pipeSum = 0;
            this.isGameOver = false;
            this.perc = 1;
            this.fallingSound = this.game.add.audio('fallingSound');
            this.fallingSound.volume = 0.5;
            this.coinSound = this.game.add.audio('coinSound');
            this.coinSound.volume = 0.6;
            this.score = 0;
            /** add groups */
            this.pipes = this.game.add.group();
            this.topPipes = this.game.add.group();
            this.coins = this.game.add.group();
            AppChefContainer.Translator.init(this.game);
            this.tutorialManager = new FlappyBird.TutorialManager(this.game);
            this.background = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'background');
            this.background.anchor.set(0.5);
            this.background.height = this.game.height * 1.3;
            this.cloud = this.game.add.image(this.game.world.centerX, this.game.world.centerY - this.game.height * 0.5, 'clouds');
            this.cloud.anchor.set(0.5, 0);
            this.bird = this.game.add.sprite(this.game.width * 0.2, this.game.height * 0.2, 'bird');
            this.bird.anchor.set(0.5);
            this.bird.scale.set(0.35);
            this.startUpdate = false;
            this.ui = new AppChefUI(this.game, function () {
                _this.startGame();
            }, this.isRestart);
            if (!this.isRestart) {
                this.tutorialManager.tweenShowTutorial();
            }
        };
        Game.prototype.shutdown = function () {
            this.game.onBlur.removeAll();
            this.game.onPause.removeAll();
            this.game.onResume.removeAll();
            this.game.time.events.removeAll();
            this.game.input.onDown.removeAll();
            this.game.onBlur.removeAll();
            this.game.tweens.removeAll();
            this.tutorialManager.destroy();
            this.tutorialManager = null;
            this.ui.destroy();
            this.ui = null;
            this.background.destroy();
            this.background = null;
            this.coinSound.destroy();
            this.fallingSound.destroy();
            this.coinSound = null;
            this.fallingSound = null;
            this.isRestart = null;
            _super.prototype.shutdown.call(this);
        };
        Game.prototype.startGame = function () {
            var _this = this;
            if (!this.isRestart) {
                this.tutorialManager.tweenHideTutorial();
            }
            setTimeout(function () {
                _this.tutorialManager.hideTutorial();
            }, 400);
            this.game.input.enabled = true;
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spaceKey.onDown.add(this.jump, this);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.tween(this.cloud).to({
                x: this.game.world.centerX - 5,
                y: this.game.world.centerY - this.game.height * 0.49
            }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
            /** set loop to add new pipes */
            this.timer = this.game.time.events.loop(1700, function () {
                var randNum = Math.random() * 30;
                var xPos = _this.game.width + randNum;
                _this.addPipe(xPos, _this.game.height);
            }, this);
            this.game.physics.arcade.enable(this.bird);
            this.bird.body.gravity.y = 800;
            /** Interval which check for overlap */
            var myUI = this.ui;
            setInterval(function () {
                if (_this.game.input.activePointer.isDown) {
                    _this.jump();
                }
                if (_this.bird.angle < 15) {
                    _this.bird.angle = _this.bird.angle + 1;
                }
                /** if bird and some pipe are overlapped execute hitPipe function */
                _this.game.physics.arcade.overlap(_this.bird, _this.pipes, _this.hitPipe, null, _this);
                _this.game.physics.arcade.overlap(_this.bird, _this.topPipes, _this.hitPipe, null, _this);
                /** if coin is hit by bird -> destroy coin and add point to current score */
                _this.game.physics.arcade.overlap(_this.bird, _this.coins, onCollision);
                function onCollision(bird, coin) {
                    coin.kill();
                    this.score = this.score + 30;
                    myUI.setScore(Math.floor(this.score).toString());
                }
                if (_this.isGameOver) {
                    _this.game.time.events.remove(_this.birdPositionChecker);
                }
            }, 1);
            /** interval which check if the bird is out of screen and stop game when it's true */
            this.birdPositionChecker = this.game.time.events.loop(1000, function () {
                if (_this.bird.position.y <= 0 || _this.bird.position.y >= _this.game.height) {
                    _this.isGameOver = true;
                    _this.game.time.events.remove(_this.timer);
                    _this.stopMoving();
                    _this.ui.gameOverNormalGame(Math.floor(_this.score).toString());
                }
            }, this);
            this.game.onPause.add(function () {
                _this.tutorialManager.showTutorial();
                if (!_this.isGameOver) {
                    setTimeout(function () {
                        _this.tutorialManager.bringToTop();
                    }, 300);
                }
            });
            this.game.onResume.add(function () {
                if (!_this.isGameOver) {
                    _this.tutorialManager.hideTutorial();
                }
            });
        };
        /** jump function */
        Game.prototype.jump = function () {
            if (!this.isGameOver) {
                this.game.add.tween(this.bird).to({ angle: -15 }, 200).start();
                this.bird.body.velocity.y = -300;
            }
        };
        /** stop moving when game is over */
        Game.prototype.stopMoving = function () {
            var _this = this;
            /** Go through all the pipes and coins, and stop their movement when game is over */
            this.topPipes.forEach(function (p) {
                p.body.velocity.x = 0;
            }, this);
            this.pipes.forEach(function (p) {
                p.body.velocity.x = 0;
            }, this);
            this.coins.forEach(function (c) {
                c.body.velocity.x = 0;
            }, this);
            this.bird.bringToTop();
            this.fallingSound.play();
            setTimeout(function () {
                _this.fallingSound.stop();
            }, 2000);
        };
        /** on hit ... */
        Game.prototype.hitPipe = function () {
            var _this = this;
            if (!this.isGameOver) {
                this.emitter = this.game.add.emitter(this.bird.position.x, this.bird.position.y, 200);
                this.emitter.makeParticles('coin1');
                //	false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
                //	The 5000 value is the lifespan of each particle
                this.emitter.start(false, 5000, 1);
                /** If the bird has already hit a pipe, do nothing */
                /** It means the bird is already falling off the screen */
                if (this.bird.alive == false) {
                    return;
                }
                /** Set the alive property of the bird to false */
                this.bird.alive = false;
                /** Prevent new pipes from appearing and stop bird position checker */
                this.game.time.events.remove(this.timer);
                this.game.time.events.remove(this.birdPositionChecker);
                this.stopMoving();
                this.spaceKey.enabled = false;
                this.isGameOver = true;
                setTimeout(function () {
                    _this.ui.gameOverNormalGame(Math.floor(_this.score).toString());
                }, 500);
            }
        };
        /** add new pipes */
        Game.prototype.addPipe = function (x, y) {
            var _this = this;
            this.pipeSum++;
            if (!this.isGameOver) {
                var pipeHeight = (Math.random() * this.game.height * 0.5) + 0.10 * this.game.height;
                /** top pipe ------------------------------------------------------------- */
                var topPipe = this.game.add.sprite(x, 0, 'topPipe');
                topPipe.anchor.set(0.5, 0);
                topPipe.scale.set(0.4);
                topPipe.height = this.game.height - (pipeHeight + this.bird.height * 6);
                var topPartTopPipe = this.game.add.sprite(x, topPipe.height - 20, 'topPartBottomPipe');
                topPartTopPipe.anchor.set(0.5, 0);
                topPartTopPipe.scale.set(0.4);
                /** add pipes to group */
                this.topPipes.add(topPipe);
                this.topPipes.add(topPartTopPipe);
                this.game.world.bringToTop(this.topPipes);
                this.game.physics.arcade.enable(topPipe);
                this.game.physics.arcade.enable(topPartTopPipe);
                /** Add velocity to the pipe to make it move left */
                topPipe.body.velocity.x = -180 * this.perc;
                topPartTopPipe.body.velocity.x = -180 * this.perc;
                /** Automatically kill the pipe when it's no longer visible */
                topPipe.checkWorldBounds = true;
                topPipe.outOfBoundsKill = true;
                topPartTopPipe.checkWorldBounds = true;
                topPartTopPipe.outOfBoundsKill = true;
                /** create coins and add them to COINS group */
                var coin = this.game.add.sprite(x, topPipe.height + (this.bird.height * 3), 'coin');
                coin.anchor.set(0.5);
                coin.scale.set(0.3);
                this.game.physics.arcade.enable(coin);
                coin.body.velocity.x = -180 * this.perc;
                this.coins.add(coin);
                this.game.world.bringToTop(this.coins);
                /** bottom pipe-------------------------------------------------------  */
                var pipe = this.game.add.sprite(x, y, 'topPipe');
                pipe.anchor.set(0.5, 1);
                pipe.scale.set(0.4);
                pipe.height = pipeHeight;
                var topPartBottomPipe = this.game.add.sprite(x, y - pipe.height, 'topPartBottomPipe');
                topPartBottomPipe.anchor.set(0.5, 1);
                topPartBottomPipe.scale.set(0.4);
                /** add pipes to group */
                this.pipes.add(pipe);
                this.pipes.add(topPartBottomPipe);
                this.game.world.bringToTop(this.pipes);
                this.game.physics.arcade.enable(pipe);
                this.game.physics.arcade.enable(topPartBottomPipe);
                /** Add velocity to the pipe to make it move left */
                pipe.body.velocity.x = -180 * (this.perc);
                topPartBottomPipe.body.velocity.x = -180 * (this.perc);
                /** Automatically kill the pipe when it's no longer visible */
                pipe.checkWorldBounds = true;
                pipe.outOfBoundsKill = true;
                topPartBottomPipe.checkWorldBounds = true;
                topPartBottomPipe.outOfBoundsKill = true;
                /**  add signs  */
                if (this.pipeSum % 3 === 0) {
                    var angle = Math.random() * 20;
                    var znak = Math.floor(Math.random() * 2);
                    if (znak === 1) {
                        angle = angle * (-1);
                    }
                    var sign = this.game.add.sprite(x + 110, y, 'sign');
                    sign.anchor.set(0.5, 1);
                    sign.scale.set(0.2);
                    sign.angle = angle;
                    this.game.physics.arcade.enable(sign);
                    sign.body.velocity.x = -180 * (this.perc);
                }
                this.ui.bringToTop();
                /** set score */
                this.perc += 0.05;
                setTimeout(function () {
                    _this.score += 100 * _this.perc;
                    _this.ui.setScore(Math.floor(_this.score).toString());
                }, 1500);
            }
        };
        return Game;
    }(Phaser.State));
    FlappyBird.Game = Game;
})(FlappyBird || (FlappyBird = {}));
