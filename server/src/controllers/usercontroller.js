const { User } = require('../model');

module.exports = {
    // Get all users
    async index(req, res) {
        try {
            const users = await User.findAll();
            res.send(users);
        } catch (err) {
            res.status(500).send({
                error: 'The user information was incorrect',
            });
        }
    },

    // Create user
    async create(req, res) {
        //console.log(JSON.stringify(req.body));
        console.log(JSON.stringify(req.body.name));
        console.log(JSON.stringify(req.body));
        try {
            const user = await User.create(req.body)
            res.send(user)
        }
        catch (err) {
            res.status(500).send({
                error: 'Create user incorrect',
            })
        }
    },
    /*async create(req, res) {
        try {
            const { u_name, u_gender, u_location } = req.body;
            const newUser = await User.create({ u_name, u_gender, u_location });
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },*/

    // Edit user, suspend, activate
    async put(req, res) {
        try {
            await User.update(req.body, {
                where: {
                    u_id: req.params.userId, // Updated to use u_id
                },
            });
            res.send(req.body);
        } catch (err) {
            res.status(500).send({
                error: 'Update user incorrect',
            });
        }
    },

    // Delete user
    async remove(req, res) {
        try {
            const user = await User.findByPk(req.params.userId);
            if (!user) {
                return res.status(403).send({
                    error: 'The user information was incorrect',
                });
            }
            await user.destroy();
            res.send(user);
        } catch (err) {
            res.status(500).send({
                error: 'The user information was incorrect',
            });
        }
    },

    // Get user by id
    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.userId);
            res.send(user);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: 'The user information was incorrect',
            });
        }
    },
};
