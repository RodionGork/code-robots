import _sys
from browser import document, window, alert

#------------------------------------------
init_code = '''

'''

def _write(x):
    window.operations.append(['prn', x])

def _write_err(x):
    alert(x)

def forward():
    window.operations.append(['fwd'])

def turnLeft():
    window.operations.append(['lt'])

def turnRight():
    window.operations.append(['rt'])
#------------------------------------------

def runner(e):
    ns = {'__name__':'__main__', 'alert':alert,
        'forward':forward, 'left':turnLeft, 'right':turnRight}
    exec(init_code + window.brEditor.getValue(), ns)

document['mybutton'].bind('click',runner)

_sys.stdout.write = _write
_sys.stderr.write = _write_err
