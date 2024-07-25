import express from "express";


const router = express.Router();


router.get("/", (req, res)=> {
    res.render("layouts/default", {
        page: "home",
    });
});


export default router;