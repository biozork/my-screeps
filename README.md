# sQuery

sQuery is a library for Screeps.com inspired by jQuery


## sQuery(object) or $(object)

Basic usage:
```
$ = require('sQuery');

$(Game.creeps.Daniel); //Creep type object
$('1ba4c3439ee69823dee2dee8'); //Creep type object ID

//object type is resolved internally, however some functions are limited to object type
```

## $(object).type()

Returns the object type. If not recognized, it throws an error.

```
var creep = $.randomCreep();
console.log($(creep.type()) // Creep
console.log($(Game.spawns.Spawn1).type()) // Spawn
console.log($('1ba4c3439ee69823dee2dee8').type()) // Creep

```

## $(object).memory(memObj)

Only for creep type objects.
Returns the creep memory type. 
Possible to add a parameter via the memObj. 

```
var creep = $.randomCreep();
$(creep).memory({role:'harvester'}); //returns creep memory object
```
This will not overwrite everything in memory object - but will add only "role" or overwrite "role" if it allready exists

## $(object).age()

Only for creep type objects

## $(object).ttl()

Only for creep type objects

## $(object).queueSpeak(array)

Only for creep type objects
Add queue for .speak() processing. Can't append to exisiting queue, must be empty.
Array item will null value is accepted, and will just create a small pause while creep is speaking

## $(object).speak(done)

Only for creep type objects
Processes the speak queue, 1 arr item pr. tick. Done callback when queue  is complete

## $(object).cancel()

Only for construction site objects
Cancels (uses internally the original .remove()) the targeted construction site

## $(objPosition).emptyAdjacent()

Only for position type objects OR object containing these keys {x,y,roomName}
Returns an array of game positions of non-wall, non-constructions / structures and all non creep occupated spaces around the targeted position object
Returns array of 0 (empty) to 8 (max) positions, ready for other game manipulation

## $.interval(number)

Returns true if Game.time matches the interval. Example $.interval(10) will return true every 10 tick, and false the rest
That makes it easy to isolate code in blocks to certain intervals, so all your code dont have to run at each tick

## $.find(STRING,room)

Shorthand for Game.creeps[creepObj].room.find(STRING). Uses randomCreep internally and
picks from all rooms, unless you specify a specific room. (optional).
Returns same object as normal .find() would

## $.randomCreep(room)

Returns one of your creeps in random, and limited to room if specified (optional). 
Example you want to make a .lookAt(), so you can just as well pick any creep for this.
$.randomCreep.room.lookAt(x,y);

## $.oldestCreep(room)

Returns the oldest creep. Optional room input to limit selection to a single room.

## $.youngestCreep(room)

Returns the youngest creep. Optional room input to limit selection to a single room.

## $.forEach(object, callback)

An easy way to iterate keys in object. Callback gets key and value returned for each key in object.

## Author

* **Lars Emil Christensen**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details




