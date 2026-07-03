const express = require('express')
const mongoose = require('mongoose')
const Lead = require('../models/leadmodel')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// protect all routes
router.use(requireAuth)

// Get all leads
router.get('/', async (req,res)=> {
    const user_id = req.user._id

    const leads = await Lead.find({ user_id }).sort({createdAt:-1})
    res.json(leads)
})

// Get leads info
router.get('/info', async (req,res)=> {
    const user_id = req.user._id
    const leads = await Lead.find({user_id})
    const info = {
        total: leads.length,
        new: await leads.filter((lead)=>lead.status == 'new').length,
        contacted: await leads.filter((lead)=>lead.status == 'contacted').length,
        converted: await leads.filter((lead)=>lead.status == 'converted').length,
    }
    res.json(info)
})

// Add a new lead
router.post('/', async (req,res)=> {
    const {name, email, phone, status, assignedTo} = req.body
    const user_id = req.user._id

    // add to the database
    try {
        const lead = await Lead.create({name, email, phone, status, assignedTo, user_id})
        res.status(200).json(lead)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Updating a lead
router.put('/:id', async (req,res)=> {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Lead'})
    }
    console.log(req.body)

    const lead = await Lead.findOneAndUpdate({_id:id},{...req.body},{returnDocument:'after'})

    if (!lead) {
        return res.status(400).json({error: 'No such lead'})
    }

    res.status(200).json(lead)
})

// Deleting a lead
router.delete('/:id', async (req,res)=> {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Lead'})
    }

    const lead = await Lead.findOneAndDelete({_id:id})

    if (!lead) {
        return res.status(400).json({error: 'No such lead'})
    }

    res.status(200).json(lead)
})

module.exports = router