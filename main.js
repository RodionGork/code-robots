$(function() {
    
    twoPanelsSetup();
    brEditor = ace.edit('editor');
    brEditor.getSession().setMode("ace/mode/javascript");
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
    
});

