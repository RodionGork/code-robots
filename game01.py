operations = []
data = []

def _write(x):
    operations.append(['prn', x])

def _write_err(x):
    operations.append(['err'], x)

def forward():
    operations.append(['fwd'])

def left():
    operations.append(['lt'])

def right():
    operations.append(['rt'])

def pick():
    operations.append(['pck'])

def init_game_data():
    global data
    data = game_data()
    print(data.width)

init_game_data()

#user_code#

done(operations)

