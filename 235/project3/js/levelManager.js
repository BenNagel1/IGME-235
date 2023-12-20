class LevelManager {
    constructor() {
        this._scores = [0, 0, 0, 0, 0];
        this._scoreTexts = [];
        this._pars = [2, 3, 4, 3, 5];
        this._currentHole = 0;
        this._walls = [];
        this._roughs = [];
        this._ices = [];
        this._totalPar = 0;
        this._totalScore = 0;
    }

    get scores() {
        return this._scores;
    }

    get pars() {
        return this._pars;
    }

    get currentHole() {
        return this._currentHole;
    }

    get walls() {
        return this._walls;
    }

    get roughs() {
        return this._roughs;
    }

    get ices() {
        return this._ices;
    }

    createWalls(scene) {
        //creates lists of the needed surfaces/walls
        this._walls.forEach(wall => wall.destroy());
        this._walls = [];
        this._roughs.forEach(rough => rough.destroy());
        this._roughs = [];
        this._ices.forEach(ice => ice.destroy());
        this._ices = [];

        const windowWidth = game.config.width;
        const windowHeight = game.config.height;

        //creates each hole
        if(this.currentHole == 0){
            const grass0_0 = this.createGrass(scene, windowWidth / 2, windowHeight / 2, 1, 1);
            grass0_0.setDepth(-2);
            this.createWall(scene, grass0_0.x - grass0_0.width / 2, grass0_0.y, 0.25, 4);
            this.createWall(scene, grass0_0.x + grass0_0.width / 2, grass0_0.y, 0.25, 4);
            this.createWall(scene, grass0_0.x, grass0_0.y - grass0_0.height / 2, 2.25, 0.25);
            this.createWall(scene, grass0_0.x, grass0_0.y + grass0_0.height / 2, 2.25, 0.25);

            ball.x = grass0_0.x;
            ball.y = 400;
            hole.x = grass0_0.x;
            hole.y = 200;
        }
        else if(this.currentHole == 1){
            const grass1_0 = this.createGrass(scene, windowWidth / 2 - 100, windowHeight / 2, 1, 1);
            const grass1_1 = this.createGrass(scene, windowWidth / 2, windowHeight / 3, 2, .5);

            this.createWall(scene, grass1_0.x - grass1_0.width / 2, grass1_0.y, 0.25, 4);
            this.createWall(scene, grass1_0.x + grass1_0.width / 2, grass1_0.y + grass1_0.height / 4, 0.25, 2);
            this.createWall(scene, grass1_0.x, grass1_0.y - grass1_0.height / 2, 2.25, 0.25);
            this.createWall(scene, grass1_0.x, grass1_0.y + grass1_0.height / 2, 2.25, 0.25);
            
            this.createWall(scene, grass1_1.x + grass1_1.width / 2, grass1_1.y - grass1_1.height / 4, 2.25, 0.25);
            this.createWall(scene, grass1_1.x + grass1_1.width / 2, grass1_1.y + grass1_1.height / 4, 2.25, 0.25);
            this.createWall(scene, grass1_1.x + grass1_1.width, grass1_1.y, 0.25, 2);

            const rough1_0 = this.createRough(scene, grass1_1.x - 25, windowHeight / 2, .25, .25);
            this._roughs.push(rough1_0);
            const rough1_1 = this.createRough(scene, grass1_1.x, windowHeight / 2 - 25, .5, .125);
            this._roughs.push(rough1_1);

            ball.x = grass1_0.x;
            ball.y = 400;
            hole.x = grass1_1.x + grass1_1.width / 2;
            hole.y = grass1_1.y;
        }
        else if(this.currentHole == 2){
            const grass2_0 = this.createGrass(scene, windowWidth / 2 - 200, windowHeight / 2 - 50, 1, 1);
            const grass2_1 = this.createGrass(scene, windowWidth / 2, windowHeight / 3 - 50, 3, .5);
            const grass2_2 = this.createGrass(scene, windowWidth / 2 + 200, windowHeight / 2 - 50, 1, 1);

            this.createWall(scene, grass2_0.x - grass2_0.width / 2, grass2_0.y, 0.25, 4);
            this.createWall(scene, grass2_0.x + grass2_0.width / 2, grass2_0.y + grass2_0.height / 4, 0.25, 2);
            this.createWall(scene, grass2_0.x, grass2_0.y + grass2_0.height / 2, 2.25, 0.25);
            
            this.createWall(scene, grass2_1.x, grass2_1.y - grass2_1.height / 4, 6.25, 0.25);
            this.createWall(scene, grass2_1.x, grass2_1.y + grass2_1.height / 4, 2.25, 0.25);
            
            this.createWall(scene, grass2_2.x - grass2_2.width / 2, grass2_2.y + grass2_2.height / 4, 0.25, 2);
            this.createWall(scene, grass2_2.x + grass2_2.width / 2, grass2_2.y, 0.25, 4);
            this.createWall(scene, grass2_2.x, grass2_2.y + grass2_2.height / 2, 2.25, 0.25);

            const rough2_0 = this.createRough(scene, grass2_1.x - grass2_1.width / 2 - 25, windowHeight / 2 - 50, .25, .25);
            this._roughs.push(rough2_0);
            const rough2_1 = this.createRough(scene, grass2_1.x - grass2_1.width / 2, windowHeight / 2 - 75, .5, .125);
            this._roughs.push(rough2_1);

            const rough2_2 = this.createRough(scene, grass2_1.x + grass2_1.width / 2 + 25, windowHeight / 2 - 50, .25, .25);
            this._roughs.push(rough2_2);
            const rough2_3 = this.createRough(scene, grass2_1.x + grass2_1.width / 2, windowHeight / 2 - 75, .5, .125);
            this._roughs.push(rough2_3);

            ball.x = grass2_0.x;
            ball.y = 350;
            hole.x = grass2_2.x;
            hole.y = grass2_2.y + grass2_2.height/4;
        }
        else if(this.currentHole == 3){
            const grass3_0 = this.createGrass(scene, windowWidth / 2 - 200, windowHeight / 2 + 100, 1, .75);
            const grass3_1 = this.createGrass(scene, windowWidth / 2, windowHeight / 2 + 50, 3, .5);
            const grass3_2 = this.createGrass(scene, windowWidth / 2 + 200, windowHeight / 2 - 50, 1, 1);

            this.createWall(scene, grass3_0.x - grass3_0.width / 2, grass3_0.y, 0.25, 3);
            this.createWall(scene, grass3_0.x + grass3_0.width / 2, grass3_0.y + grass3_0.height / 4, 0.25, 1);
            this.createWall(scene, grass3_0.x, grass3_0.y + grass3_0.height / 2 - 50, 2.25, 0.25);
            
            this.createWall(scene, grass3_1.x - 100, grass3_1.y - grass3_1.height / 4, 4.25, 0.25);
            this.createWall(scene, grass3_1.x, grass3_1.y + grass3_1.height / 4, 2.25, 0.25);
            
            this.createWall(scene, grass3_2.x - grass3_2.width / 2, grass3_2.y - grass3_2.height / 4, 0.25, 2);
            this.createWall(scene, grass3_2.x + grass3_2.width / 2, grass3_2.y, 0.25, 4);
            this.createWall(scene, grass3_2.x, grass3_2.y + grass3_2.height / 2, 2.25, 0.25);
            this.createWall(scene, grass3_2.x, grass3_2.y - grass3_2.height / 2, 2.25, 0.25);

            const ice3_0 = this.createIce(scene, grass3_1.x, grass3_1.y, 1.125, .5);
            this._ices.push(ice3_0);

            ball.x = grass3_0.x;
            ball.y = 450;
            hole.x = grass3_2.x;
            hole.y = grass3_2.y - grass3_2.height/4;
        }
        else if(this.currentHole == 4){
            const grass4_0 = this.createGrass(scene, windowWidth / 2 - 200, windowHeight / 2 + 100, 1, .75);
            const grass4_1 = this.createGrass(scene, windowWidth / 2, windowHeight / 2 + 50, 3, .5);
            const grass4_2 = this.createGrass(scene, windowWidth / 2 + 200, windowHeight / 2 - 50, 1, 1);
            const grass4_3 = this.createGrass(scene, windowWidth / 2, windowHeight / 2 - 150, 3, .5);

            this.createWall(scene, grass4_0.x - grass4_0.width / 2, grass4_0.y, 0.25, 3);
            this.createWall(scene, grass4_0.x + grass4_0.width / 2, grass4_0.y + grass4_0.height / 4, 0.25, 1);
            this.createWall(scene, grass4_0.x, grass4_0.y + grass4_0.height / 2 - 50, 2.25, 0.25);
            
            this.createWall(scene, grass4_1.x, grass4_1.y - grass4_1.height / 2 - 100, 6.25, 0.25);
            this.createWall(scene, grass4_1.x - 100, grass4_1.y - grass4_1.height / 4, 4.25, 0.25);
            this.createWall(scene, grass4_1.x, grass4_1.y + grass4_1.height / 4, 2.25, 0.25);
            
            //this.createWall(scene, grass4_2.x - grass4_2.width / 2, grass4_2.y - grass4_2.height / 4, 0.25, 2);
            this.createWall(scene, grass4_2.x + grass4_2.width / 2, grass4_2.y, 0.25, 4);
            this.createWall(scene, grass4_2.x, grass4_2.y + grass4_2.height / 2, 2.25, 0.25);
            
            this.createWall(scene, grass4_3.x - grass4_3.width * 1.5, grass4_3.y, 0.25, 2);
            this.createWall(scene, grass4_3.x, grass4_3.y + 75, 0.25, .5);
            this.createWall(scene, grass4_3.x, grass4_3.y - 75, 0.25, .5);

            const ice4_0 = this.createIce(scene, grass4_1.x, grass4_1.y, 1.125, .5);
            this._ices.push(ice4_0);
            const ice4_1 = this.createIce(scene, grass4_3.x + grass4_3.width / 1.5 + 9, grass4_3.y, 1.55, .5);
            this._ices.push(ice4_1);

            const rough4_0 = this.createRough(scene, grass4_1.x + grass4_1.width, grass4_1.y, .875, .5);
            this._roughs.push(rough4_0);

            ball.x = grass4_0.x;
            ball.y = 450;
            hole.x = grass4_3.x - grass4_3.width;
            hole.y = grass4_2.y - grass4_2.height/4;
        }
        else {
            const winText = scene.add.text(windowWidth / 2, windowHeight / 2.5, '', { fill: '#ffffff', fontSize: '64px' }).setDepth(1);
            winText.setOrigin(.5, .5);
            winText.setDepth(1);
            winText.setText("You Finished!");

            ball.x = windowWidth / 2;
            ball.y = windowHeight / 1.25;
        }
    }

    //creates a grass tile
    createGrass(scene, posX, posY, scaleX, scaleY){
        const grass = scene.physics.add.sprite(posX, posY, 'grass');
        grass.setScale(scaleX, scaleY);
        grass.setDepth(-2);
        this._walls.push(grass);
        return grass;
    }

    //creates a rough grass tile
    createRough(scene, posX, posY, scaleX, scaleY){
        const rough = scene.physics.add.sprite(posX, posY, 'grass');
        rough.setScale(scaleX, scaleY);
        rough.setTint(0x008000);
        rough.setDepth(-2);
        this._walls.push(rough);
        return rough;
    }

    //creates an ice tile
    createIce(scene, posX, posY, scaleX, scaleY){
        const ice = scene.physics.add.sprite(posX, posY, 'grass');
        ice.setScale(scaleX, scaleY);
        ice.setTint(0x0a40ff);
        ice.setDepth(-2);
        this._walls.push(ice);
        return ice;
    }

    //creates a wall tile
    createWall(scene, posX, posY, scaleX, scaleY){
        const wall = scene.physics.add.sprite(posX, posY, 'wall').setImmovable(true);
        wall.setScale(scaleX, scaleY);
        wall.setDepth(-1);
        scene.physics.add.collider(ball, wall);
        this._walls.push(wall);
        return wall;
    }

    //sets the scoreboard up
    setScores(scene){
        if(this.currentHole < 5){
            this._scoreTexts.forEach(score => score.destroy());
        }
        this._scores.forEach((score, index) => {
            let scoreText = scene.add.text(597 + 32 * index, 570, '', { fill: '#000000', fontSize: '24px' }).setDepth(1);
            scoreText.setText(score);
            this._scoreTexts.push(scoreText);
        })

        this._totalScore = 0;
        this._scores.forEach((score) => {this._totalScore += score})
        const totalScoreText = scene.add.text(597 + 32 * 5, 570, '', { fill: '#000000', fontSize: '24px' }).setDepth(1);
        totalScoreText.setText(this._totalScore);
        this._scoreTexts.push(totalScoreText);
    }

    //sets the par scoreboard up
    setPars(scene){
        this._pars.forEach((par, index) => {
            let parText = scene.add.text(597 + 32 * index, 538, '', { fill: '#000000', fontSize: '24px' }).setDepth(1);
            parText.setText(par);
        })
        
        this._pars.forEach((par) => {this._totalPar += par})
        const totalParText = scene.add.text(597 + 32 * 5, 538, '', { fill: '#000000', fontSize: '24px' }).setDepth(1);
        totalParText.setText(this._totalPar);
    }

    //moves to the next hole
    nextHole(scene) {
        this._currentHole++;
        this.createWalls(scene);
        ball.setVelocity(0, 0);
    }

    nextScore(){
        this._scores[this.currentHole]++;
    }
}
