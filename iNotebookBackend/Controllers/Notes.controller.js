const noteController = require('../Controllers/Notes.controller');




exports.createNote = async (req, res) => {
    let user = await noteController.findOne({ email: req.body.email })

    try {
        
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
}
