import express from "express";
import cors from 'cors';
import { connectToMongoDB } from "./services/mongodb.js";
import router from "./routes/index.js";
import connectToVosDB568, { closedbConnectionMysqlVos568 } from './services/ConnectVos568/mySqlVos568.js';
import connectToVosDB565, { closedbConnectionMysqlVos565 } from './services/ConnectVos565/mySqlVos565.js';
import { closeSQLServerConnectDNC573, connectToSQLServerDNC573 } from "./services/ConnectSQLServerDNC573/index.js";
import connectWebSocket from "./sockets/index.js";
import { connectMySQL565 } from "./services/ConnectVos565/mySQLVos565.test.js";

const app = express();

const port = 3002;
app.use(express.json());
app.use(cors({ origin: '*' }));

connectToMongoDB()
connectToVosDB568()
// connectToVosDB565()
connectToSQLServerDNC573()
connectMySQL565();

app.use('/api', router);

connectWebSocket(app, 1210);

process.on('SIGINT', () => {
    console.log('Shutting down, closing connections.');
    closedbConnectionMysqlVos568();
    // closedbConnectionMysqlVos565();
    closeSQLServerConnectDNC573();
    process.exit();
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});