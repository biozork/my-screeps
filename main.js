/*

Inspiration: 
https://github.com/Pantek59/Screeps-Noob-Code
https://github.com/Akuukis/screeps
https://www.youtube.com/playlist?list=PL0EZQ169YGlor5rzeJEYYPE3tGYT2zGT2
or just search for screeps on github

*/

// Data
var roles = require('data.roles');

// Factories
var creepFactory = require('creepFactory');

// Utils
var utils = require('utils');

var buildRoads = require('build.roads');

module.exports.loop = function () {

    //First load initialize;
    if (Memory.initialized == undefined) {
        Memory.initialized = true;
        Memory.spawns = [Object.keys(Game.spawns)[0]];
        Memory.creepCount = 0;
        //Construct roads from spawn to all sources in room
        buildRoads.initiate();
    }

    //Memory cleaining if dead creeps
    if (utils.intervals.every10 && Memory.initialized) {
        Memory.creepCount = 0;
        for (var i in Memory.creeps) {
            if (!Game.creeps[i]) {
                delete Memory.creeps[i];
            } else {
                Memory.creepCount++;
            }
        }
    }

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