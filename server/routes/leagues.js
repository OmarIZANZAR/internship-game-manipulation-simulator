const express = require('express')
const mongoose = require("mongoose")
const { League } = require('../models/League.js')

const router = express.Router()
    
// GET ALL LEAGUES:
router.get('/', async (req, res) => {
    console.log("GET /leagues/", req.body)

    try {
        const leagues = await League.find()
        res.status(200).json({isError: false, message: "all leagues fetched", leagues})
    } catch (err) {
        res.status(500).json({isError: true, message: "leagues not fetched", info: err})
    }
})

// GET A LEAGUE:
router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`GET /leagues/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "league not found"})

    try {
        const league = await League.findById( id ).populate('badges')

        if(league === null){
            return res.status(404).json({isError: true, message: "league not found"})
        }

        res.status(200).json({isError: false, message: "league fetched", league})
    } catch (err) {
        res.status(500).json({isError: true, message: "league not found", info: err})
    }
})

// POST NEW LEAGUE:
router.post('/', async (req, res) => {
    console.log("POST /leagues/", req.body)

    const leagueData = {
        ...req.body
    }

    try {
        const newLeague = new League(leagueData)
        await newLeague.save()
        res.status(201).json({isError: false, message: "league saved successfully", newLeague})
    } catch (err) {
        res.status(400).json({isError: true, message: "league not saved", info: err})
    }
})

// UPDATE LEAGUE:
router.put('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`PUT /leagues/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "league not found"})

    try {
        const league = await League.findById(id)

        if( league === null ){
            return res.status(404).json({isError: true, message: "league not found"})
        }

        const newLeague = {
            name: req.body.name ? req.body.name : league.name ,
            description: req.body.description ? req.body.description : league.description,
            sportName: req.body.sportName ? req.body.sportName : league.sportName,
            levels: req.body.levels ? req.body.levels : league.levels,

            badges: req.body.badges ? [...league.badges, ...req.body.badges] : league.badges,

            createdAt: league.createdAt
        }

        const updatedLeague = await League.findByIdAndUpdate( league._id, newLeague, { new: true} )
        
        res.status(200).json({isError: false, message: "league updated", updatedLeague})
    } catch (err) {
        res.status(500).json({isError: true, message: "league not updated", info: err})
    }
})

// DELETE LEAGUE:
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`DELETE /leagues/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "league not found"})

    try {
        const league = await League.findByIdAndDelete( id )

        if(league === null){
            return res.status(404).json({isError: true, message: "league not found"})
        }

        res.status(200).json({isError: false, message: "league deleted", league})
    } catch (err) {
        res.status(500).json({isError: true, message: "league not found", info: err})
    }
})

module.exports = router;