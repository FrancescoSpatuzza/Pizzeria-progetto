import { MongoClient } from "mongodb";
import {EventEmitter} from "node:events";

class DB {};

class Connect extends EventEmitter{
    constructor(){
        super();
        this.mongoClient = new MongoClient("mongodb://localhost:27017");
    }

   async get(){
       await this.mongoClient.connect();
       console.log("connessione a mongo db avvenuta");
       this.emit("connectionOk");
       this.setDbReference();
    }
setDbReference(){
    DB.pizzeria = this.mongoClient.db("Pizzeria");
    DB.menu = DB.pizzeria.collection("menu");
    DB.admin = DB.pizzeria.collection("admin");
}

}


export  {Connect, DB};