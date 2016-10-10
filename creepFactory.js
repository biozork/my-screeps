var $ = require('sQuery');
var roles = require('data.roles');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports = function () {



    var rolename = undefined;
    var energy = Game.spawns[Memory.spawns[0]].energy;

    for (var i in roles) {

        var role = i;
        var roleSizes = _.filter(Game.creeps, function (creep) {
            return creep.memory.role === i;
        });

        if (roles[i].size <= energy && roleSizes.length <= roles[i].sizeLimit) {
            rolename = i;
            break;

        }
    }

    
    if (rolename != undefined) {
        var name = Game
            .spawns[Memory.spawns[0]]
            .createCreep(roles[rolename].body, undefined, {
                working: true,
                baseRole: roles[rolename].baseRole,
                role: rolename
            });
        if (name != ERR_NOT_ENOUGH_ENERGY) {
            Memory.creepCount++;
        } else {
            //console.log('Not enough resources');
        }
    }
    
    for (var key in Game.creeps) {
        if(Game.creeps[key].memory.role == 'miniHarvester' || Game.creeps[key].memory.role == 'harvester'){
            roleHarvester.run(Game.creeps[key]);
        }
        if(Game.creeps[key].memory.role == 'upgrader'){
            roleUpgrader.run(Game.creeps[key]);
        }
        if(Game.creeps[key].memory.role == 'builder'){
            roleUpgrader.run(Game.creeps[key]);
        }
        
    }
}