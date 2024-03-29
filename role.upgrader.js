module.exports = {
    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.memory.upgrading && creep.carry.energy == 0){
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity){
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }
        
        if(creep.memory.upgrading){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0]);
            }
        }
    }
};

/*
var roleBuilder = {

    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleBuilder;

*/