import sys
import json

ops = []

def read_file(name):
    with open(name, 'r') as content_file:
        data = content_file.read()
    return data

def game_data():
    class Obj:
        def __init__(self, d):
            self.__dict__.update(d)
    def object_decoder(d):
        return Obj(d)
    return json.loads(read_file(sys.argv[3]), object_hook = object_decoder)

def done(operations):
    ops.clear()
    ops.extend(operations)

def runner():
    ns = {'__name__':'__main__', 'done':done, 'game_data':game_data}
    init_code = read_file(sys.argv[1])
    user_code = read_file(sys.argv[2])
    code = init_code.replace('#user_code#', user_code)
    exec(code, ns)
    ops.append(['end'])
    print(ops)

runner()

