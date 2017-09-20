// <reference path="../../Lib/phaser.d.ts"/>
///<reference path="../../app-chef-game-container/AppChefUI.ts"/>
///<reference path="../UI/TutorialManager.ts"/>
///<reference path="../UI/HealthBar.ts"/>
///<reference path="../UI/UI.ts"/>

module HiLo {
    import AppChefUI = AppChefContainer.AppChefUI;


    export class Game extends Phaser.State {
        private ui: AppChefContainer.AppChefUI;
        private isRestart: boolean;
        private tutorialManager: TutorialManager;
        private cursors;
        private swipe;
        private background: Phaser.Sprite;
        private back: Phaser.Image; back1: Phaser.Sprite;back2: Phaser.Sprite;back3: Phaser.Sprite;back4: Phaser.Sprite;back5: Phaser.Sprite;
        private pokerChip0: Phaser.Image; pokerChip1: Phaser.Image; pokerChip2: Phaser.Image; pokerChip3: Phaser.Image; pokerChip4: Phaser.Image; pokerChip5: Phaser.Image; pokerChip6: Phaser.Image;
        private passedCardPosX: number;
        private passedCardPosY: number;
        private cardWidthSize: number;
        private cardHeightSize: number;
        private nearestCard;
        private tap: Phaser.Image;
        private firstChoose;
        private nearestCardAngle:number;
        private angle: number;
        private cardArray; cardNamesArray;
        private firstCard;
        private spade1; spade2; spade3; spade4; spade5; spade6; spade7; spade8; spade9; spade10; spade11; spade12; spade13;
        heart1; heart2; heart3; heart4; heart5; heart6; heart7; heart8; heart9; heart10; heart11; heart12; heart13;
        diamo1; diamo2; diamo3; diamo4; diamo5; diamo6; diamo7; diamo8; diamo9; diamo10; diamo11; diamo12; diamo13;
        clubb1; clubb2; clubb3; clubb4; clubb5; clubb6; clubb7; clubb8; clubb9; clubb10; clubb11; clubb12; clubb13;
        private currentCard;
        private secondCard;
        private isClicked: boolean;

        private deckPosX: number;
        private deckPosY: number;
        private isHigher: boolean;
        private isGameOver: boolean;
        private score : number;

        private cardCounter: number;
        private rotationAngle:number;
        private origX: number;
        private origY: number;
        private radius: number;

        private cardsSpin;
        private endBackPosition: number;

        private successSound;
        private failSound;
        private positionCurrCardTween;

        private correctAnsCounter;
        private isStarAnim: boolean;
        private isStar2Anim: boolean;
        private isStar3Anim: boolean;

        private isFirstFlipped: boolean;
        private ChipArr;
        private lastChipIndex: number;

        private star: Phaser.Image;star2: Phaser.Image;star3: Phaser.Image;correct: Phaser.Image;err: Phaser.Image;

        private shadowLo: Phaser.Image;shadowHi: Phaser.Image;







        init(isRestart) {
            this.isRestart = isRestart;
            this.game.time.advancedTiming = true;
        }

        create() {
            this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
            this.background.anchor.set(0.5);
            this.background.inputEnabled = true;


            this.cardWidthSize = this.game.width * 0.3;
            this.cardHeightSize = this.cardWidthSize * 1.4;
            /** CARDS USED FOR RADIAL ANIMATION */
            this.back2 = this.game.add.sprite(this.game.width * 2, this.game.height * 2, 'cardback');
            this.back2.height = this.cardHeightSize;
            this.back2.width = this.cardWidthSize;
            this.back2.anchor.set(0.5);

            this.back3 = this.game.add.sprite(this.game.width * 2, this.game.height * 2, 'cardback');
            this.back3.height = this.cardHeightSize;
            this.back3.width = this.cardWidthSize;
            this.back3.anchor.set(0.5);

            this.back4 = this.game.add.sprite(this.game.width * 2, this.game.height * 2, 'cardback');
            this.back4.height = this.cardHeightSize;
            this.back4.width = this.cardWidthSize;
            this.back4.anchor.set(0.5);

            this.back5 = this.game.add.sprite(this.game.width * 2, this.game.height * 2, 'cardback');
            this.back5.height = this.cardHeightSize;
            this.back5.width = this.cardWidthSize;
            this.back5.anchor.set(0.5);

            this.back2.visible = false;
            this.back3.visible = false;
            this.back4.visible = false;
            this.back5.visible = false;

            this.pokerChip0 = this.game.add.sprite(this.game.world.centerX-120, this.game.height - this.game.width * 0.15, 'pokerChip3');
            this.pokerChip0.width = this.game.width * 0.18;
            this.pokerChip0.height = this.game.width * 0.18;
            this.pokerChip0.anchor.set(0.5);
            this.pokerChip0.visible = false;
            this.pokerChip1 = this.game.add.sprite(this.game.world.centerX - 80, this.game.height - this.game.width * 0.15, 'pokerChip1');
            this.pokerChip1.width = this.game.width * 0.18;
            this.pokerChip1.height = this.game.width * 0.18;
            this.pokerChip1.anchor.set(0.5);
            this.pokerChip1.visible = false;
            this.pokerChip2 = this.game.add.sprite(this.game.world.centerX-40, this.game.height - this.game.width * 0.15, 'pokerChip2');
            this.pokerChip2.width = this.game.width * 0.18;
            this.pokerChip2.height = this.game.width * 0.18;
            this.pokerChip2.anchor.set(0.5);
            this.pokerChip2.visible = false;
            this.pokerChip3 = this.game.add.sprite(this.game.world.centerX , this.game.height - this.game.width * 0.15, 'pokerChip1');
            this.pokerChip3.width = this.game.width * 0.18;
            this.pokerChip3.height = this.game.width * 0.18;
            this.pokerChip3.anchor.set(0.5);
            this.pokerChip3.visible = false;
            this.pokerChip4 = this.game.add.sprite(this.game.world.centerX + 40, this.game.height - this.game.width * 0.15, 'pokerChip4');
            this.pokerChip4.width = this.game.width * 0.18;
            this.pokerChip4.height = this.game.width * 0.18;
            this.pokerChip4.anchor.set(0.5);
            this.pokerChip4.visible = false;
            this.pokerChip5 = this.game.add.sprite(this.game.world.centerX + 80, this.game.height - this.game.width * 0.15, 'pokerChip2');
            this.pokerChip5.width = this.game.width * 0.18;
            this.pokerChip5.height = this.game.width * 0.18;
            this.pokerChip5.anchor.set(0.5);
            this.pokerChip5.visible = false;
            this.pokerChip6 = this.game.add.sprite(this.game.world.centerX + 120, this.game.height - this.game.width * 0.15, 'pokerChip1');
            this.pokerChip6.width = this.game.width * 0.18;
            this.pokerChip6.height = this.game.width * 0.18;
            this.pokerChip6.anchor.set(0.5);
            this.pokerChip6.visible = false;



            this.tap = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + this.game.height * 0.25, 'tap');
            this.tap.width = this.game.width * 0.25;
            this.tap.height = this.game.width * 0.25;
            this.tap.anchor.set(0.5);
            this.tap.visible = false;

            this.firstChoose = 0;
            this.angle = Math.random()* 6;
            let znak = Math.floor(Math.random()* 2);
            if(znak === 1){
                this.angle = this.angle * (-1);
            }

            this.cardArray = [this.spade1,this.spade2,this.spade3,this.spade4,this.spade5,this.spade6,this.spade7,this.spade8,this.spade9,this.spade10,this.spade11,
                this.spade12,this.spade13,this.heart1,this.heart2,this.heart3,this.heart4,this.heart5,this.heart6,this.heart7,this.heart8,this.heart9,this.heart10,this.heart11,
                this.heart12,this.heart13,this.diamo1,this.diamo2,this.diamo3,this.diamo4,this.diamo5,this.diamo6,this.diamo7,this.diamo8,this.diamo9,this.diamo10,this.diamo11,
                this.diamo12,this.diamo13,this.clubb1,this.clubb2,this.clubb3,this.clubb4,this.clubb5,this.clubb6,this.clubb7,this.clubb8,this.clubb9,this.clubb10,this.clubb11,
                this.clubb12,this.clubb13];
            this.cardNamesArray = ["spade1","spade2","spade3","spade4","spade5","spade6","spade7","spade8","spade9","spade10","spade11",
                "spade12","spade13","heart1","heart2","heart3","heart4","heart5","heart6","heart7","heart8","heart9","heart10","heart11",
                "heart12","heart13","diamo1","diamo2","diamo3","diamo4","diamo5","diamo6","diamo7","diamo8","diamo9","diamo10","diamo11",
                "diamo12","diamo13","clubb1","clubb2","clubb3","clubb4","clubb5","clubb6","clubb7","clubb8","clubb9","clubb10","clubb11",
                "clubb12","clubb13"];
            this.isClicked = false;

            this.deckPosX = this.game.world.centerX + 0.7 * this.cardWidthSize;
            this.deckPosY = this.game.world.centerY + 0.05 * this.game.height;
            this.isHigher;
            this.isGameOver = false;
            this.score = 0;

            this.cardCounter= 1;
            this.rotationAngle = 45;
            this.origX = this.game.width * 0.5;
            this.origY = this.game.height;
            this.radius = this.game.height * 0.5;
            this.endBackPosition = 0;

            this.successSound = this.game.add.audio('success');
            this.successSound.volume = 0.2;
            this.failSound = this.game.add.audio('fail');
            this.failSound.volume = 0.2;

            this.correctAnsCounter = 0;
            this.isStarAnim = false;
            this.isStar2Anim = false;
            this.isStar3Anim = false;
            this.isFirstFlipped = false;

            this.ChipArr = [this.pokerChip0, this.pokerChip1, this.pokerChip2, this.pokerChip3, this.pokerChip4, this.pokerChip5, this.pokerChip6];
            this.lastChipIndex = 6;

            this.star = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 0.28 * this.game.height, 'star');
            this.star.anchor.set(0.5);
            this.star.width = this.pokerChip0.width * 1.2;
            this.star.height = this.pokerChip0.height * 1.2;
            this.star.alpha = 0;

            this.star2 = this.game.add.sprite(this.game.world.centerX - this.star.width, this.game.world.centerY - 0.25 * this.game.height, 'star');
            this.star2.anchor.set(0.5);
            this.star2.width = this.pokerChip0.width;
            this.star2.height = this.pokerChip0.height;
            this.star2.alpha = 0;

            this.star3 = this.game.add.sprite(this.game.world.centerX + this.star.width, this.game.world.centerY - 0.25 * this.game.height, 'star');
            this.star3.anchor.set(0.5);
            this.star3.width = this.pokerChip0.width;
            this.star3.height = this.pokerChip0.height;
            this.star3.alpha = 0;

            this.correct = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY - 0.19 * this.game.height,'correct');
            this.correct.width = this.game.width * 0.1;
            this.correct.height = this.game.width * 0.1;
            this.correct.anchor.set(0.5);
            this.correct.visible = false;

            this.err = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY - 0.19 * this.game.height,'err');
            this.err.width = this.game.width * 0.1;
            this.err.height = this.game.width * 0.1;
            this.err.anchor.set(0.5);
            this.err.visible = false;

            this.shadowLo = this.game.add.sprite(this.game.world.centerX, this.game.height, 'shadow');
            this.shadowLo.width = this.game.width;
            this.shadowLo.height = this.game.height * 0.5;
            this.shadowLo.anchor.set(0.5, 0);
            this.shadowLo.angle = 180;
            this.shadowHi = this.game.add.sprite(this.game.world.centerX, 0, 'shadow');
            this.shadowHi.width = this.game.width;
            this.shadowHi.height = this.game.height * 0.5;
            this.shadowHi.anchor.set(0.5, 0);
            this.shadowHi.visible = false;
            this.shadowLo.visible = false;
            this.shadowLo.alpha = 0.5;
            this.shadowHi.alpha = 0.5;

            this.back = this.game.add.sprite(this.deckPosX, this.deckPosY, 'cardback');
            this.back.height = this.cardHeightSize;
            this.back.width = this.cardWidthSize;
            this.back.anchor.set(0.5);
            this.back.visible = false;

            this.back1 = this.game.add.sprite(this.deckPosX, this.deckPosY, 'cardback');
            this.back1.height = this.cardHeightSize;
            this.back1.width = this.cardWidthSize;
            this.back1.anchor.set(0.5);
            this.back1.visible = false;

            AppChefContainer.Translator.init(this.game);
            this.tutorialManager = new TutorialManager(this.game);

            this.ui = new AppChefUI(this.game, ()=>{
                    this.startGame()
                }
                , this.isRestart);


            if (!this.isRestart) {
                this.tutorialManager.tweenShowTutorial();
            }
        }

        shutdown() {
            this.game.onBlur.removeAll();
            this.game.onPause.removeAll();
            this.game.onResume.removeAll();
            this.game.time.events.removeAll();
            this.game.input.onDown.removeAll();
            this.game.onBlur.removeAll();
            this.game.tweens.removeAll();
            this.tutorialManager.destroy();
            this.tutorialManager = null;
            this.isRestart = null;

            this.background.destroy();
            this.cardWidthSize = null;
            this.cardHeightSize = null;
            this.back2.destroy();
            this.back3.destroy();
            this.back4.destroy();
            this.back5.destroy();
            this.back2.destroy();
            this.pokerChip0.destroy();
            this.pokerChip1.destroy();
            this.pokerChip2.destroy();
            this.pokerChip3.destroy();
            this.pokerChip4.destroy();
            this.pokerChip5.destroy();
            this.pokerChip6.destroy();
            this.passedCardPosX = null;
            this.passedCardPosY = null;
            this.tap.destroy();
            this.angle = null;
            this.cardArray = null;
            this.cardNamesArray = null;
            this.isClicked = null;
            this.deckPosX = null;
            this.deckPosY = null;
            this.isHigher = null;
            this.isGameOver = null;
            this.score = null;
            this.cardCounter = null;
            this.rotationAngle = null;
            this.origX = null
            this.origY = null;
            this.radius = null;
            this.endBackPosition = null;
            this.successSound.destroy();
            this.failSound.destroy();
            this.correctAnsCounter = null;
            this.isStarAnim = null;
            this.isStar2Anim = null;
            this.isStar3Anim = null;
            this.isFirstFlipped = null;
            this.ChipArr = null;
            this.lastChipIndex = null;
            this.star.destroy();
            this.star2.destroy();
            this.star3.destroy();
            this.correct.destroy();
            this.err.destroy();
            this.shadowHi.destroy();
            this.back.destroy();
            this.back1.destroy();

            this.background = null;
            this.back2 = null;
            this.back3 = null;
            this.back4 = null;
            this.back5 = null;
            this.back2 = null;
            this.pokerChip0 = null;
            this.pokerChip1 = null;
            this.pokerChip2 = null;
            this.pokerChip3 = null;
            this.pokerChip4 = null;
            this.pokerChip5 = null;
            this.pokerChip6 = null;
            this.tap = null;
            this.successSound = null;
            this.failSound = null;
            this.star = null;
            this.star2 = null;
            this.star3 = null;
            this.correct = null;
            this.err = null;
            this.shadowHi = null;
            this.back = null;
            this.back1 = null;

            super.shutdown();
        }

        startGame() {

            this.passedCardPosX = this.game.world.centerX - 0.7 * this.cardWidthSize;
            this.passedCardPosY = this.game.world.centerY + 0.05 * this.game.height;


            if (!this.isRestart) {
                this.tutorialManager.tweenHideTutorial();
            }

            /**  AFTER START CALL FUNCTION FOR CARD ROTATION */
            setTimeout(this.cardRotation(),500);

            this.game.add.tween(this.tap.scale).to({ x: 0.3, y: 0.3 }, 500, Phaser.Easing.Cubic.InOut, true,0,-1,true);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.swipe = this.game.input.mousePointer;
            this.tap.bringToTop();

            /** ADD EVENTS */
            this.back1.inputEnabled = true;
            this.back1.input.enableDrag();
            this.back1.events.onDragStart.add(function(){
                this.back1.bringToTop();
                this.endBackPosition = 0;
            }, this);
            this.back1.events.onDragUpdate.add(function(){

                /*
                // DRAG CARD ONLY UP AND DOWN
                */
                this.back1.position.x = this.deckPosX;
                if(this.back1.position.y > this.deckPosY){
                    this.endBackPosition = 10;
                    this.shadowHi.visible = false;
                    this.isHigher = false;
                    this.shadowLo.visible = true;
                }else if(this.back1.position.y < this.deckPosY){
                    this.endBackPosition = 10;
                    this.isHigher = true;
                    this.shadowHi.visible = true;
                    this.shadowLo.visible = false;
                }
            },this);
            this.back1.events.onDragStop.add(function(){
                this.shadowHi.visible = false;
                this.shadowLo.visible = false;
            }, this);
            this.back1.events.onDragStop.add(this.flipCard, this);

            this.background.events.onInputDown.add(this.chooseFirstCard, this);
            this.tap.events.onInputDown.add(this.chooseFirstCard, this);

            this.back2.inputEnabled = true;
            this.back3.inputEnabled = true;
            this.back4.inputEnabled = true;
            this.back5.inputEnabled = true;
            this.back2.events.onInputDown.add(this.chooseFirstCard, this);
            this.back3.events.onInputDown.add(this.chooseFirstCard, this);
            this.back4.events.onInputDown.add(this.chooseFirstCard, this);
            this.back5.events.onInputDown.add(this.chooseFirstCard, this);
            this.back.visible = false;
            this.back1.visible = false;

            let cleanInt;

            this.game.onPause.add(() => {
                // this.game.time.events.pause();
                /** pause front card tween and make in invisible */
                cleanInt = setInterval(()=>{
                    if(this.firstChoose != 0 ) {
                        if(this.positionCurrCardTween != undefined){
                            this.positionCurrCardTween.stop();
                        }
                        if(this.currentCard != undefined) {
                            if (this.currentCard.position.x != this.passedCardPosX) {
                                this.currentCard.visible = false;
                            }
                        }
                        this.back1.visible = false;
                    }
                    if(this.nearestCard != undefined){
                        /** destroy nearest card if pause game in the beg.  */
                        setTimeout(()=>{
                            this.nearestCard.destroy();
                        },100);
                    }
                },10);

                if (!this.isGameOver) {
                    this.game.tweens.removeAll();
                    this.ui.bringToTop();
                    this.tutorialManager.showTutorial();
                    this.tutorialManager.bringToTop();
                    setTimeout(() => {
                        this.tutorialManager.bringToTop();
                    }, 300);
                }
                else {
                    this.tutorialManager.hideTutorial();
                }
            });
            this.game.onResume.add(() => {
                this.game.time.events.resume();
                /** resume front card tween and make in visible ,also clean interval from pause*/
                clearInterval(cleanInt);
                if(this.firstChoose != 0 ) {
                    if(this.currentCard != undefined) {
                        this.currentCard.visible = true;
                        this.currentCard.position.x = this.passedCardPosX;
                        this.currentCard.position.y = this.passedCardPosY;
                        this.currentCard.width = this.cardWidthSize;
                        this.currentCard.height = this.cardHeightSize;
                    }
                    this.back1.visible = true;

                }
                if(this.positionCurrCardTween != undefined){
                    // positionCurrCardTween.resume();
                }
                if (!this.isGameOver) {
                    this.afterRes();
                    this.tutorialManager.hideTutorial();
                } else {
                    this.back1.destroy();
                    this.back.destroy();
                }
            });
        }

        private chooseFirstCard(){
            if(this.back2.position.x >= this.game.width * 0.2 && this.back2.position.x <= this.game.width * 0.8 && this.back2.position.y <= this.game.height){
                this.nearestCard = this.back2;
                this.firstChoose++;
                this.back2.inputEnabled = false;
                this.back3.destroy();
                this.back4.destroy();
                this.back5.destroy();
                this.tap.inputEnabled = false;
                this.background.inputEnabled = false;
            }
            if(this.back3.position.x >= this.game.width * 0.2 && this.back3.position.x <= this.game.width * 0.8 && this.back3.position.y <= this.game.height){
                this.nearestCard = this.back3;
                this.firstChoose++;
                this.back3.inputEnabled = false;
                this.back2.destroy();
                this.back4.destroy();
                this.back5.destroy();
                this.tap.inputEnabled = false;
                this.background.inputEnabled = false;
            }
            if(this.back4.position.x >= this.game.width * 0.2 && this.back4.position.x <= this.game.width * 0.8 && this.back4.position.y <= this.game.height){
                this.nearestCard = this.back4;
                this.firstChoose++;
                this.back2.destroy();
                this.back3.destroy();
                this.back4.inputEnabled = false;
                this.back5.destroy();
                this.tap.inputEnabled = false;
                this.background.inputEnabled = false;
            }
            if(this.back5.position.x >= this.game.width * 0.2 && this.back5.position.x <= this.game.width * 0.8 && this.back5.position.y <= this.game.height){
                this.nearestCard = this.back5;
                this.firstChoose++;
                this.back2.destroy();
                this.back3.destroy();
                this.back4.destroy();
                this.back5.inputEnabled = false;
                this.tap.inputEnabled = false;
                this.background.inputEnabled = false;
            }
            if (this.nearestCard != undefined){
                clearInterval(this.cardsSpin);
                // myGame.time.events.stop();
                this.back2.inputEnabled = false;
                this.back2.inputEnabled = false;
                this.back3.inputEnabled = false;
                this.back4.inputEnabled = false;
                this.back5.inputEnabled = false;
                this.tap.inputEnabled = false;

                this.background.inputEnabled = false;

                this.nearestCardAngle = this.nearestCard.angle;
                this.game.add.tween(this.nearestCard).to({
                    x: this.passedCardPosX,
                    y: this.passedCardPosY,
                    angle: this.angle
                }, 100, Phaser.Easing.Linear.None, true, 0);
                this.game.add.tween(this.tap.scale).to({
                    x: 0,
                    y: 0
                }, 500, Phaser.Easing.Linear.None, true, 400);

                setTimeout(this.afterChoose(),900);
                this.setFirstCard();
                this.game.add.tween(this.nearestCard.scale).to({x: 0}, 100, Phaser.Easing.Linear.None, true, 400);
            }
        }

        /** SET FIRST CARD */
        private setFirstCard(){
            if (this.firstChoose === 1) {
                let randIndex = Math.floor(Math.random() * this.cardArray.length);
                if (this.cardNamesArray[randIndex] === "none") {
                    while (this.cardNamesArray[randIndex] === "none") {
                        randIndex = Math.floor(Math.random() * this.cardArray.length);
                    }
                }


                this.loadImage(this.cardNamesArray[randIndex]);
                this.game.load.start();

                setTimeout(()=>{
                    this.addFirstCardSprite(randIndex)}, 300);
            }
        }

        /** FLIP CARD FROM DECK */

        private flipCard() {
            if (!this.isClicked && this.endBackPosition != 0) {
                this.isClicked = true;
                this.back1.inputEnabled = false;
                if (this.cardCounter <= 50) {
                    /**
                     GET RANDOM CARD FROM CARD ARRAY
                     */
                    let randIndex = Math.floor(Math.random() * this.cardArray.length);
                    // let currentCard;
                    if (this.cardNamesArray[randIndex] === "none") {
                        while (this.cardNamesArray[randIndex] === "none") {
                            randIndex = Math.floor(Math.random() * this.cardArray.length);
                        }
                    }
                    this.loadImage(this.cardNamesArray[randIndex]);
                    this.game.load.start();

                    this.cardArray[randIndex] = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - this.cardWidthSize, this.cardNamesArray[randIndex]);
                    this.cardArray[randIndex].width = 1.25 * this.cardWidthSize;
                    this.cardArray[randIndex].height = 1.25 * this.cardHeightSize;
                    this.cardArray[randIndex].anchor.set(0.5);
                    this.cardArray[randIndex].alpha = 0;
                    this.currentCard = this.cardArray[randIndex];

                    /**
                     TWEEN ANIMATION FOR CARD BACK
                     */
                    this.game.add.tween(this.back1).to({
                        x: this.game.world.centerX,
                        y: this.game.world.centerY,
                        width: 1.25 * this.cardWidthSize,
                        height: 1.25 * this.cardHeightSize
                    }, 100, Phaser.Easing.Linear.None, true, 0);

                    /**
                     GET RANDOM CARD AND PLACE IT BELOW CARD BACK
                     */
                    setTimeout(()=>{this.getRandomFrontCard()}, 300);

                    /**
                     ROTATE BACK AND FRONT
                     */
                    let angle = Math.random() * 8;
                    let znak = Math.floor(Math.random() * 2);
                    if (znak === 1) {
                        angle = angle * (-1);
                    }

                    this.back1.bringToTop();
                    this.game.add.tween(this.back1.scale).to({x: 0}, 50, Phaser.Easing.Linear.None, true, 300);
                    this.game.add.tween(this.currentCard).to({width: 1.25 * this.cardWidthSize, height:1.25 * this.cardHeightSize, angle: angle}, 100, Phaser.Easing.Linear.None, true, 350);

                    /**
                     DELETE THIS CARD FROM CARD ARRAY
                     */
                    this.cardNamesArray[randIndex] = "none";
                    this.secondCard = this.currentCard;
                    this.checkCards();
                    this.firstCard = this.currentCard;

                    setTimeout(()=>{this.getBack1ToDeck()}, 800);
                } else {
                    this.isGameOver = true;
                    this.back1.destroy();
                    this.back.destroy();
                    this.ui.gameOverNormalGame(this.score.toString());
                }

            }
        }

        /** CHECK PLAYER GUESS (higher or lower) */
        private checkCards() {
            if (this.isHigher === true && parseInt(this.firstCard.key.substring(5)) < parseInt(this.secondCard.key.substring(5))) {
                this.successSound.play();
                this.correct.visible = true;
                this.game.add.tween(this.correct).from({
                    alpha : 0
                }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
                this.correct.bringToTop();
                this.correctAnsCounter++;
                this.score = this.score + 80;
                this.ui.setScore(this.score.toString());
            }
            if (this.isHigher === true && parseInt(this.firstCard.key.substring(5)) > parseInt(this.secondCard.key.substring(5))) {
                this.failSound.play();
                setTimeout(()=>{this.getChip()},300);
                this.err.visible = true;
                this.game.add.tween(this.err).from({
                    alpha : 0
                }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
                this.err.bringToTop();
                this.correctAnsCounter = 0;
                if(this.score > 10){
                    this.score = this.score - 10;
                    this.ui.setScore(this.score.toString());
                }
            }
            if (this.isHigher === false && parseInt(this.firstCard.key.substring(5)) > parseInt(this.secondCard.key.substring(5))) {
                this.successSound.play();
                this.correct.visible = true;
                this.game.add.tween(this.correct).from({
                    alpha : 0
                }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
                this.correct.bringToTop();
                this.correctAnsCounter++;
                this.score = this.score + 80;
                this.ui.setScore(this.score.toString());
            }
            if (this.isHigher === false && parseInt(this.firstCard.key.substring(5)) < parseInt(this.secondCard.key.substring(5))) {
                this.failSound.play();
                setTimeout(()=>{this.getChip()},300);
                this.err.visible = true;
                this.game.add.tween(this.err).from({
                    alpha : 0
                }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
                this.err.bringToTop();
                this.correctAnsCounter = 0;
                if(this.score > 10){
                    this.score = this.score - 10;
                    this.ui.setScore(this.score.toString());
                }
            }
            this.animateChips();

            /* ADD BONUSES FROM STARS WHEN ENOUGH RIGHT GUESSES ARE MADE
             *  FIRST STAR - 300 POINTS;
             *  SECOND STAR - 500 POINTS;
             *  THIRD STAR - 700 POINTS.
            */
            if(this.correctAnsCounter === 2 && this.isStarAnim === false){
                this.isStarAnim = true;
                this.score = this.score + 300;
                this.ui.setScore(this.score.toString());
                this.star.alpha = 0.8;
                this.game.add.tween(this.star).to({width: this.star.width * 1.25, height: this.star.height * 1.25,alpha: 1}, 300, Phaser.Easing.Linear.None, true,250, 0,true);
                this.game.add.tween(this.star).to({alpha: 1},100,Phaser.Easing.Linear.None, true,1000);

                setTimeout(()=>{
                    this.star.width = this.pokerChip0.width * 1.2;
                    this.star.height = this.pokerChip0.width * 1.2;
                },1200);
            }
            if(this.correctAnsCounter === 4 && this.isStar2Anim === false){
                this.isStar2Anim = true;
                this.score = this.score + 500;
                this.ui.setScore(this.score.toString());
                this.star2.alpha = 0.8;
                this.game.add.tween(this.star2).to({width: this.star.width * 1.25, height: this.star.height * 1.25,alpha: 1}, 300, Phaser.Easing.Linear.None, true,250, 0,true);
                this.game.add.tween(this.star2).to({alpha: 1},100,Phaser.Easing.Linear.None, true,1000);

                setTimeout(()=>{
                    this.star2.width = this.pokerChip0.width;
                    this.star2.height = this.pokerChip0.width;
                },1200);
            }
            if(this.correctAnsCounter === 6 && this.isStar3Anim === false){
                this.isStar3Anim = true;
                this.score = this.score + 700;
                this.ui.setScore(this.score.toString());
                this.star3.alpha = 0.8;
                this.game.add.tween(this.star3).to({width: this.star.width * 1.25, height: this.star.height * 1.25,alpha: 1}, 300, Phaser.Easing.Linear.None, true,250, 0,true);
                this.game.add.tween(this.star3).to({alpha: 1},100,Phaser.Easing.Linear.None, true,1000);

                setTimeout(()=>{
                    this.star3.width = this.pokerChip0.width;
                    this.star3.height = this.pokerChip0.width;
                },1200);
            }
        }

        /** CHIP ANIMATION(when card is dragged)*/
        private animateChips(){
            /*
             *   function used on every card drag to animate chips on the table
             */
            for (let i = 0; i <= this.lastChipIndex; i++){
                let del: number = i * 80;
                this.game.add.tween(this.ChipArr[i]).to({
                    x: this.ChipArr[i].position.x,
                    y: this.ChipArr[i].position.y - 20
                }, 80, Phaser.Easing.Quadratic.InOut, true, del,0,true);
            }
        }

        /** GET CHIPS FROM TABLE */
        private getChip(){
            /* check which one is the last chip in the right and take him off the table
            * if there are no more chips on the table the game is over.
            * */

            this.game.add.tween(this.ChipArr[this.lastChipIndex]).to({
                x: this.ChipArr[this.lastChipIndex].position.x * 3

            }, 950, Phaser.Easing.Linear.None, true, 0);

            //destroy chip after tween
            setTimeout(()=>{
                this.ChipArr[this.lastChipIndex + 1].destroy();
            },1000);

            if (this.lastChipIndex === 0){
                this.back1.visible = false;
                this.isGameOver = true;
                setTimeout(()=>{
                    this.ui.gameOverNormalGame(this.score.toString());
                },1000);

            }
            this.lastChipIndex--;
        }

        /** LOAD SPRITES WHILE PLAYING (not used now) */
        private loadImage(name: string) {
            let assetName: string;
            let someString: string = name.substring(0, 1) + name.substring(5);
            // if (someString.length === 2) {
            //     assetName = "Assets/hiloasset/" + name.substring(0, 1) + "0" + name.substring(5) + ".png";
            // } else {
            //     assetName = "Assets/hiloasset/" + name.substring(0, 1) + name.substring(5) + ".png";
            // }
            // console.log(assetName);
            // myGame.load.image(name, assetName);
            // myGame.load.start();


        }


        /**  AFTER START CALL FUNCTION FOR CARD ROTATION */
        private cardRotation(){
            this.star.alpha = 0.5;
            this.star2.alpha = 0.5;
            this.star3.alpha = 0.5;

            this.tap.visible = true;
            this.back2.visible = true;
            this.back3.visible = true;
            this.back4.visible = true;
            this.back5.visible = true;
            this.tap.bringToTop();
            /** variant with intervals */
            this.cardsSpin = setInterval(()=>{this.rotateFunc()},10);
            //======================
            /** ---------------- */
            /** varian with time event */
            // cardsSpin = myGame.time.events.loop(0, ()=> {
            //     rotationAngle = rotationAngle + 0.5;
            //
            //         back2.position.x = origX + Math.cos(rotationAngle * Math.PI/180) * radius;
            //         back2.position.y = origY + Math.sin(rotationAngle * Math.PI/180) * radius;
            //         back2.angle = rotationAngle + 90;
            //
            //         back3.position.x = origX + Math.cos((rotationAngle + 90) * Math.PI/180) * radius;
            //         back3.position.y = origY + Math.sin((rotationAngle + 90) * Math.PI/180) * radius;
            //         back3.angle = rotationAngle + 180;
            //
            //         back4.position.x = origX + Math.cos((rotationAngle + 180) * Math.PI/180) * radius;
            //         back4.position.y = origY + Math.sin((rotationAngle + 180) * Math.PI/180) * radius;
            //         back4.angle = rotationAngle + 270;
            //
            //         back5.position.x = origX + Math.cos((rotationAngle + 270) * Math.PI/180) * radius;
            //         back5.position.y = origY + Math.sin((rotationAngle + 270) * Math.PI/180) * radius;
            //         back5.angle = rotationAngle + 360;
            // }, this);
        }
        private rotateFunc() {

            this.rotationAngle = this.rotationAngle + 0.5;

            this.back2.position.x = this.origX + Math.cos(this.rotationAngle * Math.PI/180) * this.radius;
            this.back2.position.y = this.origY + Math.sin(this.rotationAngle * Math.PI/180) * this.radius;
            this.back2.angle = this.rotationAngle + 90;

            this.back3.position.x = this.origX + Math.cos((this.rotationAngle + 90) * Math.PI/180) * this.radius;
            this.back3.position.y = this.origY + Math.sin((this.rotationAngle + 90) * Math.PI/180) * this.radius;
            this.back3.angle = this.rotationAngle + 180;

            this.back4.position.x = this.origX + Math.cos((this.rotationAngle + 180) * Math.PI/180) * this.radius;
            this.back4.position.y = this.origY + Math.sin((this.rotationAngle + 180) * Math.PI/180) * this.radius;
            this.back4.angle = this.rotationAngle + 270;

            this.back5.position.x = this.origX + Math.cos((this.rotationAngle + 270) * Math.PI/180) * this.radius;
            this.back5.position.y = this.origY + Math.sin((this.rotationAngle + 270) * Math.PI/180) * this.radius;
            this.back5.angle = this.rotationAngle + 360;

        }
        private addFirstCardSprite(rndIndex){
            this.cardArray[rndIndex] = this.game.add.sprite(this.game.world.centerX - 0.8 * this.cardWidthSize, this.game.world.centerY + this.cardWidthSize * 0.7, this.cardNamesArray[rndIndex]);
            this.cardArray[rndIndex].width = this.cardWidthSize;
            this.cardArray[rndIndex].height = this.cardHeightSize;
            this.cardArray[rndIndex].position.x = this.passedCardPosX;
            this.cardArray[rndIndex].position.y = this.passedCardPosY;
            this.cardArray[rndIndex].anchor.set(0.5);
            this.nearestCard.bringToTop();
            this.cardArray[rndIndex].angle = this.angle;
            this.cardArray[rndIndex].alpha = 1;

            this.firstCard = this.cardArray[rndIndex];
            this.cardNamesArray[rndIndex] = "none";
            this.back1.bringToTop();
        }

        private afterChoose(){
            this.tap.destroy();
            this.back.visible =true;
            this.back1.visible =true;
            this.pokerChip0.visible = true;
            this.pokerChip1.visible = true;
            this.pokerChip2.visible = true;
            this.pokerChip3.visible = true;
            this.pokerChip4.visible = true;
            this.pokerChip5.visible = true;
            this.pokerChip6.visible = true;
            this.game.add.tween(this.pokerChip0).from({
                x: this.game.width * 0.5,
                y: this.game.height * 1.5
            }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
            this.game.add.tween(this.pokerChip1).from({
                x: this.game.width * 0.5,
                y: this.game.height * 1.5
            }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
            this.game.add.tween(this.pokerChip2).from({
                x: this.game.width * 0.5,
                y: this.game.height * 1.5
            }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
            this.game.add.tween(this.pokerChip3).from({
                x: this.game.width * 0.5,
                y: this.game.height * 1.5
            }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
            this.game.add.tween(this.pokerChip4).from({
                x: this.game.width * 0.5,
                y: this.game.height * 1.5
            }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
            this.game.add.tween(this.pokerChip5).from({
                x: this.game.width * 0.5,
                y: this.game.height * 1.5
            }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
            this.game.add.tween(this.pokerChip6).from({
                x: this.game.width * 0.5,
                y: this.game.height * 1.5
            }, 200, Phaser.Easing.Quadratic.InOut, true, 0);
        }


        private getRandomFrontCard(){
            this.currentCard.position.x = this.game.world.centerX;
            this.currentCard.position.y = this.game.world.centerY;
            this.currentCard.angle = 0;
            this.currentCard.alpha = 1;
            this.currentCard.scale.x = 0;
            this.back1.bringToTop();
        }

        /** AFTER RESUME DESTROYS DECK CARDS AND MAKE NEW ONE WITH ADDED FUNCTIONS */

        private afterRes(){
            if(this.firstChoose != 0 ) {
                this.back.destroy();
                this.back1.destroy();
                this.back = this.game.add.sprite(this.deckPosX, this.deckPosY, 'cardback');
                this.back.height = this.cardHeightSize;
                this.back.width = this.cardWidthSize;
                this.back.anchor.set(0.5);

                this.back1 = this.game.add.sprite(this.deckPosX, this.deckPosY, 'cardback');
                this.back1.height = this.cardHeightSize;
                this.back1.width = this.cardWidthSize;
                this.back1.anchor.set(0.5);

                this.back1.inputEnabled = true;
                this.back1.input.enableDrag();
                this.back1.events.onDragStart.add(function () {
                    this.back1.bringToTop();
                    this.endBackPosition = 0;
                }, this);
                this.back1.events.onDragUpdate.add(function(){

                    /** DRAG CARD ONLY UP AND DOWN */
                    this.back1.position.x = this.deckPosX;
                    if(this.back1.position.y > this.deckPosY){
                        this.endBackPosition = 10;
                        this.shadowHi.visible = false;
                        this.isHigher = false;
                        this.shadowLo.visible = true;
                    }else if(this.back1.position.y < this.deckPosY){
                        this.endBackPosition = 10;
                        this.isHigher = true;
                        this.shadowHi.visible = true;
                        this.shadowLo.visible = false;
                    }
                },this);

                this.back1.events.onDragStop.add(function () {
                    this.shadowHi.visible = false;
                    this.shadowLo.visible = false;
                }, this);
                this.back1.events.onDragStop.add(this.flipCard, this);

                //reser chip positions
                for(let i= 0; i< this.ChipArr.length; i++){
                    this.ChipArr[i].position.y = this.game.height - this.game.width * 0.15
                }

            }
        }

        private getBack1ToDeck(){
            this.isFirstFlipped = true;
            this.back1.position.x = this.deckPosX;
            this.back1.position.y = this.deckPosY;
            this.back1.width = this.cardWidthSize;
            this.back1.height = this.cardHeightSize;
            this.back1.inputEnabled = true;
            this.isClicked = false;
            this.cardCounter++;
            this.currentCard.bringToTop();
            this.positionCurrCardTween = this.game.add.tween(this.currentCard).to({
                x: this.passedCardPosX,
                y: this.passedCardPosY,
                width: this.cardWidthSize,
                height: this.cardHeightSize
            }, 200, Phaser.Easing.Linear.None, true, 0);
            this.err.visible = false;
            this.correct.visible = false;
        }
    }
}