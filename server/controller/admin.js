function adminRouter(app, connection) {

    // Read all admin records
    app.get("/admins", (req, res) => {
        connection.query("SELECT * FROM admin", (err, results) => {
            if (err) throw err;
            res.json(results);
        });
    });

    // Create admin
    app.post("/admin", (req, res) => {
        const { admin_user, admin_password, admin_name, admin_lastname, admin_age, admin_img } = req.body;
        connection.query(
            "INSERT INTO admin (admin_user, admin_name, admin_password, admin_lastname, admin_age, admin_img) VALUES (?, ?, ?, ?, ?, ?)",
            [admin_user, admin_password, admin_name, admin_lastname, admin_age, admin_img],
            (err, results) => {
                if (err) throw err;
                res.status(201).json({ message: "Admin created successfully" });
            }
        );
    });

    // Update admin by admin_id
    app.put("/admin/:admin_id", (req, res) => {
        const adminId = req.params.admin_id;
        const { admin_user, admin_name, admin_lastname, admin_age, admin_img } = req.body;
        connection.query(
            "UPDATE admin SET admin_user=?, admin_name=?, admin_lastname=?, admin_age=?, admin_img=? WHERE admin_id=?",
            [admin_user, admin_name, admin_lastname, admin_age, admin_img, adminId],
            (err, results) => {
                if (err) throw err;
                res.json({ message: "Admin updated successfully" });
            }
        );
    });

    // Delete admin by admin_id
    app.delete("/admin/:admin_id", (req, res) => {
        const adminId = req.params.admin_id;
        connection.query("DELETE FROM admin WHERE admin_id=?", [adminId], (err, results) => {
            if (err) throw err;
            res.json({ message: "Admin deleted successfully" });
        });
    });

    // Login functionality (you can implement this as needed)
    app.post("/admin/login", (req, res) => {
        // Implement your login logic here
    });
}

module.exports = adminRouter;
