module.exports = {
    miniHarvester: {
        body: [WORK, CARRY, MOVE],
        baseRole: "worker",
        size: 200,
        sizeLimit: 2
    },
    upgrader: {
        body: [WORK, CARRY, MOVE, MOVE],
        baseRole: "worker",
        size: 250,
        sizeLimit: 3
    },
    builder: {
        body: [WORK, CARRY, MOVE],
        baseRole: "worker",
        size: 200,
        sizeLimit: 2
    },
    repairer: {
        body: [WORK, CARRY, MOVE],
        baseRole: "worker",
        size: 200,
        sizeLimit: 2
    },
    harvester: {
        body: [WORK, WORK, CARRY, MOVE, MOVE],
        baseRole: "worker",
        size: 350,
        sizeLimit: 2
    },
    wallRepairer: {
        body: [WORK, CARRY, CARRY, MOVE],
        baseRole: "worker",
        size: 250,
        sizeLimit: 2
    },
    claimer: {
        body: [CLAIM, CLAIM, MOVE, MOVE],
        baseRole: "claimer",
        size: 1300,
        sizeLimit: 1
    },
    guardian: {
        body: [ATTACK, ATTACK, MOVE, MOVE],
        baseRole: "military",
        size: 260,
        sizeLimit: 1
    },
    scout: {
        body: [ATTACK, MOVE],
        baseRole: "military",
        size: 130,
        sizeLimit: 1
    },
    healer: {
        body: [MOVE, HEAL],
        baseRole: "doctor",
        size: 300,
        sizeLimit: 1
    }
};