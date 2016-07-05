$(function() {
    
    window.operations = [];
    twoPanelsSetup();
    brEditor = ace.edit('editor');
    brEditor.getSession().setMode("ace/mode/python");
    brEditor.setValue(loadFile('data/code001.json'));
    brython();
    game = new Game(loadFile('data/level001.json'));
    
    $('#reset-button').click(function() {
        window.operations = [];
        game.reset();
    });
    
    function loadFile(url) {
        var data = $.ajax(url, {async:false}).responseText;
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }

    function twoPanelsSetup() {
        var codePane = $('#code-pane');
        var gamePane = $('#game-pane');
        var mainPane = $('#main-pane');
        codePane.resizable();
        codePane.resize(function() {
            gamePane.width(mainPane.width() - codePane.width() - 5);
        });
        codePane.resize();
    }
    
    function doOperations() {
        if (operations.length == 0 || !game.isReady()) {
            return;
        }
        op = operations.shift();
        if (op[0] == 'prn') {
            var pre = $('#output-pre');
            pre.text(pre.text() + op[1]);
        } else {
            game.operation(op);
        }
    }
    
    setInterval(doOperations, 50);
    
});

