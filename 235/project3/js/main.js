let ball;
let club;
let powerBar;

let scores = [0,0,0,0,0];
let pars = [2,0,0,0,0];
let currentHole = 0;

class MiniGolf extends Phaser.Scene
    {
        preload ()
        {
            this.load.image('ball', 'images/ball.png');
            this.load.image('grass1', 'images/grass1.png');
            this.load.image('wall', 'images/wall.png');
            this.load.image('club', 'images/club.png');
            this.load.image('hole', 'images/hole.png');
        }

        create ()
        {
            const windowWidth = game.config.width;
            const windowHeight = game.config.height;

            const currentScoreText = this.add.text(10, 10, '', { fill: '#ffffff' }).setDepth(1);
            currentScoreText.setText("Current Hole: " + scores[currentHole]);

            const currentParText = this.add.text(10, 30, '', { fill: '#ffffff' }).setDepth(1);
            currentParText.setText("Current Par: " + pars[currentHole]);

            const grass1 = this.physics.add.sprite(windowWidth / 2, windowHeight / 2, 'grass1');
            const hole = this.physics.add.sprite(windowWidth / 2, 200, 'hole');
            
            ball = this.physics.add.sprite(windowWidth / 2, 400, 'ball');
            ball.setBounce(.5);
            ball.setCollideWorldBounds(true);

            const wallLeft = this.physics.add.sprite(grass1.x - grass1.width/2, grass1.y, 'wall').setImmovable(true);
            wallLeft.setScale(.25, 4);
            this.physics.add.collider(ball, wallLeft);

            const wallRight = this.physics.add.sprite(grass1.x + grass1.width/2, grass1.y, 'wall').setImmovable(true);
            wallRight.setScale(.25, 4);
            this.physics.add.collider(ball, wallRight);

            const wallUp = this.physics.add.sprite(grass1.x, grass1.y - grass1.height/2, 'wall').setImmovable(true);
            wallUp.setScale(2.25, .25);
            this.physics.add.collider(ball, wallUp);

            const wallDown = this.physics.add.sprite(grass1.x, grass1.y + grass1.height/2, 'wall').setImmovable(true);
            wallDown.setScale(2.25, .25);
            this.physics.add.collider(ball, wallDown);

            club = this.physics.add.sprite(ball.x, ball.y, 'club');
            club.setOrigin(.5, .5);

            powerBar = this.physics.add.sprite(ball.x, ball.y, 'club');
            powerBar.setOrigin(1, .5);

            this.input.mouse.disableContextMenu();

            this.input.on('pointerdown', function (pointer)
            {
                if (pointer.leftButtonDown() && (Math.abs(ball.body.velocity.x) + Math.abs(ball.body.velocity.y) < 2))
                {
                    ball.setVelocity(ball.x - pointer.x, ball.y - pointer.y);
                    scores[currentHole]++;
                    currentScoreText.setText("Current Hole: " + scores[currentHole]);
                }
            }, this);
        }

        update() {
            let offsetX = 20;
        
            const angleToBall = Phaser.Math.Angle.Between(club.x, club.y, ball.x, ball.y);
        
            let angle = Math.atan2(game.input.mousePointer.y - ball.y, game.input.mousePointer.x - ball.x);
            let x = ball.x + offsetX * Math.cos(angle);
            let y = ball.y + offsetX * Math.sin(angle);
        
            club.setPosition(x, y);
            club.setRotation(angleToBall + Math.PI / 2);
        
            offsetX = 40;
            angle = Math.atan2(game.input.mousePointer.y - ball.y, game.input.mousePointer.x - ball.x);
            x = ball.x + offsetX * Math.cos(angle);
            y = ball.y + offsetX * Math.sin(angle);
        
            powerBar.setPosition(x, y);
            powerBar.setRotation(angleToBall);
            powerBar.setScale(Phaser.Math.Distance.Between(ball.x, ball.y, game.input.mousePointer.x, game.input.mousePointer.y) / 100, 1);
        
            const deceleration = 0.997;
            ball.setVelocity(ball.body.velocity.x * deceleration, ball.body.velocity.y * deceleration);
        
            if ((Math.abs(ball.body.velocity.x) + Math.abs(ball.body.velocity.y) < 2))
            {
                club.setAlpha(1);
            }else{
                club.setAlpha(.5);
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