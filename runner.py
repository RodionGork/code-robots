import _sys
from browser import document, window, alert

init_code = '''
from browser import window

window.operations = []

'''

def _write(x):
    window.operations.append(['prn', x])

def _write_err(x):
    alert(x)

def forward():
    window.operations.append(['fwd'])

def runner(e):
    ns = {'__name__':'__main__', 'alert':alert, 'forward':forward}
    exec(init_code + window.brEditor.getValue(), ns)

document['mybutton'].bind('click',runner)

_sys.stdout.write = _write
_sys.stderr.write = _write_err
