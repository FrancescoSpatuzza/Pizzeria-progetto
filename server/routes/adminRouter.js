import express from "express";
import { DB } from "../utils/connect.js";

const router = express.Router();


router.get("/admin", async (req, res)=> {
    res.render("layouts/default", {
        page: "adminLogin",
    })
});


router.get("/admin/modifica", async (req, res)=> {
    const pizzeCursor = await DB.menu.find({});
    const pizze = await pizzeCursor.toArray();
    for (let pizza of pizze){
        console.log(pizza);
    }

    res.render("layouts/default", {
        page: "adminModify",
        pizze, 
    })
});

export default router;