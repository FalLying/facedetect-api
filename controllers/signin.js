const handleSignin = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;

    db.select('hash')
        .from('login')
        .where('email', email)
    .then(user => {
        if (user.length) {
            if (bcrypt.compareSync(password, user[0].hash)) {
                db.select('*')
                    .from('users')
                    .where('email', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('wrong credentials')
            }
        } else {
            res.status(400).json('User not found')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}