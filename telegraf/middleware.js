const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use((ctx, next) => {
  const msg = ctx.message.text;
  if (msg === "radmehr") return next();
  return ctx.reply("msg is not radmehr");
});

bot.hears("radmehr", (ctx) => ctx.reply("Welcome radmehr"));

bot.launch();
