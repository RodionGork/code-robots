import _sys
from browser import document, window, alert
from javascript import JSConstructor

ops = []

def game_data():
    return window.gameData

def done(operations, result):
    ops.clear()
    ops.extend(operations)

def _input():
    return ''

def _write_err(x):
    alert(x)

def _time():
    Date = JSConstructor(window.Date)
    return Date().getTime()

def runner(e):
    window.game.reset()
    ns = {'__name__':'__main__', 'done':done, 'game_data':game_data, 'input':_input,
        '_time':_time}
    user_code = window.brEditor.getValue()
    code = window.initCode.replace('#user_code#', user_code)
    exec(code, ns)
    window.operations = []
    window.operations.extend(ops)

document['run-button'].bind('click',runner)

#_sys.stdout.write = _write
_sys.stderr.write = _write_err
