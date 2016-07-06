$(function() {
    
    var level = determineLevel();
    
    window.operations = [];
    twoPanelsSetup();
    brEditor = ace.edit('editor');
    brEditor.getSession().setMode("ace/mode/python");
    brEditor.setValue(loadFile('data/code' + level + '.py'));
    brython();
    game = new Game(loadFile('data/level' + level + '.json'));
    
    $('#reset-button').click(function() {
        window.operations = [];
        game.reset();
    });
    
    $('#level-select').change(function() {
        var href = location.href.replace(/^(.*)\?.*/, '$1');
        location.href = href + '?level=' + $(this).val();
    });
    
    function loadFile(url) {
        var data = $.ajax(url, {async:false}).responseText;
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
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
    
    function doOperations() {
        if (operations.length == 0 || !game.isReady()) {
            return;
        }
        op = operations.shift();
        if (op[0] == 'prn') {
            var pre = $('#output-pre');
            pre.text(pre.text() + op[1]);
        } else {
            try {
                game.operation(op);
            } catch (e) {
                alert('Error:\n' + e.message);
                operations = [];
            }
        }
    }
    
    setInterval(doOperations, 50);
    
});

