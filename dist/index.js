"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const checkConversations_1 = require("./utils/checkConversations");
const app = (0, express_1.default)();
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 3021;
const allowedOrigins = ['http://localhost:5173', 'https://ultim-admin-dashboard.web.app', 'https://ultim-admin-dashboard.firebaseapp.com', 'https://dashboard.ultim.pro', 'https://ultim.pro', 'https://trasnferchat-1336.twil.io/transferChat', 'https://trasnferchat-1336.twil.io', 'https://ultim.pro/dashboard/carestream/chat-carestream'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.options('*', (0, cors_1.default)());
// schedule.scheduleJob('*/1 * * * *', checkConversations); // Cada minuto
// schedule.scheduleJob("0 * * * *", checkConversations); // Cada hora
node_schedule_1.default.scheduleJob("*/1 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running cron job...");
    yield (0, checkConversations_1.checkConversations)();
}));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
