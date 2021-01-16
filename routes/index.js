const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const slug = require('slug')

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");
const Page = require("../models/Page");

// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 // 1h
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// @desc register page
// @access Private
router.post("/page", passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Form validation

    const isExist = await Page.findOne({ page: req.body.page })

    if (!isExist) {
        // Crear url
        const url = 'http://' + req.hostname + '/' + req.body.page
        const page = slug(req.body.page)

        const newPage = new Page({
            page,
            url,
            userId: req.user.id
        });

        await newPage.save()
        return res.json({ success: "Success" });
    } else {
        return res.json({ error: "Duplicate page" });
    }
});

// @access public
router.get("/page/:page", async (req, res) => {
    const page = await Page.findOne({ page: slug(req.params.page) })
    
    if (page) {
        return res.json(page);
    } else {
        return res.json({ error: "Page not found" });
    }
});

module.exports = router;
