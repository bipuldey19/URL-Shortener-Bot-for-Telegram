require("dotenv").config({
    path: "./.env",
  });
  const TelegramBot = require("node-telegram-bot-api"); //Telegram bot api
  const express = require("express"); //For web app to keep the bot alive
  const axios = require("axios"); //For making http requests
  const Deshortifier = require("deshortify"); //For de-shortening urls
  let deshortifier = new Deshortifier({ verbose: true });
  const app = express();
  
  app.get("/", (request, response) => {
    response.send("Bot is running!!! ⚙️");
  });
  
  const token = process.env.BOT_TOKEN; //Telegram bot token
  const tinyurlApi = process.env.TINYURL_API; //TinyURL API
  const cuttlyApi = process.env.CUTTLY_API; //Cuttly Token
  
  const bot = new TelegramBot(token, {
    polling: true,
  });
  
  bot.on("message", async (msg) => {
    // Main Shotener Code
    if (
      !msg.text.toString().toLowerCase().includes("/unshorten") &&
      (msg.text.toString().toLowerCase().includes("https") ||
      msg.text.toString().toLowerCase().includes("http"))
    ) {
      var {message_id} = await bot.sendMessage(msg.chat.id, "⚙️ *Shortening your URL...*\n\n⏱️ _Please wait. It may take a while..._", {
        parse_mode: "Markdown",
        });
      var reqURL = msg.text.toString();
      var splitURL = reqURL.split(" ");
      var url = splitURL[0];
      var alias = splitURL[1];
  
      var chilpURL = `http://chilp.it/api.php?url=${url}`; //Without Custom Alias
      var clckruURL = `https://clck.ru/--?url=${url}`;
      var goolnkURL = `https://goolnk.com/api/v1/shorten`;
  
      var tinyURL = `https://api.tinyurl.com/create`; //With Custom Alias
      var cuttlyURL = `https://cutt.ly/api/api.php?key=${cuttlyApi}&short=${url}`;
      var ptcoURL = `https://api.1pt.co/addURL?long=${url}`;
      var dagdURL = `https://da.gd/s?url=${url}`;
      var isgdURL = `https://is.gd/create.php?format=json&url=${url}`;
  
      if (alias != undefined) {
        cuttlyURL += `&name=${alias}`;
        ptcoURL += `&short=${alias}`;
        dagdURL += `&shorturl=${alias}`;
        isgdURL += `&shorturl=${alias}`;
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
  
      var getUrls = [chilpURL, clckruURL, cuttlyURL, ptcoURL, dagdURL, isgdURL];
  
      var axiosReq = async function () {
        var results = [];
        for (var i = 0; i < getUrls.length; i++) {
          var getResponse = await axios.get(getUrls[i]);
          var getData = getResponse.data;
          results.push(getData);
        }
        var golnkResponse = await axios.post(goolnkURL, {
          url: url,
        });
        var golnkData = golnkResponse.data.result_url;
        results.push(golnkData);
        var tinyResponse = await axios.post(tinyURL, tinyOptions);
        var tinyData = tinyResponse.data.data.tiny_url;
        results.push(tinyData);
        return results;
      };
  
      axiosReq()
        .then(async (res) => {
  
          // Shortened URLs
          var Tinyurl = res[7];
          var Cuttly = res[2].url.shortLink;
          var Isgd = res[5].shorturl;
          var Dagd = res[4].toString().replace('\n', '');
          var Goolnk = res[6];
          var Chilpit = res[0];
          var Clckru = res[1];
          var Ptco = `https://1pt.co/${res[3].short}`;
  
          var urlResponse =
            "✅ *URL shortened Successfully!*\n\n💠 *URL: * " + url +
            "\n\n🔰 *Shortend URLs:* \n\n" +
            "💠 *Tinyurl:* " + "`" + Tinyurl + "`\n" +
            "💠 *Cuttly:* " + "`" + Cuttly + "`\n" +
            "💠 *1ptco:* " + "`" + Ptco + "`\n" +
            "💠 *Isgd:* " + "`" + Isgd + "`\n" +
            "💠 *Dagd:* " + "`" + Dagd + "`\n" +
            "💠 *Goolnk:* " + "`" + Goolnk + "`\n" +
            "💠 *Chilpit:* " + "`" + Chilpit + "`" +
            "💠 *Clckru:* " + "`" + Clckru + "`";
  
            await bot.sendChatAction(msg.chat.id, "typing");
            await bot.editMessageText(urlResponse, {
              chat_id: msg.chat.id,
              message_id: message_id,
              parse_mode: "Markdown",
            });
        })
        .catch(async (err) => {
          var errorResponse =
            "❌ *URL shortend Failed!*\n\n💠 *URL:* " +
            url +
            "\n💠 *Error:* Invalid URL/Alias!\n💠 Get help by typing /help";
  
          await bot.sendChatAction(msg.chat.id, "typing");
          bot.sendMessage(msg.chat.id, errorResponse, {
            parse_mode: "Markdown",
          });
          console.log(err);
        });
    }
  
    // Start Message
    else if (msg.text.toString().includes("/start")) {
      bot.sendMessage(
        msg.chat.id,
        "👋🏻 *Hey burh! I am alive!*\n\nGive me a URL to shorten and I will do the rest! 🤖\n\n_Type /help for more info!_", {
          parse_mode: "Markdown",
          }
      );
    }
  
    // Help Message
    else if (msg.text.toString().includes("/help")) {
      var help = "🟢 *HELP :*\n\n⭕ Check if I am alive by typing /start\n\n⭕ Give me a valid URL to shorten and I will do the rest!\n\n*Example:*\n `https://www.google.com`\n\n*Example with Custom Alias:*\n `https://www.google.com google`\n\n⭕ For unshortening a shortened URL use /unshorten\n\n*Example:*\n `/unshorten https://tiny.one/abcdefg`\n\n⚠️ *Note :*\n\n1️⃣ *Custom Alias* is optional.\n2️⃣ Only *TinyURL, Cuttly, 1ptco, Isgd, Dagd* supports *Custom Alias*.\n3️⃣ *Dagd* supports 10 character *Custom Alias*.\n4️⃣ On *error* try to change the *Custom Alias*.\n5️⃣ Check if the URL contains *https://* or *http://*. Otherwise I can't shorten the URL.";
      bot.sendMessage(msg.chat.id, help, {
        parse_mode: "Markdown",
      });
    }
  
    // Unshorten URL
    else if (msg.text.toString().toLowerCase().includes("/unshorten")) {
      var emptyCheck = msg.text.toString().split(" ");
      if (emptyCheck.length == 2){
      console.log(emptyCheck)
      var toDeshortify = msg.text.toString().replace("/unshorten", "");
      bot.sendMessage(msg.chat.id, "⚙️ *Unshortening your URL...*", {
        parse_mode: "Markdown",
      });
      deshortifier.deshortify(toDeshortify).then(async url => {
        await bot.sendChatAction(msg.chat.id, "typing");
        await bot.editMessageText("✅ *URL unshortened Successfully!*\n\n🔰 *Unshortened URL:*\n `" + url + "`", {
          chat_id: msg.chat.id,
          message_id: msg.message_id + 1,
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
        });
      }).catch(err => {
          console.log(err)
          bot.sendMessage(msg.chat.id, '⚠️ *Invalid URL!*', {
            parse_mode: "Markdown",
          }
          )
        })
      }
      else{
        bot.sendMessage(msg.chat.id, "⚠️ *Please give a URL after /unshorten*", {
          parse_mode: "Markdown",
          });
      }
    }
  
    // Text filter
    else{
        var notMine = `😓 I'm not a bot for chat! Give me a *valid URL* to shorten. I can do nothing but *shorten the URL*.\n\n⚠️ _But if you gave me a valid URL but I can't identify it as a URL then see /help._`;
          bot.sendMessage(msg.chat.id, notMine, {
              parse_mode: "Markdown",
          });
    }
  });
  
  app.listen(80);
  