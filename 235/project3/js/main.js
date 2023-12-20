let ball;
let club;
let powerBar;
let hole;

let levelManager;

class MiniGolf extends Phaser.Scene
    {
        preload ()
        {
            this.load.image('ball', 'images/ball.png');
            this.load.image('grass', 'images/grass1.png');
            this.load.image('wall', 'images/wall.png');
            this.load.image('club', 'images/club.png');
            this.load.image('power1', 'images/power1.png');
            this.load.image('power2', 'images/power2.png');
            this.load.image('power3', 'images/power3.png');
            this.load.image('hole', 'images/hole.png');
            this.load.image('scoreboard', 'images/scores.png');
            this.load.audio('hit', 'images/ballhit.mp3');
            this.load.audio('background', 'images/backgroundmusic.mp3');
        }

        create ()
        {
            //this.text1 = this.add.text(10, 10, '', { fill: '#00ff00' });
            //this.text2 = this.add.text(500, 10, '', { fill: '#00ff00' });

            //background music
            const music = this.sound.add('background');
            music.play();

            //levelManager object
            levelManager = new LevelManager();

            //window width and height for calculations
            const windowWidth = game.config.width;
            const windowHeight = game.config.height;

            //creates base hole and ball
            hole = this.physics.add.sprite(windowWidth / 2, 200, 'hole');
            
            ball = this.physics.add.sprite(windowWidth / 2, 400, 'ball');
            ball.setBounce(.5);
            ball.setCollideWorldBounds(true);

            //creates level 1 walls
            levelManager.createWalls(this);

            //sets scoreboard
            const scoreboard = this.physics.add.sprite(660, 548, 'scoreboard');
            scoreboard.setDepth(-5);

            levelManager.setPars(this);
            levelManager.setScores(this);

            //club and powerbar creation
            club = this.physics.add.sprite(ball.x, ball.y, 'club');
            club.setOrigin(.5, .5);

            powerBar = this.physics.add.sprite(ball.x, ball.y, 'power');
            powerBar.setOrigin(1, .5);

            const hit = this.sound.add('hit');

            //checks for click and shoots the ball
            this.input.on('pointerdown', function (pointer)
            {
                if (pointer.leftButtonDown() && (Math.abs(ball.body.velocity.x) + Math.abs(ball.body.velocity.y) < 2))
                {
                    hit.play();
                    ball.setVelocity(ball.x - pointer.x, ball.y - pointer.y);
                    levelManager.nextScore();
                    levelManager.setScores(this);
                }
            }, this);
        }

        update() {
            /*const pointer = this.input.activePointer;

            this.text1.setText([
                `x: ${pointer.worldX}`,
                `y: ${pointer.worldY}`,
                `isDown: ${pointer.isDown}`
            ]);*/

            //calculates the angle of the club and trajectory of the ball
            let offsetX = 20;
        
            const angleToBall = Phaser.Math.Angle.Between(club.x, club.y, ball.x, ball.y);
        
            let angle = Math.atan2(game.input.mousePointer.y - ball.y, game.input.mousePointer.x - ball.x);
            let x = ball.x + offsetX * Math.cos(angle);
            let y = ball.y + offsetX * Math.sin(angle);
        
            club.setPosition(x, y);
            club.setRotation(angleToBall + Math.PI / 2);
        
            offsetX = 30;
            angle = Math.atan2(game.input.mousePointer.y - ball.y, game.input.mousePointer.x - ball.x);
            x = ball.x + offsetX * Math.cos(angle);
            y = ball.y + offsetX * Math.sin(angle);
        
            powerBar.setPosition(x, y);
            powerBar.setRotation(angleToBall);
            powerBar.setScale(Phaser.Math.Distance.Between(ball.x, ball.y, game.input.mousePointer.x, game.input.mousePointer.y) / 100, 1);
            
            //sets the powerbar color based on power
            if(powerBar.scaleX > 4) {
                powerBar.setTexture('power3');
            }
            else if(powerBar.scaleX > 2) {
                powerBar.setTexture('power2');
            }
            else {
                powerBar.setTexture('power1');
            }

            //checks for rough ground
            let inRough = false;
            levelManager._roughs.forEach((rough) => {
                if (
                    Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), rough.getBounds())
                ) {
                    inRough = true;
                }
            });

            //checks for ice
            let inIce = false;
            levelManager._ices.forEach((ice) => {
                if (
                    Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), ice.getBounds())
                ) {
                    inIce = true;
                }
            });
            
            //changes deceleration based on surface
            if(inRough == true){
                const roughDeceleration = 0.99;
                ball.setVelocity(ball.body.velocity.x * roughDeceleration, ball.body.velocity.y * roughDeceleration);
            }
            else if(inIce == true){
                const roughDeceleration = 1.000001;
                ball.setVelocity(ball.body.velocity.x * roughDeceleration, ball.body.velocity.y * roughDeceleration);
            }
            else{
                const deceleration = 0.997;
                ball.setVelocity(ball.body.velocity.x * deceleration, ball.body.velocity.y * deceleration);
            }
        
            //shows if you can hit again or not
            if ((Math.abs(ball.body.velocity.x) + Math.abs(ball.body.velocity.y) < 2))
            {
                club.setAlpha(1);
            }else{
                club.setAlpha(.5);
            }

            //next hole
            if(Phaser.Geom.Intersects.RectangleToRectangle(ball.getBounds(), hole.getBounds())){
                levelManager.nextHole(this);
            }
        }
        
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: MiniGolf,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        }
    };

    const game = new Phaser.Game(config);