const { createReadStream } = require("fs");
const path = require("path");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const axios = require("axios");
require("dotenv").config();

const cryptoToken = process.env.CRYPTO_TOKEN;

const bot = new Telegraf(process.env.BOT_TOKEN);

const helpMEssage = `
Help text is: 
/start - start the bot
/help - help refference
/print - the print command can reply your message
/cities - show you list of the great city in the world
/crypto - get curent price of crypto currency
`;

bot.start((ctx) => {
  ctx.sendChatAction("typing");

  ctx.reply("Hello I am Print Bot");
  ctx.reply(helpMEssage);
});
bot.help((ctx) => {
  ctx.sendChatAction("typing");

  ctx.reply(helpMEssage);
});

bot.command("print", (ctx) => {
  ctx.sendChatAction("typing");

  const msg = ctx.message.text;
  const listOfMsg = msg.split(" ");

  let message = "";
  if (listOfMsg.length == 1) {
    message = "You said print!";
  } else {
    message = listOfMsg.slice(1).join(" ");
  }

  ctx.reply(message);
});

bot.command("cities", (ctx) => {
  ctx.sendChatAction("typing");

  const cityMEssage = `
    /Tehran - Iran
/NewYork - USA
/Hongkong - China
/Dubai - UAE 
/Veniz - Italy
`;

  ctx.reply(cityMEssage);
});

bot.command(["Tehran", "tehran"], (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(path.join(__dirname, "cities", "tehran.jpeg")),
    },
    { reply_to_message_id: ctx.message.message_id }
  );
});
bot.command(["Dubai", "dubai"], (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(path.join(__dirname, "cities", "dobai.jpeg")),
    },
    { reply_to_message_id: ctx.message.message_id }
  );
});
bot.command(["NewYork", "newyork", "Newyork"], (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(path.join(__dirname, "cities", "newyork.jpeg")),
    },
    { reply_to_message_id: ctx.message.message_id }
  );
});
bot.command(["Hongkong", "hongkong", "HongKong"], (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(path.join(__dirname, "cities", "hongkong.jpg")),
    },
    { reply_to_message_id: ctx.message.message_id }
  );
});
bot.command(["veniz", "Veniz"], (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(path.join(__dirname, "cities", "veniz.jpeg")),
    },
    { reply_to_message_id: ctx.message.message_id }
  );
});

bot.on(message("document"), async (ctx) => {
  try {
    ctx.sendChatAction("upload_document");
    const docId = ctx.message.document.file_id;
    const link = await bot.telegram.getFileLink(docId);
    ctx.reply("Your download link: " + link, {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (error) {
    ctx.reply(error?.message ?? error?.description ?? "some error happend");
  }
});
bot.on(message("photo"), async (ctx) => {
  try {
    ctx.sendChatAction("upload_photo");

    const photoId = ctx.message.photo[0].file_id;
    const link = await bot.telegram.getFileLink(photoId);
    ctx.reply("Your download link: " + link, {
      reply_to_message_id: ctx.message.message_id,
    });
  } catch (error) {
    ctx.reply(error?.message ?? error?.description ?? "some error happend");
  }
});

bot.on("sticker", (ctx) => {
  ctx.reply("👍");
});

bot.command("crypto", (ctx) => {
  ctx.sendChatAction("typing");
  bot.telegram.sendMessage(ctx.chat.id, "منوی اصلی", {
    reply_to_message_id: ctx.message.message_id,

    reply_markup: {
      inline_keyboard: [
        [{ text: "قیمت رمزارزها", callback_data: "pricing" }],

        [
          {
            text: "cryptoCompare",
            url: "https://www.cryptocompare.com/",
          },
        ],
      ],
    },
  });
});

bot.action("pricing", (ctx) => {
  ctx.sendChatAction("typing");
  ctx.answerCbQuery();
  ctx.deleteMessage();
  bot.telegram.sendMessage(
    ctx.chat.id,
    "لطفا یکی از ارزهای دیجیتال زیر را انتخاب کنید",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Bitcoin", callback_data: "BTC" },
            { text: "Ethereum", callback_data: "ETH" },
          ],
          [
            { text: "Binance USD", callback_data: "BUSD" },
            { text: "Solana", callback_data: "SOL" },
          ],
          [{ text: "منوی اصلی", callback_data: "mainMenu" }],
        ],
      },
    }
  );
});

bot.action(["BTC", "ETH", "BUSD", "SOL"], async (ctx) => {
  try {
    ctx.sendChatAction("typing");
    apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${ctx.match}&tsyms=USD&api_key=${cryptoToken}`;
    const data = await axios.get(apiUrl).then((res) => res.data);

    ctx.reply(`${Object.keys(data)[0]}: ${Object.values(data)[0]}`);
  } catch (error) {
    ctx.reply(error.message);
  }

  ctx.answerCbQuery();
});

bot.action("mainMenu", (ctx) => {
  ctx.sendChatAction("typing");
  ctx.answerCbQuery();
  ctx.deleteMessage();
  bot.telegram.sendMessage(
    ctx.chat.id,
    "لطفا یکی از ارزهای دیجیتال زیر را انتخاب کنید",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "قیمت رمزارزها", callback_data: "pricing" }],

          [
            {
              text: "cryptoCompare",
              url: "https://www.cryptocompare.com/",
            },
          ],
        ],
      },
    }
  );
});

bot.launch();
