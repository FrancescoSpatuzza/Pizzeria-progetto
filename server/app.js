import  express from "express";
import helmet from "helmet";
import homeRouter from "./routes/homeRouter.js";
import adminRouter from "./routes/adminRouter.js";
import chiSiamoRouter from "./routes/chiSiamoRouter.js"
import {Connect, DB} from "./utils/connect.js";

const app = express();
const PORT = process.env.PORT || 3000 ; 
const connect = new Connect();



app.set("view engine", "ejs");
app.use(helmet());
app.use(homeRouter);
app.use(adminRouter);
app.use(chiSiamoRouter);

connect.on("connectionOk", ()=> {
    app.listen(PORT, console.log("Server attivo"));
});
connect.get();