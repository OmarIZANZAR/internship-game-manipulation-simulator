const express = require('express')
const mongoose = require("mongoose")
const { Player } = require('../models/Player.js')
const { Sport } = require('../models/Sport.js')

const router = express.Router()
    
// GET ALL PLAYERS:
router.get('/', async (req, res) => {
    const email = req.query.email
    console.log("GET /players/", req.body)

    if(email){
        console.log("QUERY: ", email)
    }

    try {
        let players = [];
        if( email ){
            players = await Player.find({ $text: { $search: `"${email}"` } }).select('name email')
        } else {
            players = await Player.find()
        }

        res.status(200).json({isError: false, message: "all players fetched", players})
    } catch (err) {
        res.status(500).json({isError: true, message: "players not fetched try reloading", info: err})
    }
})

// GET A PLAYER:
router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`GET /players/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "player not found"})

    try {
        const player = await Player.findById( id )

        if(player === null){
            return res.status(404).json({isError: true, message: "player not found"})
        }

        res.status(200).json({isError: false, message: "player fetched", player})
    } catch (err) {
        res.status(500).json({isError: true, message: "player not found", info: err})
    }
})

// POST NEW PLAYER:
router.post('/', async (req, res) => {
    console.log("POST /players/", req.body)

    const sports = await Sport.find().populate({
        path: 'leagues',
        populate: {
            path: 'badges'
        }
    })

    if( sports === null )
        return res.status(400).json({isError: true, message: "player not saved", info: err})

    const playerData = {
        name: req.body.name,
        email: req.body.email,
        sports
    }

    try {
        const newPlayer = new Player(playerData)
        await newPlayer.save()
        res.status(201).json({isError: false, message: "player saved successfully", newPlayer})
    } catch (err) {
        res.status(400).json({isError: true, message: "player not saved", info: err})
    }
})

// UPDATE PLAYER BADGE:
router.put('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`PUT /players/${id}`, req.body)

    const { sportId, leagueIndex , badgeId , badgeOptions } = req.body

    if( 
        !mongoose.Types.ObjectId.isValid(id)
        || !mongoose.Types.ObjectId.isValid(sportId) 
        || !mongoose.Types.ObjectId.isValid(badgeId)
    ){
        return res.status(404).send({isError: true, message: "player not found"})
    }

    try {
        console.log("ACTION_____'")
        const player = await Player.findById(id)

        if( player === null ){
            return res.status(404).json({isError: true, message: "player not found"})
        }

        player.sports.forEach( sport => {
            if( sport._id == sportId ){
                sport.leagues[leagueIndex].badges.forEach( badge => {
                    if( badge._id == badgeId ){
                        badge.options = badgeOptions
                        console.log(badge)
                    }
                })
            }
        })
        
        const updatedPlayer = await Player.findByIdAndUpdate( player._id, player, { new: true} )

        res.status(200).json({isError: false, message: "player updated", player: updatedPlayer})
    } catch (err) {
        res.status(500).json({isError: true, message: "player not updated", info: err})
    }
})

// DELETE PLAYER:
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`DELETE /players/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "player not found"})

    try {
        const player = await Player.findByIdAndDelete( id )

        if(player === null){
            return res.status(404).json({isError: true, message: "player not found"})
        }

        res.status(200).json({isError: false, message: "player deleted", player})
    } catch (err) {
        res.status(500).json({isError: true, message: "player not found", info: err})
    }
})

// UPDATE PLAYER:
// router.put('/:id', async (req, res) => {
//     const id = req.params.id
//     console.log(`PUT /players/${id}`, req.body)

//     if(!mongoose.Types.ObjectId.isValid(id))
//         return res.status(404).send({isError: true, message: "player not found"})

//     try {
//         const player = await Player.findById(id)

//         if( player === null ){
//             return res.status(404).json({isError: true, message: "player not found"})
//         }

//         const newPlayer = {
//             name: req.body.name ? req.body.name : player.name ,
//             email: req.body.email ? req.body.email : player.email,
//             sports: req.body.sports ? [...player.sports, ...req.body.sports] : player.sports,
//             createdAt: player.createdAt
//         }

//         const updatedPlayer = await Player.findByIdAndUpdate( player._id, newPlayer, { new: true} )
        
//         res.status(200).json({isError: false, message: "player updated", updatedPlayer})
//     } catch (err) {
//         res.status(500).json({isError: true, message: "player not updated", info: err})
//     }
// })

module.exports = router;
