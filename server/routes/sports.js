const express = require('express')
const mongoose = require("mongoose")
const { Sport } = require('../models/Sport.js')

const router = express.Router()
    
// GET ALL SPORTS:
router.get('/', async (req, res) => {
    console.log("GET /sports/", req.body)

    try {
        const sports = await Sport.find().populate({
            path: 'leagues',
            populate: {
                path: 'badges'
            }
        })

        res.status(200).json({isError: false, message: "all sports fetched", sports})
    } catch (err) {
        res.status(500).json({isError: true, message: "sports not fetched try reloading", info: err})
    }
})

// GET A SPORT:
router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`GET /sports/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "sport not found"})

    try {
        const sport = await Sport.findById( id ).populate({ path: 'leagues', populate: { path: 'badges' } })

        if(sport === null){
            return res.status(404).json({isError: true, message: "sport not found"})
        }

        res.status(200).json({isError: false, message: "sport fetched", sport})
    } catch (err) {
        res.status(500).json({isError: true, message: "sport not found", info: err})
    }
})

// POST NEW SPORT:
router.post('/', async (req, res) => {
    console.log("POST /sports/", req.body)

    const sportData = {
        ...req.body
    }

    try {
        const newSport = new Sport(sportData)
        await newSport.save()
        res.status(201).json({isError: false, message: "sport saved successfully", newSport})
    } catch (err) {
        res.status(400).json({isError: true, message: "sport not saved", info: err})
    }
})

// UPDATE SPORT:
router.put('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`PUT /sports/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "sport not found"})

    try {
        const sport = await Sport.findById(id)

        if( sport === null ){
            return res.status(404).json({isError: true, message: "sport not found"})
        }

        const newSport = {
            name: req.body.name ? req.body.name : sport.name ,
            leagues: req.body.leagues ? [...sport.leagues, ...req.body.leagues] : sport.leagues,
            createdAt: sport.createdAt
        }

        const updatedSport = await Sport.findByIdAndUpdate( sport._id, newSport, { new: true} )
        
        res.status(200).json({isError: false, message: "sport updated", updatedSport})
    } catch (err) {
        res.status(500).json({isError: true, message: "sport not updated", info: err})
    }
})

// DELETE SPORT:
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`DELETE /sports/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "sport not found"})

    try {
        const sport = await Sport.findByIdAndDelete( id )

        if(sport === null){
            return res.status(404).json({isError: true, message: "sport not found"})
        }

        res.status(200).json({isError: false, message: "sport deleted", sport})
    } catch (err) {
        res.status(500).json({isError: true, message: "sport not found", info: err})
    }
})

module.exports = router;