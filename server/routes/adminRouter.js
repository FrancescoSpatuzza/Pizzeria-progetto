import express from "express";
import { DB } from "../utils/connect.js";
import bcrypt from "bcrypt";

const router = express.Router();

// controllo autenticazione dell admin




const adminIsLogged = async (req, res, next) => {
    const admin = await DB.admin.findOne({ nome: "admin" });
   const { nome , password } = req.body;
   const salt = await bcrypt.genSalt(10)
   const hash =await bcrypt.hash (password, salt);
   const isMatch = await bcrypt.compare(password, admin.password);
   if(nome !== admin.nome) {
    res.send("Non sei autorizzato , nome admin errato!")
   }else{
    if (isMatch) {
        next();
    }else {
        res.send("non sei autorizzato, password errata!");
    }
}
}



//rotta per l accesso dell admin


router.get("/admin", async (req, res)=> {
    res.render("layouts/default", {
        page: "adminLogin",
    })
});


// rotta per la modifica del menu dell admin


router.get("/admin/modifica", async (req, res)=> {
    const pizzeCursor = await DB.menu.find({});
    const pizze = await pizzeCursor.toArray();
  
    res.render("layouts/default", {
        page: "adminModify",
        pizze, 
    })
});

router.post("/admin/modifica",adminIsLogged, async (req, res)=> { 
    res.redirect("/admin/modifica");
});




//rotta per l iserimento di una pizza nel menu

router.get("/admin/modifica/add", (req, res)=> {
    res.render("layouts/default", {
        page: "adminAddPizza",
    })
});


router.post("/admin/modifica/add", (req, res)=> {
    DB.menu.insertOne(req.body);
    res.redirect("/admin/modifica");
});




//rotta per la modifica delle pizze nel menu

router.get("/admin/modifica/change", async (req, res)=> {
    const pizzeCursor = await DB.menu.find({});
    const pizze = await pizzeCursor.toArray();
    res.render("layouts/default", {
        page: "adminChangePizza",
        pizze,
    })
});


router.post("/admin/modifica/change", async (req, res)=> {

    const {pizzaNome, nome, prezzo, ingredienti} = req.body;

    await DB.menu.updateOne(
        {nome : pizzaNome},
        {$set : {nome, prezzo, ingredienti}}
    );

    res.redirect("/admin/modifica");
})




// rotta per eliminare una pizza dal menu

router.get("/admin/modifica/delete", async (req, res)=> {
    const pizzeCursor = await DB.menu.find({});
    const pizze = await pizzeCursor.toArray();
    res.render("layouts/default", {
        page: "adminDeletePizze",
        pizze,
    })
});


router.post("/admin/modifica/delete",async (req, res)=> {
    const {pizzaNome} = req.body;
    await DB.menu.deleteOne({nome : pizzaNome});
    res.redirect("/admin/modifica");
})


export default router;