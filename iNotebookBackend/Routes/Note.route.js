const express = require('express')
// const noteController = require('../Controllers/Notes.controller');
const fetchUser = require('../Middleware/fetchUser');
const NotesModel = require('../Models/Note.model');

const router = express.Router();


// create notes
router.post('/createnote', fetchUser, async (req, res) => {
    // console.log(req.user.id)
    let rawData = {
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
    }
    try {
        var doc = NotesModel(rawData);
        let data = await doc.save();
        if (data) {
            res.status(200).send({ Success: true, message: 'Note Saved Successfully', data: data, })
        } else {
            res.status(404).send({ Success: false, message: 'Note Saved Failed' })
        }
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
})



// update an existing notes
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create a newNote 
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    try {
        let note = await NotesModel.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ Success: false, message: 'Note Not Found' })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ Success: false, message: 'You are not allowed to Edit' })
        }
        if (note) {
            note = await NotesModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.status(200).send({ Success: true, message: 'Note Updated..' })
        }
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
    // finding the perticular note

})


// deleting an existing notes
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await NotesModel.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ Success: false, message: 'Note Not Found' })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ Success: false, message: 'You are not allowed to Edit' })
        }
        if (note) {
            note = await NotesModel.findByIdAndDelete(req.params.id)
            res.status(200).send({ Success: true, message: 'Note Deleted', data : note })
        }
    } catch (error) {
        res.status(500).send({ Success: true, message: 'Server Error' })
    }
})



// fetch all notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    // console.log(req.user.id)
    try {
        const userId = req.user.id;
        const notes = await NotesModel.find({ user: userId })
        res.send(notes)
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
})




module.exports = router