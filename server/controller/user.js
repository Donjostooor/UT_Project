function userRouter(app, connection) {
    // Create User Record
    app.post("/user/new_user", async (req, res) => {
        const { u_email, u_password, u_name, u_lastname, u_birthday, u_gender, u_location, u_img } = req.body;
        console.log(req.body)
        try {
            connection.query(
                "INSERT INTO user(u_email, u_password, u_name, u_lastname, u_birthday, u_gender, u_location, u_img ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [u_email, u_password, u_name, u_lastname, u_birthday, u_gender, u_location, u_img],
                (err, result, fields) => {
                    if (err) {
                        console.log("Error while inserting a user account into the database", err)
                        return res.status(400).send();
                    }
                    return res.status(201).json({ msg: "New user added successfully" })
                }
            )
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });
    
    // Read all User 
    app.get("/user", async (req, res) => {
        try {
            connection.query("SELECT * FROM user",
            (err, results, field) => {
                if (err) {
                    console.log("Error while inserting a user account into the database", err)
                    return res.status(400).send();
                }
                res.status(200).json(results);
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }) 
    // Read single User 
    app.get("/user/:u_id", async (req, res) => {
        const u_id = req.params.u_id;
        try {
            connection.query("SELECT * FROM user WHERE u_id =?",[u_id],
            (err, results, field) => {
                if (err) {
                    console.log("Error while inserting a user account into the database", err)
                    return res.status(400).send();
                }
                res.status(200).json(results);
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }) 
    // Update User Record
    app.patch("/user/update/:u_id", async (req, res) => {
    const u_id = req.params.u_id;
    const { u_email, u_password, u_name, u_lastname, u_birthday, u_gender, u_location, u_img } = req.body;

    try {
        // Check if the specified u_id exists in the user table
        const userCheckQuery = "SELECT * FROM user WHERE u_id = ?";
        connection.query(userCheckQuery, [u_id], (userCheckErr, userCheckResults) => {
            if (userCheckErr) {
                console.log("Error checking user table", userCheckErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (userCheckResults.length === 0) {
                return res.status(404).json({ error: "User account not found" });
            }

            // Update data in the user table
            const userUpdateQuery = "UPDATE user SET u_email=?, u_password=?, u_name=?, u_lastname=?, u_birthday=?, u_gender=?, u_location=?, u_img=? WHERE u_id = ?";
            connection.query(userUpdateQuery, [u_email, u_password, u_name, u_lastname, u_birthday, u_gender, u_location, u_img, u_id], (userUpdateErr) => {
                if (userUpdateErr) {
                    console.log("Error updating user account table", userUpdateErr);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                return res.status(200).json({ msg: "User account updated successfully" });
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


    // Delete User Record
    app.delete("/user/delete/:u_id", async (req, res) => {
        const { u_id } = req.params;
    
        try {
            // Check if the specified u_id exists in the user table
            const userCheckQuery = "SELECT * FROM user WHERE u_id = ?";
            connection.query(userCheckQuery, [u_id], (userCheckErr, userCheckResults) => {
                if (userCheckErr) {
                    console.log("Error checking user table", userCheckErr);
                    return res.status(500).send();
                }
    
                if (userCheckResults.length === 0) {
                    return res.status(404).json({ error: "User item not found" });
                }
    
                // Delete data from the user table
                const userDeleteQuery = "DELETE FROM user WHERE u_id = ?";
                connection.query(userDeleteQuery, [u_id], (userDeleteErr) => {
                    if (userDeleteErr) {
                        console.log("Error deleting user account in table", userDeleteErr);
                        return res.status(500).send();
                    }
    
                    // Delete data from the user table
                    const userDeleteQuery = "DELETE FROM user WHERE u_id = ?";
                    connection.query(userDeleteQuery, [u_id], (userDeleteErr) => {
                        if (userDeleteErr) {
                            console.log("Error deleting user account table", userDeleteErr);
                            return res.status(500).send();
                        }
    
                        return res.status(200).json({ msg: "user account deleted successfully" });
                    });
                });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });
}

module.exports = userRouter;