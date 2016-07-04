function Game() {
    
    var reinitFlag = true;
    var objGroup = null;
    var objects = null;
    var sz = 40;
    var width = 13;
    var height = 10;
    var rotation = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    var phaserGame;
    
    phaserGame = gameSetup();
    
    this.reset = function() {
    }
    
    this.methods = function() {
        return ['forward', 'left', 'right'];
    }
    
    this.forward = function() {
        var tank = getTank();
        var rot = rotation[tank.rot];
        tank.logicX += rot[0];
        tank.logicY += rot[1];
        tank.x = mkX(tank.logicX);
        tank.y = mkY(tank.logicY);
    }
    
    this.left = function() {
        var tank = getTank();
        tank.rot = (tank.rot + 1) % rotation.length;
        tank.frame = tank.rot;
    }
    
    this.right = function() {
        var tank = getTank();
        tank.rot = (tank.rot + 3) % rotation.length;
        tank.frame = tank.rot;
    }
    
    function gameSetup() {
        return new Phaser.Game(width * sz, height * sz, Phaser.AUTO, 'gamescreen',
                { preload: gamePreload, update: gameUpdate });
    }
    
    function gamePreload() {
        phaserGame.load.image('star', 'star.png');
        phaserGame.load.spritesheet('tank', 'tank.png', 40, 40);
    }
    
    function gameUpdate() {
        if (reinitFlag) {
            setup();
            reinitFlag = false;
        }
    }
    
    function setup() {
        phaserGame.stage.backgroundColor = '#ccc';
        objGroup = phaserGame.add.group();
        objects = [];
        placeStars([{x:1, y:5}]);
        placeTank({x:1, y:1});
    }
    
    function placeStars(data) {
        for (var i = 0; i < data.length; i++) {
            var star = data[i];
            addObject(star.x, star.y, 'star');
        }
    }
    
    function placeTank(data) {
        var tank = addObject(data.x, data.y, 'tank');
        tank.initX = data.x;
        tank.initY = data.y;
        tank.rot = 0;
    }
    
    function getTank() {
        return objects['tank'][0];
    }
    
    function addObject(x, y, kind) {
        var img = objGroup.create(mkX(x), mkY(y), kind);
        scale(img, sz, sz);
        img.logicX = x;
        img.logicY = y;
        if (typeof(objects[kind]) == 'undefined') {
            objects[kind] = [];
        }
        objects[kind].push(img);
        return img;
    }

    function mkX(x) {
        return x * sz;
    }
    
    function mkY(y) {
        return (height - y - 1) * sz;
    }
    
    function scale(image, w, h) {
        image.scale.setTo(w / image.width, h / image.height);
    }
    
}
