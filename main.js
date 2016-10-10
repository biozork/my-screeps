/*

Inspiration: 
https://github.com/Pantek59/Screeps-Noob-Code
https://github.com/Akuukis/screeps
https://www.youtube.com/playlist?list=PL0EZQ169YGlor5rzeJEYYPE3tGYT2zGT2
or just search for screeps on github

*/

//SQuery
var $ = require('sQuery');

// Data
var roles = require('data.roles');

// Factories
var creepFactory = require('creepFactory');

var buildRoads = require('build.roads');

module.exports.loop = function () {

    try {

        //sQuery or Screep Query if you like :)
        if ($.interval(20)) {
            //random creep
            var creep = $.randomCreep();
            $(creep).queueSpeak(['Hello!',null, null, 'my name is', creep.name, 'and I am', $(creep).age(), 'ticks old.', null, null, 'I got ' + $(creep).ttl(), 'ticks left', 'to live...']);

            //oldest creep
            //var oldestCreep = $.oldestCreep();
            //console.log('Oldest creep: ' + oldestCreep.name + ' with ' + $(oldestCreep).ttl() + ' ticks to live...');

            //yongest creep
            //var youngestCreep = $.youngestCreep();
            //console.log('Youngest creep: ' + youngestCreep.name + ' with ' + $(youngestCreep).ttl() + ' ticks to live...');
        }

        if ($.interval(10)) {

            $.forEach($.find(FIND_MY_CONSTRUCTION_SITES), function (key, value) {
                $(value.id).cancel();
            });

            var harvestersNeeded = 0;
            $.forEach($.find(FIND_FLAGS), function (key, value) {
                harvestersNeeded += $(value.pos).emptyAdjacent().length;
            })
            console.log(harvestersNeeded);


        }

        //dying creep
        var oldest = $.oldestCreep();
        if ($(oldest).ttl() < 4) {
            $(oldest).queueSpeak(['My time', 'is up', 'bye bye']);
        }

        $.forEach(Game.creeps, function (i, creep) {
            $(creep).speak();
        });


    } catch (e) {
        console.log(e);
    }

    //First load initialize;
    if (Memory.initialized == undefined) {
        Memory.initialized = true;
        Memory.spawns = [Object.keys(Game.spawns)[0]];
        Memory.creepCount = 0;
        //Construct roads from spawn to all sources in room
        buildRoads.initiate();
    }

    //Memory cleaining if dead creeps
    if ($.interval(10) && Memory.initialized) {
        Memory.creepCount = 0;
        for (var i in Memory.creeps) {
            if (!Game.creeps[i]) {
                delete Memory.creeps[i];
            } else {
                Memory.creepCount++;
            }
        }
    }

    //sGame.creeps

    //Start creep factory
    creepFactory();
    /*
            if (Memory.creepCount < workers.length && Game.spawns['Spawn1'].canCreateCreep(workerBody) == OK) {
    
                workers[Memory.creepCount].toString());
                
                Game.spawns['Spawn1'].createCreep(workerBody, undefined, {
                    role: workers[Memory.creepCount].toString()
                });
                Memory.creepCount++;
            }

            for (var name in Game.creeps) {
                var creep = Game.creeps[name];
                if (creep.memory.role == 'harvester') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role == 'builder') {
                    roleBuilder.run(creep);
                }
            }
                */



}