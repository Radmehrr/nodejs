const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("text", (ctx) => {
  ctx.reply("You send me text");
});

bot.on("voice", (ctx) => {
  ctx.reply("You send me voice");
});

bot.on("video", (ctx) => {
  ctx.reply("You send me video");
});

bot.on("sticker", (ctx) => {
  ctx.reply("You send me sticker");
});

bot.on("photo", (ctx) => {
  ctx.reply("You send me photo");
});

bot.on("new_chat_photo", (ctx) => {
  ctx.reply("admin changed the group photo");
});

bot.on("new_chat_members", (ctx) => {
  const username =
    ctx.message.new_chat_member.username ??
    ctx.message.new_chat_member.first_name;
  ctx.reply(`wellcome to group ${username}`);
});

bot.launch();
