const express = require('express')
const userController = require('../Controllers/User.controller');
const fetchUser = require('../Middleware/fetchUser');
const UserModel = require('../Models/User.model');


const router = express.Router();



router.post('/registration', userController.registerUser)
router.post('/login', userController.login)
// router.post('/getuserdetails',userController.getDetails)

// get details
router.post('/getuserdetails', fetchUser, async (req, res) => {
    console.log(req.user.id)
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId).select("-password").select("-cpassword")
        res.send(user)
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
})




module.exports = router