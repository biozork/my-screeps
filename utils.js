/* ========================================================================== */
/* ==== Low-level utility functions ========================================= */
/* ========================================================================== */

// For each, execute callback with key and value
/** Param {object, callback} Returns key, value params in callback **/
var forEach = function (object, callback) {
    for (var key in object) {
        callback(key, object[key]);
    }
}

var intervals = {
    "none": false,
    "every10": (Game.time % 10) + 1 == 10,
    "every20": (Game.time % 20) + 1 == 20,
    "every30": (Game.time % 30) + 1 == 30,
    "every40": (Game.time % 40) + 1 == 40,
    "every50": (Game.time % 50) + 1 == 50,
    "every100": (Game.time % 100) + 1 == 100
}

module.exports = {
    forEach: forEach,
    intervals: intervals
}