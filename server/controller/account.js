const jwt = require("jsonwebtoken");
const saltRounds = 10;
const secretKey = "Login-by-Carbon-Secret";

function account(app, connection) {
    // Login
    app.post('/login', (req, res) => {
        const { u_email, u_password } = req.body;

        connection.query(
            'SELECT * FROM user WHERE u_email = ?',
            u_email,
            (err, result) => {
                if (err) {
                    res.status(401).json({ message: 'user password false' });
                };
                if (result.length === 0) {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
                else {
                    const user = result[0];
                    if (u_password === user.u_password) {
                        const accessToken = jwt.sign({ user: user }, secretKey, {
                            expiresIn: "1h",
                        });
                        res.json({ message: "Login successful", accessToken , user});
                    } else {
                        res.status(401).json({ msg: 'Email Or Password Wrong' });
                    }
                }
            }
        );
    });

    // Login Admin
    app.post('/admin/login', (req, res) => {
        const { admin_user, admin_password } = req.body;

        connection.query(
            'SELECT * FROM admin WHERE admin_user = ?',
            admin_user,
            (err, result) => {
                if (err) {
                    res.status(401).json({ message: 'user password false' });
                };
                if (result.length === 0) {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
                else {
                    const admin = result[0];
                    if (admin_password === admin.admin_password) {
                        const accessToken = jwt.sign({ admin: admin }, secretKey, {
                            expiresIn: "1h",
                        });
                        res.json({ message: "Login Admin successful", accessToken , admin});
                    } else {
                        res.status(401).json({ msg: 'Email Or Password Wrong' });
                    }
                }
            }
        );
    });

    // Logout
    app.get('/logout', (req, res) => {
        if (req.session) {
            // Destroy the user's session
            req.session = null;
            res.json({ message: 'Logout successful' });
        } else {
            res.status(401).json({ message: 'Not logged in' });
        }
    });

}

module.exports = account;
