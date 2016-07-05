function Game() {
    
    var self = this;
    var reinitFlag = true;
    var objGroup = null;
    var objects = null;
    var sz = 40;
    var width = 13;
    var height = 10;
    var stepTime = 500;
    var rotation = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    var phaserGame;
    var busy = null;
    
    phaserGame = gameSetup();
    
    this.reset = function() {
        destroy();
        reinitFlag = true;
    }
    
    this.isReady = function() {
        return busy === null;
    }
    
    this.operation = function(op) {
        switch (op[0]) {
            case 'fwd': self.forward(); break;
            case 'lt': self.left(); break;
            case 'rt': self.right(); break;
        }
    }
    
    this.forward = function() {
        var tank = getTank();
        var rot = rotation[tank.rot];
        tank.move = {x0:tank.x, y0:tank.y, t0:phaserGame.time.now};
        tank.logicX += rot[0];
        tank.logicY += rot[1];
        tank.move.t1 = tank.move.t0 + stepTime;
        tank.move.x1 = mkX(tank.logicX);
        tank.move.y1 = mkY(tank.logicY);
        busy = 'move';
    }
    
    this.left = function() {
        turn(1);
    }
    
    this.right = function() {
        turn(-1);
    }
    
    function turn(phi) {
        var tank = getTank();
        tank.move = {d0: tank.rot * Math.PI / 2, t0: phaserGame.time.now};
        tank.rot = (tank.rot + rotation.length + phi) % rotation.length;
        tank.move.d1 = tank.move.d0 + phi * Math.PI / 2;
        tank.move.t1 = tank.move.t0 + stepTime;
        busy = 'turn';
    }
    
    function gameSetup() {
        return new Phaser.Game(width * sz, height * sz, Phaser.AUTO, 'gamescreen',
                { preload: gamePreload, update: gameUpdate });
    }
    
    function gamePreload() {
        phaserGame.load.image('star', 'star.png');
        phaserGame.load.spritesheet('tank', 'tank.png', 40, 40);
    }
    
    function setup() {
        phaserGame.stage.backgroundColor = '#ccc';
        objGroup = phaserGame.add.group();
        objects = [];
        placeStars([{x:1, y:5}]);
        placeTank({x:1, y:1});
    }
    
    function destroy() {
        for (var key in objects) {
            var obj = objects[key];
            if (obj instanceof Array) {
                for (var i in obj) {
                    obj[i].destroy();
                }
            } else {
                obj.destroy();
            }
        }
        objects = [];
        objGroup.destroy();
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
        img.anchor.setTo(0.5, 0.5);
        if (typeof(objects[kind]) == 'undefined') {
            objects[kind] = [];
        }
        objects[kind].push(img);
        return img;
    }

    function mkX(x) {
        return x * sz + sz / 2;
    }
    
    function mkY(y) {
        return (height - y - 1) * sz + sz / 2;
    }
    
    function scale(image, w, h) {
        image.scale.setTo(w / image.width, h / image.height);
    }
    
    function gameUpdate() {
        if (reinitFlag) {
            setup();
            reinitFlag = false;
        }
        if (busy == 'move') {
            processMove();
        } else if (busy == 'turn') {
            processTurn();
        }
    }
    
    function processMove() {
        var tank = getTank();
        var move = tank.move;
        var alpha = (phaserGame.time.now - move.t0) / (move.t1 - move.t0);
        if (alpha < 1) {
            tank.x = Math.round(alpha * (move.x1 - move.x0) + move.x0);
            tank.y = Math.round(alpha * (move.y1 - move.y0) + move.y0);
        } else {
            tank.x = move.x1;
            tank.y = move.y1;
            busy = null;
        }
    }
    
    function processTurn() {
        var tank = getTank();
        var move = tank.move;
        var alpha = (phaserGame.time.now - move.t0) / (move.t1 - move.t0);
        if (alpha < 1) {
            tank.frame = 0;
            tank.rotation = -(alpha * (move.d1 - move.d0) + move.d0);
        } else {
            tank.frame = tank.rot;
            tank.rotation = 0;
            busy = null;
        }
    }
    
}
