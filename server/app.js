import express, { urlencoded } from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from 'url'; 

import homeRouter from "./routes/homeRouter.js";
import adminRouter from "./routes/adminRouter.js";
import chiSiamoRouter from "./routes/chiSiamoRouter.js";
import { Connect, DB } from "./utils/connect.js";

const app = express();
const PORT = process.env.PORT || 3000;
const connect = new Connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(homeRouter);
app.use(adminRouter);
app.use(chiSiamoRouter);

connect.on("connectionOk", () => {
    app.listen(PORT, console.log(`Server attivo su http://localhost:${PORT}`));
});

connect.get();
