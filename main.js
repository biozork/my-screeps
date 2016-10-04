var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var buildRoads = require('build.roads');

module.exports.loop = function () {

    var intervals = {
        "0s": false,
        "10s": (Game.time % 10)+1 == 10,
        "20s": (Game.time % 20)+1 == 20,
        "30s": (Game.time % 30)+1 == 30,
        "40s": (Game.time % 40)+1 == 40,
        "50s": (Game.time % 50)+1 == 50,
        "100s": (Game.time % 100)+1 == 100,
    }

    var workers = [
        'builder',
        'builder',
        'upgrader',
        'upgrader',
        'builder'
    ];
    var workerBody = [WORK, CARRY, MOVE, MOVE];
    if (Memory.creepCount == undefined) {
        Memory.creepCount = 0;
    } else if(intervals["10s"]){
        Memory.creepCount = 0;
        for (var i in Memory.creeps) {
            if (!Game.creeps[i]) {
                delete Memory.creeps[i];
            } else {
                Memory.creepCount++;
            }
        }
    }
    
    if (Memory.creepCount < workers.length && Game.spawns['Spawn1'].canCreateCreep(workerBody) == OK) {
        console.log('creep spawning with role: ' + workers[Memory.creepCount].toString());
        
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
    
    if(intervals["10s"]){
        console.log('tick');
        buildRoads.initiate();
    }
}