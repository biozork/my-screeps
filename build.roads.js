//Game.spawns["Spawn1"].pos.findPathTo(Game.spawns["Spawn1"].room.find(FIND_SOURCES)[0]);//
module.exports = {
    initiate: function(){
        var spawn = Game.spawns["Spawn1"];
        
        if(Memory.paths == undefined){
            var sources = spawn.room.find(FIND_SOURCES); //array
            var controller = spawn.room.controller;
            var paths = [];
            
            for(let i = 0; i < sources.length; i++){
                var path = spawn.pos.findPathTo(sources[i]);
                paths.push(path);
            }
            Memory.paths = paths;
            //console.log(JSON.stringify(paths));
        }
        
        if(Memory.paths.length > 0){
            
            for(var i = 0; i < Memory.paths.length; i++){
                //if(!Memory.paths[i] == undefined){
                    for(let a = 0; a < Memory.paths[i].length; a++){
                        var x = Memory.paths[i][a].x;
                        var y = Memory.paths[i][a].y;
                        spawn.room.createConstructionSite(x,y,STRUCTURE_ROAD);
                    }
                //}
                
            }
            //delete Memory.paths;
        }
        
        
    }
}