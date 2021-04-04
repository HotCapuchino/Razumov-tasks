const petStat = {
    health: {
        level: 100,
        action: 'relax',
        options: {
            sleep: {
                hunger: 10,
                health: 10,
                thirst: 10,
                exhaustion: -20
            }, 
            watchTV: {
                hunger: 5,
                health: -2,
                thirst: 5,
                exhaustion: -5
            },
            sport: {
                hunger: 15,
                health: 20,
                thirst: 10,
                exhaustion: 10
            }
        }
    },
    thirst: {
        level: 0,
        action: 'drink',
        options: {
            cola: {
                hunger: 0,
                health: -5,
                thirst: 2
            },
            water: {
                hunger: 0,
                health: 5,
                thirst: -5
            },
            coffee: {
                hunger: -2,
                health: 2,
                thirst: -5
            }, 
            tea: {
                hunger: 0,
                health: 10,
                thirst: -10
            }
        }
    },
    hunger: {
        level: 20,
        action: 'eat', 
        options: {
            apple: {
                hunger: -5,
                health: 3, 
                thirst: 2
            },
            steak: {
                hunger: -10,
                health: 5,
                thirst: 5
            },
            flakes: {
                hunger: -5,
                health: 7,
                thirst: 5
            },
            cake: {
                hunger: -5,
                health: -2,
                thirst: 10
            }
        }
    },
    exhaustion: {
        level: 20,
        action: 'work',
        options: {
            coding: {
                hunger: 5,
                health: -5,
                thirst: 5,
                exhaustion: 10
            },
            driving: {
                hunger: 10,
                health: -10,
                thirst: 7,
                exhaustion: 10
            }
        }
    }
}

export {petStat};