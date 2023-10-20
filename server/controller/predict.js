function predictRouter(app, connection) {
    // Create predict
    app.post("/predict/new_value", async (req, res) => {
        const { pd_userid, pd_name, pd_code, pd_carbon, pd_predict, pd_year, pd_date, pd_time, pd_img } = req.body;
        console.log(req.body)
        try {
            connection.query(
                "INSERT INTO predict(pd_userid, pd_name, pd_code, pd_carbon, pd_predict, pd_year, pd_date, pd_time, pd_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [pd_userid, pd_name, pd_code, pd_carbon, pd_predict, pd_year, pd_date, pd_time, pd_img],
                (err, result, fields) => {
                    if (err) {
                        console.log("Error while inserting a New Value into the database", err)
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
    // Read predict
        // Read all predict 
        app.get("/predict", async (req, res) => {
            try {
                connection.query("SELECT * FROM predict",
                (err, results, field) => {
                    if (err) {
                        console.log("Error while view predict into the database", err)
                        return res.status(400).send();
                    }
                    res.status(200).json(results);
                })
            } catch (err) {
                console.log(err);
                return res.status(500).send();
            }
        }) 
        // Read single predict 
        app.get("/predict/:pd_userid", async (req, res) => {
            const pd_userid = req.params.pd_userid;
            try {
                connection.query("SELECT * FROM predict WHERE pd_userid =?",[pd_userid],
                (err, results, field) => {
                    if (err) {
                        console.log("Error while view predict into the database", err)
                        return res.status(400).send();
                    }
                    res.status(200).json(results);
                })
            } catch (err) {
                console.log(err);
                return res.status(500).send();
            }
        }) 
    // Delete predict
    app.delete("/predict/delete/:pd_id", async (req, res) => {
        const { pd_id } = req.params;
    
        try {
            // Check if the specified u_id exists in the user table
            const userCheckQuery = "SELECT * FROM predict WHERE pd_id = ?";
            connection.query(userCheckQuery, [pd_id], (userCheckErr, userCheckResults) => {
                if (userCheckErr) {
                    console.log("Error checking predict table", userCheckErr);
                    return res.status(500).send();
                }
    
                if (userCheckResults.length === 0) {
                    return res.status(404).json({ error: "User item not found" });
                }
    
                // Delete data from the user table
                const userDeleteQuery = "DELETE FROM predict WHERE pd_id = ?";
                connection.query(userDeleteQuery, [pd_id], (userDeleteErr) => {
                    if (userDeleteErr) {
                        console.log("Error deleting predict in table", userDeleteErr);
                        return res.status(500).send();
                    }
    
                    // Delete data from the user table
                    const userDeleteQuery = "DELETE FROM predict WHERE pd_id = ?";
                    connection.query(userDeleteQuery, [pd_id], (userDeleteErr) => {
                        if (userDeleteErr) {
                            console.log("Error deleting predict table", userDeleteErr);
                            return res.status(500).send();
                        }
    
                        return res.status(200).json({ msg: "this predict deleted successfully" });
                    });
                });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });
}

module.exports = predictRouter;