import { MongoClient } from "mongodb";
import {EventEmitter} from "node:events";



class Connect extends EventEmitter{
    constructor(){
        super();
        this.mongoClient = new MongoClient("mongodb://localhost:27017");
    }

   async get(){
       await this.mongoClient.connect();
       console.log("connessione a mongo db avvenuta");
       this.emit("connectionOk");
    }
}


export default Connect;