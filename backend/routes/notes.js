const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')

//fetch all notes
router.get("/allnotes", fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id })
        //console.log(userId)

        res.json(notes)
    } catch (error) {
        console.error(error)
    }
})

// add a new note for a client. ogin required
router.post('/addnote', fetchuser, [body('title', 'title should have 5 letters').isLength({ min: 5 }),
body('description', 'enter description with at least 5 letters').isLength({ min: 5 })],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body;
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        }

        catch (error) {
            console.error(error.message)
            res.status(500).send('some error has occurred')
        }
        // .catch(err => {
        //     console.log(err)
        //     res.json({ message: err.message })
        // })
    })

// Update an existing note. Login required
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const {title, description, tag} = req.body;
            const newNote = {}
            if (title) {newNote.title = title}
            if (description) {newNote.description = description}
            if (tag) {newNote.tag = tag}
            //find the note to be updated and update that
            let note = await Notes.findById(req.params.id)
            if (!note) { return res.status(401).send("not found")}
            if (note.user.toString() !== req.user.id ) {
                return res.status(401).send("not allowed")
            }
            note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
            res.json({note})



        } catch (error) {
            console.error(error.message)
            res.status(500).send('some error has occurred')
        }
    })
   //Delete  Note. Login required
   router.delete('/deletenote/:id', fetchuser,
   async (req, res) => {
       try {
           //find the note to be deleted and delete that
           let note = await Notes.findById(req.params.id)
           if (!note) { return res.status(401).send("not found")}
           if (note.user.toString() !== req.user.id ) {
               return res.status(401).send("not allowed")
           }
           note = await Notes.findByIdAndDelete(req.params.id)
           res.json({"success": "note deleted", note: note})



       } catch (error) {
           console.error(error.message)
           res.status(500).send('some error has occurred')
       }
   })

module.exports = router;