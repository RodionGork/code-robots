from browser import document, window, alert

def runner(e):
    ns = {'__name__':'__main__', 'alert':alert}
    exec(window.brEditor.getValue(), ns)

document['mybutton'].bind('click',runner)

