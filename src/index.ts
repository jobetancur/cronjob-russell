import express from 'express';
import cors from 'cors';
import schedule from "node-schedule";
import { checkConversations } from './utils/checkConversations';

const app = express();
app.options('*', cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const PORT = 3021;

const allowedOrigins = ['http://localhost:5173', 'https://ultim-admin-dashboard.web.app', 'https://ultim-admin-dashboard.firebaseapp.com', 'https://dashboard.ultim.pro', 'https://ultim.pro', 'https://trasnferchat-1336.twil.io/transferChat', 'https://trasnferchat-1336.twil.io', 'https://ultim.pro/dashboard/carestream/chat-carestream'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.options('*', cors());

// schedule.scheduleJob('*/1 * * * *', checkConversations); // Cada minuto
// schedule.scheduleJob("0 * * * *", checkConversations); // Cada hora

schedule.scheduleJob("*/1 * * * *", async () => {
  console.log("Running cron job...");
  await checkConversations();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});