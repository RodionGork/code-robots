$(function() {
    
    window.operations = [];
    twoPanelsSetup();
    brEditor = ace.edit('editor');
    brEditor.getSession().setMode("ace/mode/javascript");
    brEditor.setValue("print('start')\nforward()\nright()\n"
            + "for i in range(3):\n    forward()\nleft()\nforward()\nleft()\n"
            + "forward()\nforward()\nprint('done')\n");
    brython();
    game = new Game();
    
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

