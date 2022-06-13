const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const saltRounds = 10;
const JWT_SECRET = 'helloworld'

//post request to create new user
router.post('/createuser', [body('name', 'enter name with at least 5 letters').isLength({ min: 5 }),
    body('password', 'enter password with at least 5 letters').isLength({ min: 5 }),
    body('email', 'please enter valid email format').isEmail()],
    async (req, res) => {
      let success = false
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }
            //unique email id validation
            let user = await User.findOne({ email: req.body.email });
            if (user) return res.status(400).json({success, error: "User already registered."});

            const salt = await bcrypt.genSalt(saltRounds)
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true
            res.json({success, authToken})
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

    // login user
router.post("/login", async (req, res) => {
        let success = false
        // Our login logic starts here
        try {
          // Get user input
          const { email, password } = req.body;
      
          // Validate user input
          if (!(email && password)) {
            res.status(400).send("All input is required");
          }
          // Validate if user exist in our database
          const user = await User.findOne({ email });
      
          if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const authToken = jwt.sign(
              { id: user.id, email }, JWT_SECRET
            );
      
            // save user token
            //user.token = token;
      
            // user
            success = true
            return res.status(200).json({success, authToken});
          }
          res.status(400).json({success, error: 'invalid crenditals' });
        } catch (err) {
          console.log(err.message);
        }
        // Our register logic ends here
      });
// Get logged in User detail from /getuser. Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        
        const userId = req.user.id
        //console.log(userId)
        const user = await User.findById( userId ).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;