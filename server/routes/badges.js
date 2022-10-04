const express = require('express')
const mongoose = require("mongoose")
const { Badge } = require('../models/Badge.js')

const router = express.Router()
    
// GET ALL BADGES:
router.get('/', async (req, res) => {
    console.log("GET /badges/", req.body)

    try {
        const badges = await Badge.find()
        res.status(200).json({isError: false, message: "all badges fetched", badges})
    } catch (err) {
        res.status(500).json({isError: true, message: "badges not fetched", info: err})
    }
})

// GET A BADGE:
router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`GET /badges/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "badge not found"})

    try {
        const badge = await Badge.findById( id )

        if(badge === null){
            return res.status(404).json({isError: true, message: "badge not found"})
        }

        res.status(200).json({isError: false, message: "badge fetched", badge})
    } catch (err) {
        res.status(500).json({isError: true, message: "badge not found", info: err})
    }
})

// POST NEW BADGE:
router.post('/', async (req, res) => {
    console.log("POST /badges/", req.body)

    const badgeData = {
        ...req.body
    }

    try {
        const newBadge = new Badge(badgeData)
        await newBadge.save()
        res.status(201).json({isError: false, message: "badge saved successfully", newBadge})
    } catch (err) {
        res.status(400).json({isError: true, message: "badge not saved", info: err})
    }
})

// UPDATE BADGE:
router.put('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`PUT /badges/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "badge not found"})

    try {
        const badge = await Badge.findById(id)

        if( badge === null ){
            return res.status(404).json({isError: true, message: "badge not found"})
        }

        const newBadge = {
            name: req.body.name ? req.body.name : badge.name ,
            description: req.body.description ? req.body.description : badge.description,
            sportName: req.body.sportName ? req.body.sportName : badge.sportName,
            leagueName: req.body.leagueName ? req.body.leagueName : badge.leagueName,
            coins: req.body.coins ? req.body.coins : badge.coins,
            level: req.body.level ? req.body.level : badge.level,

            options: req.body.options ? {...badge.options, ...req.body.options } : badge.options,

            createdAt: badge.createdAt
        }

        const updatedBadge = await Badge.findByIdAndUpdate( badge._id, newBadge, { new: true} )
        
        res.status(200).json({isError: false, message: "badge updated", updatedBadge})
    } catch (err) {
        res.status(500).json({isError: true, message: "badge not updated", info: err})
    }
})

// DELETE BADGE:
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    console.log(`DELETE /badges/${id}`, req.body)

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "badge not found"})

    try {
        const badge = await Badge.findByIdAndDelete( id )

        if(badge === null){
            return res.status(404).json({isError: true, message: "badge not found"})
        }

        res.status(200).json({isError: false, message: "badge deleted", badge})
    } catch (err) {
        res.status(500).json({isError: true, message: "badge not found", info: err})
    }
})

module.exports = router;