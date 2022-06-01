require("dotenv").config({
  path: "./.env",
});
const { Telegraf, Markup } = require("telegraf"); // importing telegraf.js
const express = require("express"); //For web app to keep the bot alive
const axios = require("axios"); //For making http requests
const Deshortifier = require("deshortify"); //For de-shortening urls
let deshortifier = new Deshortifier({ verbose: true });
const app = express();

app.get("/", (request, response) => {
  response.send("Bot is running!!! ⚙️");
});
if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError("BOT_TOKEN must be provided!");
}
const bot = new Telegraf(process.env.BOT_TOKEN); //Telegram bot token
const tinyurlApi = process.env.TINYURL_API; //TinyURL API
const cuttlyApi = process.env.CUTTLY_API; //Cuttly Token
const volaApi = process.env.VOLA_API; //Vola Token
const bcvcApi = process.env.BCVC_API; //Bcvc Token

bot.on("message", async (ctx) => {
  // Main Shotener Code
  console.log(ctx.message.text);
  if (
    ctx.message.text != undefined &&
    ctx.message.text.toString().charAt(0) != "/" &&
    !ctx.message.text.toString().toLowerCase().includes("magnet:?") &&
    (ctx.message.text.toString().toLowerCase().includes("https") ||
      ctx.message.text.toString().toLowerCase().includes("http"))
  ) {
    var { message_id } = await ctx.replyWithMarkdown(
      "⚙️ *Shortening your URL...*\n\n⏱️ _Please wait. It may take a while..._"
    );
    var reqURL = ctx.message.text.toString();
    var splitURL = reqURL.split(" ");
    var url = splitURL[0];
    var alias = splitURL[1];

    var chilpURL = `http://chilp.it/api.php?url=${url}`; //Without Custom Alias
    var clckruURL = `https://clck.ru/--?url=${url}`;
    var goolnkURL = `https://goolnk.com/api/v1/shorten`;
    var bcvcURL = `https://bc.vc/api.php?key=${bcvcApi}&uid=422311&url=${url}`;

    var tinyURL = `https://api.tinyurl.com/create`; //With Custom Alias
    var cuttlyURL = `https://cutt.ly/api/api.php?key=${cuttlyApi}&short=${url}`;
    // var ptcoURL = `https://api.1pt.co/addURL?long=${url}`;
    var volaURL = `https://vo.la/api/?key=${volaApi}&url=${url}`;
    var dagdURL = `https://da.gd/s?url=${url}`;
    var isgdURL = `https://is.gd/create.php?format=json&url=${url}`;
    var vgdURL = `https://v.gd/create.php?format=json&url=${url}`;

    if (alias != undefined) {
      cuttlyURL += `&name=${alias}`;
      // ptcoURL += `&short=${alias}`;
      volaURL += `&custom=${alias}`;
      dagdURL += `&shorturl=${alias}`;
      isgdURL += `&shorturl=${alias}`;
      vgdURL += `&shorturl=${alias}`;
      var tinyOptions = {
        api_token: tinyurlApi,
        url: url,
        domain: "tiny.one",
        alias: alias,
      };
    } else {
      var tinyOptions = {
        api_token: tinyurlApi,
        url: url,
        domain: "tiny.one",
      };
    }

    var getUrls = [
      chilpURL,
      clckruURL,
      cuttlyURL,
      // ptcoURL,
      volaURL,
      bcvcURL,
      dagdURL,
      isgdURL,
      vgdURL,
    ];

    var axiosReq = async function () {
      var results = [];

      // Get request for each url
      for (var i = 0; i < getUrls.length; i++) {
        try{
          var getResponse = await axios.get(getUrls[i]);
        var getData = getResponse.data;
        results.push(getData);
        await ctx.telegram.editMessageText(
          ctx.from.id,
          message_id,
          false,
          `⚙️ *Shortening your URL...*\n\n✅ *${results.length}* out of *10* shortened links ready...`,
          {
            parse_mode: "Markdown",
          }
        );
        }
        catch(err){
          console.log(err);
        }
      }
      // Post requestes
      var golnkResponse = await axios.post(goolnkURL, {
        url: url,
      });
      var golnkData = golnkResponse.data.result_url;
      results.push(golnkData);
      await ctx.telegram.editMessageText(
        ctx.from.id,
        message_id,
        false,
        `⚙️ *Shortening your URL...*\n\n✅ *${results.length}* out of *10* shortened links ready...`,
        {
          parse_mode: "Markdown",
        }
      );

      var tinyResponse = await axios.post(tinyURL, tinyOptions);
      var tinyData = tinyResponse.data.data.tiny_url;
      results.push(tinyData);
      await ctx.telegram.editMessageText(
        ctx.from.id,
        message_id,
        false,
        `⚙️ *Shortening your URL...*\n\n✅ *${results.length}* out of *10* shortened links ready...`,
        {
          parse_mode: "Markdown",
        }
      );

      return results;
    };

    axiosReq()
      .then(async (res) => {
        // Shortened URLs
        var Tinyurl = res[9];
        var Cuttly = res[2].url.shortLink;
        var Isgd = res[6].shorturl;
        var Vgd = res[7].shorturl;
        var Dagd = res[5].toString().replace("\n", "");
        var Bcvc = res[4];
        var Vola = res[3].short;
        var Goolnk = res[8];
        var Chilpit = res[0];
        var Clckru = res[1];
        // var Ptco = `https://1pt.co/${res[3].short}`;

        var title = res[2].url.title;

        var urlResponse =
          `✅ *URL shortened Successfully!*\n\n🔗 [${title}](${url})` +
          "\n\n🔰 *Shortended URLs :* \n\n" +
          "💠 *Tinyurl:* " + "`" + Tinyurl + "`\n" +
          "💠 *Cuttly:* " + "`" + Cuttly + "`\n" +
          // "💠 *1ptco:* " + "`" + Ptco + "`\n" +
          "💠 *Isgd:* " + "`" + Isgd + "`\n" +
          "💠 *Dagd:* " + "`" + Dagd + "`\n" +
          "💠 *Vgd:* " + "`" + Vgd + "`\n" +
          "💠 *Vola:* " + "`" + Vola + "`\n" +
          "💠 *Bcvc:* " + "`" + Bcvc + "`\n" +
          "💠 *Goolnk:* " + "`" + Goolnk + "`\n" +
          "💠 *Chilpit:* " + "`" + Chilpit + "`" +
          "💠 *Clckru:* " + "`" + Clckru + "`";

        await ctx.telegram.editMessageText(
          ctx.from.id,
          message_id,
          false,
          urlResponse,
          {
            parse_mode: "Markdown",
            // reply_markup: {
            //   inline_keyboard: [
            //     [
            //       {
            //         text: "🔗 Visit URL",
            //         url: url,
            //       },
            //     ],
            //   ],
            // }
          }
        );
      })
      .catch(async (err) => {
        var errorResponse =
          `❌ *URL shortening Failed!*\n\n🔗 [${title}](${url})` +
          url +
          "\n\n⚠️ *Error:* Invalid URL/Alias!\n _Or get /help_";

        await ctx.telegram.editMessageText(
          ctx.from.id,
          message_id,
          false,
          errorResponse,
          {
            parse_mode: "Markdown",
          }
        );
        console.log(err);
      });
  }

  // Start Message
  else if (ctx.message.text != undefined && ctx.message.text.toString().includes("/start")) {
    ctx.replyWithMarkdown(
      "👋🏻 *Hey burh! I am alive!*\n\nGive me a URL to shorten and I will do the rest! 🤖\n\n_Type /help for more info!_"
    );
  }

  // Help Message
  else if (ctx.message.text != undefined && ctx.message.text.toString().includes("/help")) {
    var help =
      "🟢 *HELP :*\n\n⭕ Check if I am alive by typing /start\n\n⭕ Give me a valid URL to shorten and I will do the rest!\n\n*Example:*\n `https://www.google.com`\n\n*Example with Custom Alias:*\n `https://www.google.com google`\n\n⭕ For unshortening a shortened URL use /unshorten\n\n*Example:*\n `/unshorten https://tiny.one/abcdefg`\n\n⚠️ *Note :*\n\n1️⃣ *Custom Alias* is optional.\n2️⃣ Only *TinyURL, Cuttly, Isgd, Dagd, Vgd, Vola* supports *Custom Alias*.\n3️⃣ *Dagd* supports 10 character *Custom Alias*.\n4️⃣ On *error* try to change the *Custom Alias*.\n5️⃣ Check if the URL contains *https://* or *http://*. Otherwise I can't shorten the URL.";
    ctx.replyWithMarkdown(help);
  }

  // All Features
  else if (ctx.message.text != undefined && ctx.message.text.toString().includes("/features")) {
    var features = `🚀 *All features of this URL Shortener Bot:*\n\n🅞🅝🅔\nCan shorten the URLs with 11 URL Shorteners. Available URL Shorteners are:\n*① TinyURL: *https://tinyurl.com/app/ _(Supports custom alias)_\n*② Cuttly: *https://cutt.ly/ _(Supports custom alias)_\n*③ 1ptco: *https://1pt.co/ _(Supports custom alias)_\n*④ Isgd: *https://is.gd/ _(Supports custom alias)_\n*⑤ Dagd: *https://da.gd/ _(Supports custom alias)_\n*⑥ Vgd: *https://v.gd/ _(Supports custom alias)_\n*⑦ Vola: *https://vo.la/ _(Supports custom alias)_\n*⑧ Bcvc: *https://bc.vc/\n*⑨ Goolnk: *https://goolnk.com/\n*⑩ Chilpit: *http://chilp.it/\n*⑪ Clckru: *https://clck.ru/\n_ *More URL Shorteners coming soon..._\n\n🅣🅦🅞\nCan shorten magnet links. Available Magnet Link Shortener:\n*① Mgnetme: *http://mgnet.me/\n\n🅣🅗🅡🅔🅔\nCan unshorten the URLs. Available URL Unshortener:\n*① Deshortify:* https://www.npmjs.com/package/deshortify\n\n🅗🅞🅦 🅣🅞 🅤🅢🅔\nSee /help for more info.`;
    ctx.replyWithMarkdown(features);
  }

  // Magnet link shortener
  else if (ctx.message.text != undefined && ctx.message.text.toString().includes("magnet:")) {
    var requestedMagnet = ctx.message.text.toString();
    var splitMagnet = requestedMagnet.split(" ");
    var magnet = splitMagnet[0];
    var magnetAlias = splitMagnet[1];
    var { message_id } = await ctx.replyWithMarkdown(
      "⚙️ *Shortening your Magnet Link...*\n\n⏱️ _Please wait. It may take a while..._"
    );
    if (magnetAlias == undefined) {
      function makeAlias(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
       }
       return result;
       }
      var alias = makeAlias(10);
      axios
        .get(
          `http://mgnet.me/api/create?&format=json&opt=${alias}&m=${magnet}`
        )
        .then(async (res) => {
          var magnetResponse = res.data.shorturl;
          var magnetResponseMessage = "✅ *Magnet Link shortened Successfully!*\n\n💠 *Magent Link :*\n```" +
          magnet +
          "```\n\n🔰 *Shortended URL : * " +
          "`" +
          magnetResponse +
          "`";
          ctx.telegram.editMessageText(
            ctx.from.id,
            message_id,
            false,
            magnetResponseMessage,
            {
              parse_mode: "Markdown",
            }
          );
        });
    }
    else {
      axios
        .get(
          `http://mgnet.me/api/create?&format=json&opt=${magnetAlias}&m=${magnet}`
        )
        .then(async (res) => {
          var magnetResponse = res.data.shorturl;
          var magnetResponseState = res.data.state;
          if (magnetResponseState == "success") {
          var magnetResponseMessage = "✅ *Magnet Link shortened Successfully!*\n\n💠 *Magent Link :*\n```" +
          magnet +
          "```\n\n🔰 *Shortended URL : * " +
          "`" +
          magnetResponse +
          "`";
          ctx.telegram.editMessageText(
            ctx.from.id,
            message_id,
            false,
            magnetResponseMessage,
            {
              parse_mode: "Markdown",
            }
          );
          }
          else {
            var magnetResponseLog = res.data.message;
            var magnetResponseMessage = "❌ *Magnet Link shortening Failed!*\n\n💠 *Magent URL:* " +
            magnet +
            "\n\n⚠️ *Error:* " +
            magnetResponseLog;
            ctx.telegram.editMessageText(
              ctx.from.id,
              message_id,
              false,
              magnetResponseMessage,
              {
                parse_mode: "Markdown",
              }
            );
          }
        })
    }
  }

  // Unshorten URL
  else if (ctx.message.text != undefined && ctx.message.text.toString().toLowerCase().includes("/unshorten")) {
    var emptyCheck = ctx.message.text.toString().split(" ");
    if (emptyCheck.length == 2) {
      var toDeshortify = ctx.message.text.toString().replace("/unshorten", "");
      var { message_id } = await ctx.replyWithMarkdown(
        "⚙️ *Unshortening your URL...*"
      );
      deshortifier
        .deshortify(toDeshortify)
        .then(async (url) => {
          await ctx.telegram.editMessageText(
            ctx.from.id,
            message_id,
            false,
            "✅ *URL unshortened Successfully!*\n\n"+`🔗 [Shoertened URL](${toDeshortify})`+"🔰 *Unshortened URL :*\n `" +
              url +
              "`",
            {
              parse_mode: "Markdown",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "🔗 Open in Browser",
                      url: url,
                    },
                  ],
                ],
              },
            }
          );
        })
        .catch((err) => {
          console.log(err);
          ctx.replyWithMarkdown("⚠️ *Invalid URL!*");
        });
    } else {
      ctx.replyWithMarkdown("⚠️ *Please give a URL after /unshorten*");
    }
  }

  // Text filter
  else {
    var notMine = `😓 I'm not a bot for chat! Give me a *valid URL* to shorten. I can do nothing but *shorten the URL*.\n\n⚠️ _But if you gave me a valid URL but I can't identify it as a URL then see /help._`;
    ctx.replyWithMarkdown(notMine);
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

app.listen(5000, () => console.log("🚀 Listening on port 5000!"));

//////////////////////Commands/////////////////////////
// unshorten - Unshorten a shortened URL (/unshorten <URL>) 🗜️
// features - Show the list of features 🚀
// start - Check if I am alive 🤨
// hlep - Get some help 🆘