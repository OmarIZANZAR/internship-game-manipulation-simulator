const colors = require('colors')
const mongoose = require('mongoose')
const { Sport } = require('../models/Sport.js')
const { League } = require('../models/League.js')
const { Badge } = require('../models/Badge.js')
const { Player } = require('../models/Player.js')

let sports = ['Général', 'Social', 'Foot', 'Tennis', 'Basket', 'Rugby', 'Hockey']

// POPULATE BADGES:
function populateSingleLevel ( sport, league ) {
    let badges = []

    for( let i = 1; i <= 9; i++ ){
        let badge = {
            name: `badge ${i}`,
            description: `${sport} ${league} badge ${i} level 1`,
            leagueName: `${league}`,
            sportName: `${sport}`,
            level: 1,

            coins: 125,
            options: {
                // reUnlockable: 200,
                // reUnlockableCount: 0,
                // reccurent: 200,
                // reccurentCount: 0,

                "re-unlockable": {
                    "default": 200,
                    "value": 0,
                    "isActive": true
                },
                "Exact": {
                    "default": 200,
                    "value": 0,
                    "isActive": true
                }
            }
        }

        badges.push(badge)
    }

    return badges
}

function populateMultiLevels ( sport, league ) {
    let badges = []
    let level = 1

    for( let i = 1; i <= 27; i++ ){
        let badge = {
            name: `badge ${i}`,
            description: `${sport} ${league} badge ${i} level ${level}`,
            leagueName: `${league}`,
            sportName: `${sport}`,
            level: level,

            coins: 125,
            options: {
                reccurent: { default: 1000, value: 0, isActive: true },
                Exact: { default: 200, value: 0, isActive: true },
                'Serires-value': { default: 200, value: 0, isActive: true },
                Sport: { selected: "Option 1", value: [ "Option 1" , "Option 2", "Option 3" ], isActive: true },
                Event: { default: 200, value: 0, isActive: false },
                Odd: { default: 200, value: 0, isActive: true },
                'Type-odd': { default: 200, value: 0, isActive: false },
                'User-odd': { default: 200, value: 0, isActive: false }
            }
        }

        badges.push(badge)

        if( i % 9 === 0 && i < 27) level++
    }

    return badges
}

async function populateBadges () {
    let allbadges = []

    sports.map( sport => {
        for( let l = 1; l <= 3; l++ ){

            if( l < 3 ) {
                let ML = populateMultiLevels( sport, `league ${l}` )
                allbadges = [ ...allbadges, ...ML ]
            } else {
                let SL = populateSingleLevel( sport, `league ${l}`)
                allbadges = [ ...allbadges, ...SL ]
            }

        }
    })

    let ibadges = await Badge.insertMany(allbadges)

    console.log('badges populated')
    return ibadges
}

// POPULATE LEAGUES:
async function populateLeagues () {
    let allleagues = []

    sports.map( async sport => {
        for( let l = 1; l <= 3; l++) {

            const badges = await Badge.find({ leagueName: `league ${l}`, sportName: `${sport}` })
            let badgesIds = badges.map( badge => badge._id)

            let league;
            if( l < 3 ) {
                league = {
                    name: `league ${l}`,
                    description: `${sport} league ${l} desc`,
                    sportName: `${sport}`,
                    levels: [1, 2, 3],
                    badges: badgesIds,
                }

            } else {
                league = {
                    name: `league ${l}`,
                    description: `${sport} league ${l} desc`,
                    sportName: `${sport}`,
                    levels: [1],
                    badges: badgesIds,
                }
            }

            const leagueDoc = new League(league)
            await leagueDoc.save()

            // console.log(league)
            // allleagues.push(league)
        }
    })

    console.log('leagues populated')
    return allleagues
}

// POPULATE SPORTS:
async function populateSports () {
    sports.map( async s => {
        let leagues = await League.find({ sportName: `${s}` })
        let leaguesIds = leagues.map( l => l._id )

        let sport = {
            name: `${s}`,
            leagues: leaguesIds
        }

        // console.log(sport)
        const sportDoc = new Sport(sport)
        await sportDoc.save()
    })

    console.log('sports populated')
}

// POPULATE PLAYERS:
async function populatePlayers () {

    const sports = await Sport.find().populate({
        path: 'leagues',
        populate: {
            path: 'badges'
        }
    })

    for(let i = 1; i <= 3; i++){
        let data = {
            name: `player ${i}`,
            email: `player${i}@gmail.com`,
            sports,
        }

        const player = new Player(data)
        await player.save() 
    }

    console.log('players populated')
}

async function populateDatabase () {
    console.log("POPULATING DATABASE___".bgGreen.white.bold)
    
    // await populateBadges()
    // await populateLeagues()
    // await populateSports()
    
    // await populatePlayers()
    console.log("___DATABASE POPULATED".bgRed.white.bold)
}

module.exports = populateDatabase