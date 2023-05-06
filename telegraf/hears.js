const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.hears("nodejs", (ctx) => {
//   ctx.reply("یک ران تایم جاوااسکریپت برای توسصه سمت سرور است");
// });

bot.hears(/.nodejs./i, (ctx) => {
  ctx.reply("یک ران تایم جاوااسکریپت برای توسصه سمت سرور است");
});

bot.hears(/(bad|bishoor|ahmagh|biadab)/, (ctx) => {
  ctx.deleteMessage();
  ctx.reply("اخطار: شما نباید از کلمات رکیک استفاده کنید");
});

bot.launch();
