const { isGuest } = require('../middlewares/guards');
const { register, login, logout } = require('../services/users');
const mapErrors = require('../utils/mapper');

const router = require('express').Router();

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email == '') {
            throw new Error('Email and password are required');
        }

        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim().toLowerCase());
        res.status(201).json(result);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }


});

router.post('/login', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email == '') {
            throw new Error('Invalid email or password');
        }

        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim().toLowerCase());
        res.status(201).json(result);

    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.json({ message: error });
    }
});


router.get('/logout', (req, res) => {
    logout(req.user?.token);
    res.status(204).end();
});

module.exports = router;