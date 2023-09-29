function adminRouter(app, connection) {

    // Read all admin records
    app.get("/admin", async (req, res) => {
        try {
            connection.query("SELECT * FROM admin ", (err, results, field) => {
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
    // Read single admin record
    app.get("/admin/:id", async (req, res) => {
        const adminId = req.params.id;
        try {
            connection.query("SELECT * FROM admin WHERE admin_id =?", [adminId], (err, results, field) => {
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
    // Create admin
    app.post("/admin/new_account", async (req, res) => {
    const { admin_user, admin_password , admin_name, admin_lastname, admin_age, admin_img} = req.body;
    console.log(req.body)
    try {
        connection.query(
            "INSERT INTO admin(admin_user, admin_password, admin_name, admin_lastname, admin_age, admin_img) VALUES (?, ?, ?, ?, ?, ?)",
            [admin_user, admin_password, admin_name, admin_lastname, admin_age, admin_img],
            (err, result, fields) => {
            if (err) {
                console.log("Error while inserting a account admin into the database", err)
                return res.status(400).send();
            }
            return res.status(201).json({ msg : "New admin added successfully"})
        }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});
    // Update admin record
app.patch("/admin/update/:admin_id", async (req, res) => {
// Get admin_id from route parameters
    const admin_id = req.params.admin_id;
    const admin_user = req.body.admin_user;
    const admin_password = req.body.admin_password;
    const admin_name = req.body.admin_name;
    const admin_lastname = req.body.admin_lastname;
    const admin_age = req.body.admin_age;
    const admin_img = req.body.admin_img;
    try {
        connection.query(
            "UPDATE admin SET admin_user=?, admin_password=?, admin_name=?, admin_lastname=?, admin_age=?, admin_img=? WHERE admin_id=?", 
            [admin_user, admin_password, admin_name, admin_lastname, admin_age, admin_img, admin_id], 
            (err, results, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ msg: "Admin updated successfully" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }        
});

    // Delete admin by admin_id
    app.delete("/admin/delete/:admin_user", async (req, res) => {
        const admin_user = req.params.admin_user;
    
        try {
            connection.query(
                "DELETE FROM admin WHERE admin_user = ?", 
                [admin_user], 
                (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    if (results.affectedRows === 0) {
                        return res.status(404).json({ msg: "Admin not found" });
                    }
                    res.status(200).json({ msg: "Admin deleted successfully" });
                }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }        
    });
    
    // Login (You need to implement login logic here)

}

module.exports = adminRouter;
