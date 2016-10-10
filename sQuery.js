/* sQuery (screeps query) is a jQuery inspired library for quick selections, and manipulations */
var sQuery = function (query) {

    // Setup sQuery memorey helper, if not allready set.
    if (!('$' in Memory)) {
        Memory.$ = {
            "gameStart": Game.time
        }
    }

    if (typeof query === 'string' && query.length === 24) {
        var temp = Game.getObjectById(query);
        if(temp === null){
            console.log('sQuery error: Object with id: '+ query + ' does not exist');
            return;
        } else {
            query = temp;
        }
    }

    var type = function () {
        var types = {
            Source,
            Creep,
            Spawn,
            StructureKeeperLair,
            StructureController,
            StructureRoad,
            Structure,
            ConstructionSite
        }

        for (type in types) {
            if (query instanceof types[type]) {
                return type.toString();
                break;
            }
        }
    }

    // Creep related methods
    if (query instanceof Creep) {

        var memory = function (object) {


            if (object !== undefined && typeof object === "object") {
                // do non-destructive updates to the object
                // only update existing keys or add them if they do not exist
                for (var key in object) {
                    query.memory[key] = object[key];
                }
            }

            // loop args and execute first function found, then break
            for (var arg in arguments) {
                if (typeof arguments[arg] === "function") {
                    arguments[arg](query.memory);
                    break;
                }
            }

            // this is not chainable unfortunatly..
            return query.memory

        }

        var age = function () {
            // not chainable
            return 1500 - query.ticksToLive;
        }

        var ttl = function () {
            // not chainable
            return query.ticksToLive;
        }

        // Queue say / speak array to creep memory. Only one array can exist at one time. And text cannot be appended to the array atm. (can be done manually though, since memory object is public);
        var queueSpeak = function (array) {

            if (array !== undefined && array.length > 0 && this.memory().speak.length === 0) {

                // Add to memory with our own method == non descructive adding.
                this.memory({
                    'speak': array
                });
            }

            // chainable
            return this;

        }

        // Make the creep speak.
        var speak = function (done) {

            if ('speak' in query.memory && this.memory().speak.length > 0) {
                // If null in array, dont say anything new this tick
                if(query.memory.speak[0] !== null){
                    query.say(query.memory.speak[0]);
                }
                query.memory.speak.shift();
            } else {
                query.memory.speak = [];
            }
            if (typeof done === 'function') {
                done()
            };
            return this;
        }

    }

    // Spawn related methods
    else if (query instanceof Spawn) {}

    // Source related methods
    else if (query instanceof Source) {}

    // Structure Keeper Lair related methods (is there any?)
    else if (query instanceof StructureKeeperLair) {}

    // Structure related methods (is there any?)
    else if (query instanceof StructureController) {}

    // Structure related methods (is there any?)
    else if (query instanceof StructureRoad) {}

    // Structure related methods (demolish ? )
    else if (query instanceof Structure) {
        var demolish = function () {
            // do I own this structure? then demolish it
        }
    }

    // Construction site related methods
    else if (query instanceof ConstructionSite) {
        var cancel = function () {
            // do I own this structure? then cancel construction
            if(query.my){
                query.remove(); 
            } else {
                console.log('Error: Object with id: ' + query.id + ' is not yours to cancel')
            }
        }
    }

    // Position related methods
    else if (query instanceof RoomPosition || (('x' in query) && ('y' in query) && ('roomName' in query))) {

        //returns array of empty adjecent positions, for construction or otherwise
        var emptyAdjacent = function (ignoreCreep = true) {
            var top = query.y - 1;
            var left = query.x - 1;
            var bottom = query.y + 1;
            var right = query.x + 1;
            var coords = [];
            var area = sQuery.randomCreep(query.roomName).room.lookAtArea(top, left, bottom, right);

            for (var y in area) {
                for (var x in area[y]) {
                    for (var key in area[y][x][0]) {
                        if (key === 'terrain' && (area[y][x][0].terrain === 'plain' || area[y][x][0].terrain === 'swamp')) {

                            //dont include original coordinate
                            var Y = parseInt(y),
                                X = parseInt(x);
                            if (query.x != X || query.y != Y) {
                                coords.push(Game.rooms[query.roomName].getPositionAt(X, Y));
                            }
                        }
                    }
                }
            }

            return coords;
        }
    } else {
        throw 'Object type was not recognized by the sQuery library'
    }




    return {
        this: this,
        type: type,
        memory: memory,
        age: age,
        ttl: ttl,
        queueSpeak: queueSpeak,
        speak: speak,
        emptyAdjacent: emptyAdjacent,
        cancel: cancel
    };
}

//sQuery utils

//interval Params{number} Returns a boolean if ticks interval is true based on time start of game (not game time)
sQuery.interval = function (ticks) {
    if (typeof ticks === "number") {
        return Game.time % ticks === 0;
    }
}

sQuery.find = function(STRING,room){
    if(STRING !== undefined){
        return sQuery.randomCreep(room).room.find(STRING);
    }
}

//returns a random creep
sQuery.randomCreep = function (room) {
    var creeps = Game.creeps;
    if (room !== undefined) {
        Game.rooms[room].find(FIND_MY_CREEPS);
    }
    var keys = Object.keys(creeps)
    return creeps[keys[keys.length * Math.random() << 0]];
}

//returns oldest creep
sQuery.oldestCreep = function (room) {
    var creeps = Game.creeps;
    if (room !== undefined) {
        Game.rooms[room].find(FIND_MY_CREEPS);
    }
    var min = _.min(Object.keys(creeps), function (o) {
        return creeps[o].ticksToLive;
    });
    return creeps[min];
}

//returns youngest creep
sQuery.youngestCreep = function (room) {
    var creeps = Game.creeps;
    if (room !== undefined) {
        Game.rooms[room].find(FIND_MY_CREEPS);
    }
    var max = _.max(Object.keys(creeps), function (o) {
        return creeps[o].ticksToLive;
    });
    return creeps[max];
}

// used to loop through keys in object
sQuery.forEach = function (object, callback) {
    for (var key in object) {
        callback(key, object[key]);
    }
}

module.exports = sQuery;