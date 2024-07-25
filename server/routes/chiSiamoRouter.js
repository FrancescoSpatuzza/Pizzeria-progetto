import express from "express";


const router = express.Router();


router.get("/chi-siamo", (req, res)=> {
    res.render("layouts/default", {
        page: "chi-siamo",
    });
});


export default router;