const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Command Start
// bot.start((ctx) => {
//   //   ctx.reply(`سلام ${ctx.chat.first_name} به ربات رادمهر خوش آمدید`);
//   console.log(ctx.chat.first_name);
//   ctx.telegram.sendMessage(ctx.chat.id, "سلام به ربات رادمهر خوش آمدید");
// });

// bot.help((ctx) => {
//   ctx.reply(
//     "برای استفاده کردن از ربات راهنمای زیر را به طور کامل مطالعه کنید."
//   );
// });

// bot.settings((ctx) => {
//   ctx.reply(
//     "یک لیست از تنظیمات در اختیار شما قرار دارد و میتوانید استفاده کنید"
//   );
// });

bot.command("start", (ctx) =>
  ctx.reply(`سلام ${ctx.chat.first_name} به ربات رادمهر خوش آمدید`)
);

bot.command("help", (ctx) =>
  ctx.reply("برای استفاده کردن از ربات راهنمای زیر را به طور کامل مطالعه کنید.")
);

bot.command(["settings", "setting", "Settings", "Settings", "tools"], (ctx) =>
  ctx.reply(
    `یک لیست از تنظیمات در اختیار شما قرار دارد و میتوانید استفاده کنید
    1- set username
    2- set theme color
    3- set profile image
    `
  )
);

bot.command("nodejs", (ctx) =>
  ctx.reply("nodejs in runtime invironment for run javascript on server")
);

bot.launch();
