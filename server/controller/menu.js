function menuRouter(app, connection) {
    // Create admin
    app.post("/menu/new_menu", async (req, res) => {
        const { f_code, f_name, f_carbon, f_img, f_materia } = req.body;
        console.log(req.body);

        try {
            connection.beginTransaction((err) => {
                if (err) {
                    console.log("Error starting database transaction", err);
                    return res.status(500).send();
                }

                // Insert data into the "menu" table
                connection.query(
                    "INSERT INTO menu(f_code, f_name, f_carbon, f_img, f_materia) VALUES (?, ?, ?, ?, ?)",
                    [f_code, f_name, f_carbon, f_img, f_materia],
                    (err, menuResult) => {
                        if (err) {
                            console.log("Error inserting into the menu table", err);
                            connection.rollback(() => {
                                return res.status(400).send();
                            });
                        } else {
                            connection.commit((err) => {
                                if (err) {
                                    console.log("Error committing transaction", err);
                                    connection.rollback(() => {
                                        return res.status(500).send();
                                    });
                                } else {
                                    return res.status(201).json({ msg: "New Food added in menu successfully" });
                                }
                                
                            });
                        }
                    }
                );
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });

    // Read all menu records
    app.get("/menu", async (req, res) => {
        try {
            connection.query("SELECT * FROM menu;",
                (err, results, field) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    res.status(200).json(results);
                })
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    })
    // Read single menu record
    app.get("/menu/:f_code", async (req, res) => {
        const f_code = req.params.f_code;
        try {
            connection.query("SELECT * FROM menu WHERE f_code = ?",
                [f_code], (err, results, field) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    res.status(200).json(results);
                })
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    })
    // Update menu record
    app.patch("/menu/update/:f_code", async (req, res) => {
        const f_code = req.params.f_code;
        const { f_name, f_carbon, f_img, f_materia } = req.body;

        try {
            // Check if the specified f_code exists in the menu table
            const menuCheckQuery = "SELECT * FROM menu WHERE f_code = ?";
            connection.query(menuCheckQuery, [f_code], (menuCheckErr, menuCheckResults) => {
                if (menuCheckErr) {
                    console.log("Error checking menu table", menuCheckErr);
                    return res.status(500).send();
                }

                if (menuCheckResults.length === 0) {
                    return res.status(404).json({ error: "Menu item not found" });
                }

                // Update data in the menu table
                const menuUpdateQuery = "UPDATE menu SET f_name = ?, f_carbon = ?, f_img = ?, f_materia = ? WHERE f_code = ?";
                connection.query(menuUpdateQuery, [f_name, f_carbon, f_img, f_materia, f_code], (menuUpdateErr) => {
                    if (menuUpdateErr) {
                        console.log("Error updating menu table", menuUpdateErr);
                        return res.status(500).send();
                    }
                    return res.status(200).json({ msg: "Menu item updated successfully"});

                });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });

    // delete menu record
    app.delete("/menu/delete/:f_code", async (req, res) => {
        const { f_code } = req.params;

        try {
            // Check if the specified f_code exists in the menu table
            const menuCheckQuery = "SELECT * FROM menu WHERE f_code = ?";
            connection.query(menuCheckQuery, [f_code], (menuCheckErr, menuCheckResults) => {
                if (menuCheckErr) {
                    console.log("Error checking menu table", menuCheckErr);
                    return res.status(500).send();
                }

                if (menuCheckResults.length === 0) {
                    return res.status(404).json({ error: "Menu item not found" });
                }

                // Delete data from the menu table
                const menuDeleteQuery = "DELETE FROM menu WHERE f_code = ?";
                connection.query(menuDeleteQuery, [f_code], (menuDeleteErr) => {
                    if (menuDeleteErr) {
                        console.log("Error deleting menu table", menuDeleteErr);
                        return res.status(500).send();
                    }
                    return res.status(200).json({ msg: "Menu item deleted successfully" });
                });
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });

}
module.exports = menuRouter;

