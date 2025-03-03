import schedule from "node-schedule";
import { checkConversations } from './utils/checkConversations';

// Ejecutar el cronjob cada 1 minuto
schedule.scheduleJob("0 * * * *", async () => {
  console.log("Running cron job...");
  await checkConversations();
});

console.log("🚀 Cronjob iniciado y ejecutándose en segundo plano...");