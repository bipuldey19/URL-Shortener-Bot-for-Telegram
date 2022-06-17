
# URL Shortener Bot for Telegram

This is a Telegram bot which can shorten or unshorten your URLs. It can also shorten your magnet links. 
> This Bot won't work in groups. So it will be a wise decision if you disallow groups from bot father. **Go to @BotFather > Bot Settings > Allow Groups? > Turn groups off**


## 🚀 Features

- Supports 11 URL Shortener
> tinyurl.com, cutt.ly, ~~1pt.co~~, is.gd, da.gd, v.gd, vo.la, bc.vc, goolnk.com, chilp.it, clck.ru
- Supports custom alias
- Magnet link Shortener
> mgnet.me
- URL Unshortener
> [Deshortify](https://www.npmjs.com/package/deshortify)

<details>
    <summary><h2>⁉️ How to deploy</h2></summary>
<ol>
<li>Fork this repo</li>
<li>Copy the sample.env contents</li>
<li>Create a new file named .env</li>
<li>Paste the sample.env contents in the .env file</li>
<li>From <a href="https://t.me/BotFather">BotFather</a> make a new bot and copy the BOT_TOKEN and paste it in the .env</li>
<li>Write <code>/mybots</code> and select your bot and then **Edit Bot > Edit Commands** and paste the below Commands</li>
<pre>
unshorten - Unshorten a shortened URL (/unshorten <URL>) 🗜
features - Show the list of features 🚀
start - Check if I am alive 🤨
help - Get some help 🆘
</pre>
<li>Go to <a href="https://tinyurl.com/app">TinyUrl</a>, <a href="https://cutt.ly/">Cuttly</a>, <a href="https://vo.la/">Vola</a>, <a href="https://bc.vc/">Bcvc</a> and sign up to get an api key</li>
<li>Copy the api keys and paste them in the .env file</li>
<li>Press <code>Commit New File</code></li>
<li>Go to <a href="https://replit.com/signup?from=landing">Replit</a> and signup with your github account</li>
<li>Press <code>+ Create</code> tab</li>
<li>Press <code>Import from Github</code> and select the forked repo</li>
<li>Go to the Secrets tab</li>
</br>
<p align="left">
    <img src="https://telegra.ph/file/e2565dd6e2ea7ab792f90.png">
</p>
<li> Add the .env keys and values one by one and click <code>Add new Secret</code></li> </br>
<p align="left">
    <img src="https://telegra.ph/file/32b386ed7afea6270af7e.png">
</p>
<li> After adding all 5 Secrets it should look like this</li> </br>
<p align="left">
    <img src="https://telegra.ph/file/17303148f87a74739313b.png">
</p>
<li> Press the <code>Run</code> button and you should see something like this in the console</li></br>
<p align="left">
    <img src="https://telegra.ph/file/63cfa0b6ad0e6dbcf869a.png">
</p>
<li> Copy the url from the browser preview tab</li></br>
<p align="left">
    <img src="https://telegra.ph/file/5159ec265faa4f3bcfa90.png">
</p>
<blockquote>Add the url in a cron job website to prevent replit from going to sleep</blockquote>
<li> Go to <a href="https://cron-job.org/en/">Cron-job</a> and sign up</li>
<li> Then go to the <code>Cronjobs</code> tab and click <code>Create  Cronjob</code> button</li>
<li> Give it a title and paste the copied replit url in the <code>URL</code> field then change the <b>Execution Schedule</b> to <code>Every 1 minute(s)</code> </li></br>
<p align="left">
    <img src="https://telegra.ph/file/0956f42c048ff09c00252.png">
</p>
<li> Then press create done now just check the bot it should work fine 24/7</li>
</ol>
</details>

    
## Screenshot

<img src="https://telegra.ph/file/ded190af77245cb7adcac.png"></img>

## Feedback

If you have any feedback or any suggestions, please reach out to me at [Bipul Dey](https://t.me/bipuldey19)

Feel free to give Pull Requests and Bug Report

🖤 __Please give this repo a star if you like it. This will encourage me to do more works like this__

