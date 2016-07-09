#tank also can scan ground below
#in order to see if there is a star
#we use "look_below()" command for this

#this code moves tank as long as it can
#and picks stars when it finds them
#using "if" construction, similar
#to "while", but executed at most once

#note that content of both "while" and "if"
#is indented with 4 spaces

right()

while look_ahead() != 'out':
    if look_below() == 'star':
        pick()
    forward()

#run this code, then add more to collect
#the stars from the upper passage

