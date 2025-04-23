import schedule from "node-schedule";
import { checkConversations } from './utils/checkConversations';

schedule.scheduleJob("0 * * * *", async () => {
  console.log("Running cron job...");
  await checkConversations();
});

//! Ejecutar el cronjob cada minuto (para pruebas)
// schedule.scheduleJob("* * * * *", async () => {
//   console.log("Running cron job...");
//   await checkConversations();
// });

console.log("🚀 Cronjob iniciado y ejecutándose en segundo plano...");