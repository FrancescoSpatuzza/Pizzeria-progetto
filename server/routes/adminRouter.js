import express from "express";

const router = express.Router();


router.get("/admin", (req, res)=> {
    res.render("layouts/default", {
        page: "adminLogin",
    })
});

export default router;