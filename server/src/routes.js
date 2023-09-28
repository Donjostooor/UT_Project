const UserController = require('./controllers/usercontroller')

module.exports = (app) => {
    // Create user
    app.post('/user', UserController.create);

    // Edit user, suspend, activate
    app.put('/user/:userId', UserController.put);

    // Delete user
    app.delete('/user/:userId', UserController.remove);

    // Get user by id
    app.get('/user/:userId', UserController.show);

    // Get all users
    app.get('/users', UserController.index);
};