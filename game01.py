class Tank:
    def __init__(self, x, y):
        self.x = x
        self.y = y

rot = [[0, 1], [-1, 0], [0, -1], [1, 0]]
operations = []
data = []
field = []
stars = 0
tank = None
az = 0
result = 0

def failure(msg):
    global result
    add_op(['end', -1, msg])
    result = -1

def add_op(o):
    if result == 0:
        operations.append(o)

def _write(x):
    add_op(['prn', x])

def _write_err(x):
    add_op(['err'], x)

def forward():
    dx, dy = rot[az]
    tank.x += dx
    tank.y += dy
    if tank.x < 0 or tank.x >= data.width or tank.y < 0 or tank.y >= data.height:
        failure('Tank run out of the battlefield!')
    elif field[tank.y][tank.x] == 'wall':
        failure('Tank collided with the wall!')
    else:
        add_op(['fwd'])

def left():
    global az
    az = (az + 1) % len(rot)
    add_op(['lt'])

def right():
    global az
    az = (az + 3) % len(rot)
    add_op(['rt'])

def pick():
    global stars
    if result != 0:
        return
    if field[tank.y][tank.x] != 'star':
        failure('There is no star to pick up!')
    else:
        add_op(['pck'])
        stars += 1

def place_stars(field, stars):
    for s in stars:
        field[s.y][s.x] = 'star'

def place_walls(field, walls):
    for w in walls:
        for i in range(w.len):
            field[w.y][w.x + i] = 'wall'

def init_game_data():
    global data, field, tank
    data = game_data()
    for i in range(data.height):
        field.append([''] * data.width)
    place_stars(field, data.stars)
    place_walls(field, data.walls)
    tank = Tank(data.tank.x, data.tank.y)

init_game_data()

#user_code#

if result == 0:
    if stars < len(data.stars):
        failure('Not all stars were picked up!')
    else:
        add_op(['end', 1])
        result = 1

done(operations, result)

