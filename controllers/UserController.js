const Users = require('../models/Users')

exports.signin = async (req, res) => {
    res.send('signin')
}

exports.signup = async (req, res) => {
    
    res.send('signup')
}

exports.logout = async (req, res) => {
    res.send('logout')
}