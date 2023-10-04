function modelRouter(app, connection) {
    // Create model
    app.post("/model/new_model", async (req, res) => {
        const { m_model } = req.body;
        console.log(req.body)
        try {
            connection.query(
                "INSERT INTO model(m_model) VALUES (?)",
                [m_model],
                (err, result, fields) => {
                    if (err) {
                        console.log("Error while inserting a account model into the database", err)
                        return res.status(400).send();
                    }
                    return res.status(201).json({ msg: "New model added successfully" })
                }
            )
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });
    // Read all model 
    app.get("/model", async (req, res) => {
        try {
            connection.query("SELECT * FROM model",
            (err, results, field) => {
                if (err) {
                    console.log("Error while inserting a account model into the database", err)
                    return res.status(400).send();
                }
                res.status(200).json(results);
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }) 
    // Read single model 
    app.get("/model/:m_id", async (req, res) => {
        const m_id = req.params.m_id;
        try {
            connection.query("SELECT * FROM model WHERE m_id =?",[m_id],
            (err, results, field) => {
                if (err) {
                    console.log("Error while inserting a account model into the database", err)
                    return res.status(400).send();
                }
                res.status(200).json(results);
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }) 
    // Delete model 
    app.delete("/model/delete/:m_id", async (req, res) => {
        const { m_id } = req.params;
    
        try {
            // Check if the specified m_id exists in the menu table
            const modelCheckQuery = "SELECT * FROM model WHERE m_id = ?";
            connection.query(modelCheckQuery, [m_id], (modelCheckErr, modelCheckResults) => {
                if (modelCheckErr) {
                    console.log("Error checking Model table", modelCheckErr);
                    return res.status(500).send();
                }
    
                if (modelCheckResults.length === 0) {
                    return res.status(404).json({ error: "Model item not found" });
                }
    
                // Delete data from the model table
                const modelDeleteQuery = "DELETE FROM model WHERE m_id = ?";
                connection.query(modelDeleteQuery, [m_id], (modelDeleteErr) => {
                    if (modelDeleteErr) {
                        console.log("Error deleting model table", modelDeleteErr);
                        return res.status(500).send();
                    }
                    return res.status(200).json({ msg: "Model item deleted successfully" });
                });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });
}

module.exports = modelRouter;