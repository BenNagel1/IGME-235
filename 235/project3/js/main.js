let ball;
let club;

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

            const grass1 = this.physics.add.sprite(windowWidth / 2, windowHeight / 2, 'grass1');
            const hole = this.physics.add.sprite(windowWidth / 2, 200, 'hole');
            
            ball = this.physics.add.sprite(windowWidth / 2, 400, 'ball');
            ball.setBounce(0.2);
            ball.setCollideWorldBounds(true);

            club = this.physics.add.sprite(ball.x, ball.y + 20, 'club');
            club.setOrigin(.5, .5);

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


            this.input.mouse.disableContextMenu();

            this.input.on('pointerdown', function (pointer)
            {
                if (pointer.leftButtonDown())
                {
                    ball.setVelocity(ball.x - pointer.x, ball.y - pointer.y);
                }
            }, this);
        }

        update() {
            const offsetX = 20;
        
            const angleToBall = Phaser.Math.Angle.Between(club.x, club.y, ball.x, ball.y);
        
            const angle = Math.atan2(game.input.mousePointer.y - ball.y, game.input.mousePointer.x - ball.x);
            const x = ball.x + offsetX * Math.cos(angle);
            const y = ball.y + offsetX * Math.sin(angle);

            club.setPosition(x, y);
            club.setRotation(angleToBall + Math.PI / 2);
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