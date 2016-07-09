#our tank is not blind
#it have a radar so it can "see"
#where it is going

#we can use the info from radar
#to make tank run until it reaches wall

#the code below contains "while" loop
#note colon at the end
#and that command(s) inside loop are indented
#with 4 spaces

#we read radar by calling function "look_ahead()"
#it returns either 'wall' or 'star'
#or '' (empty string) if nothing is in front

while look_ahead() != 'wall':
    forward()

#add few more commands before "pick()"
#to reach the star

pick()
