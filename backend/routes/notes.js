const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');

const fetchuser = require("../middleware/fetchuser");
const Notes = require('../models/Notes')

router.get('/getallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

router.post('/addnote', fetchuser, [
    body('title', 'Insert title').exists(),
    body('desc', 'Notes cannot be empty').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, body, desc, tag } = req.body;
        const note = new Notes({
            title, body, desc, tag, user: req.user.id,
        })

        const savedNote = await note.save();
        res.json(savedNote)

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title,desc, tag } = req.body;
        const newnote = {}
        if (title) { newnote.title = title }
        if (desc) { newnote.desc = desc }
        if (tag) { newnote.tag = tag }

        // find the note by id and update it
        let note = await Notes.findById(req.params.id);
        if(!note){res.status(404).send("not found")}
        if(note.user.toString()!= req.user.id){
            return res.status(401).send("Invalid Opeartion")
        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        
        const savedNote = await note.save();
        res.json(savedNote)

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note by id and update it
        let note = await Notes.findById(req.params.id);
        if(!note){res.status(404).send("not found")}
        if(note.user.toString()!= req.user.id){
            return res.status(401).send("Invalid Opeartion")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        
       
        res.json({"success":"note has been deleted"})

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router;