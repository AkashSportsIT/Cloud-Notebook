const UserModel = require('../Models/User.model');
const bcrypt = require('bcryptjs')
const dontenv = require('dotenv')
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchUser');
// const { body, validationResult } = require('express-validator');

dontenv.config()

//  Registration of User 
exports.registerUser = async (req, res) => {
    let user = await UserModel.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send({ Success: false, message: 'User already exists Try to login..' })
    }
    const salt = await bcrypt.genSalt(10);
    let rawData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hash(req.body.password, salt),
        cpassword: await bcrypt.hash(req.body.cpassword, salt),
    }

    var doc = UserModel(rawData);

    try {
        const payload = {
            user: {
                id: rawData.id
            }
        }
        let data = await doc.save();
        if (data) {
            const authToken = jwt.sign(payload, process.env.JWT_SECERET)
            res.status(200).send({ Success: true, message: 'Registeration Successful', data: data, token: authToken })
        } else {
            res.status(404).send({ Success: false, message: 'Registeration Failed' })
        }
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
}




// //  Registration of User 
// exports.registerUser = [
//     body('name', 'Enter a valid name').isLength({ min: 3 }),
//     body('email', 'Enter a valid Email').isEmail(),
//     body('password', 'Password must be atleast 8 Characters').isLength({ min: 8 }),
// ],  (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         UserModel.create({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             password: req.body.password,
//             cpassword: req.body.cpassword,
//         }).then(user => res.json(user));
//     }




// Authenticate User for login 
exports.login = async (req, res) => {
    let user = await UserModel.findOne({ email: req.body.email })

    try {
        if (user) {
            const password = req.body.password
            if (bcrypt.compareSync(password, user.password)) {
                const payload = {
                    user: {
                        id: user?.id
                    }
                }
                var token = jwt.sign(payload, process.env.JWT_SECERET)
                res.status(200).send({ Success: true, token: token, message: "login success" })
            }
            else {
                res.status(401).send({ Success: false, message: "Incorrect Credentials" })
            }
        } else {
            res.status(404).send({ Success: false, message: "Incorrect Credentials" })
        }
    } catch (error) {
        res.status(500).send({ Success: false, message: 'Server Error' })
    }
}



// get user Details

// exports.getDetails = fetchUser, async(req, res) => {
//     console.log(req.user.id)
//     try {
//         const userId = req.user.id;
//         const user = await UserModel.findById(userId).select("-password").select("-cpassword")
//         res.send(user)
//     } catch (error) {
//         res.status(500).send({ Success: false, message: 'Server Error' })
//     }
// }