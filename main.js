$(function() {
    
    var level = determineLevel();
    
    window.operations = [];
    twoPanelsSetup();
    brEditor = ace.edit('editor');
    brEditor.getSession().setMode("ace/mode/python");
    window.initCode = loadFile('game01.py');
    window.gameData = JSON.parse(loadFile('data/level' + level + '.json'));
    brEditor.setValue(loadFile('data/code' + level + '.py'));
    brython();
    game = new Game(window.gameData);
    
    $('#reset-button').click(function() {
        game.reset();
    });
    
    $('#level-select').change(function() {
        var href = location.href.replace(/^(.*)\?.*/, '$1');
        location.href = href + '?level=' + $(this).val();
    });
    
    function loadFile(url) {
        return $.ajax(url, {async:false}).responseText;
    }
    
    function determineLevel() {
        var m = location.href.match(/level\=(\d+)/);
        if (m == null || m.length < 1) {
            return '001';
        }
        var v = parseInt(m[1]);
        $('#level-select').val(v);
        var s = '00' + parseInt(m[1]);
        return s.substring(s.length - 3);
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
    
});

