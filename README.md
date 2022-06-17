
# URL Shortener Bot for Telegram

This is a Telegram bot which can shorten or unshorten your URLs. It can also shorten your magnet links. 
> This Bot won't work in groups. So it will be a wise decision if you disallow groups from bot father. **Go to @BotFather > Bot Settings > Allow Groups? > Turn groups off**


## 🚀 Features

- Supports 11 URL Shortener
> https://tinyurl.com/app, https://cutt.ly/, https://is.gd/, https://da.gd/, https://v.gd/, https://vo.la/, https://bc.vc/, https://goolnk.com/, http://chilp.it/, https://clck.ru/
- Supports custom alias
- Magnet link Shortener
> http://mgnet.me/
- URL Unshortener
> https://www.npmjs.com/package/deshortify


## ⁉️ How to deploy

1. Fork this repo
2. Copy the sample.env contents
3. Create a new file named .env
4. Paste the sample.env contents in the .env file
5. From [BotFather](https://t.me/BotFather) make a new bot and copy the BOT_TOKEN and paste it in the .env
6. Write ```/mybots``` and select your bot and then **Edit Bot > Edit Commands** and paste the below Commands
```
unshorten - Unshorten a shortened URL (/unshorten <URL>) 🗜
features - Show the list of features 🚀
start - Check if I am alive 🤨
help - Get some help 🆘
```
7. Go to [TinyUrl](https://tinyurl.com/app), [Cuttly](https://cutt.ly/), [Vola](https://vo.la/), [Bcvc](https://bc.vc/) and sign up to get an api key
8. Copy the api keys and paste them in the .env file
9. Press ```Commit New File```
10. Go to [Replit](https://replit.com/signup?from=landing) and signup with your github account
11. Press ```+ Create``` button and select ```Import From Github``` button and select the forked repo
12. Go to the ```Secrets``` tab
![Secrets](https://telegra.ph/file/e2565dd6e2ea7ab792f90.png)
13. Add the .env keys and values one by one and click ```Add new Secret```
![Adding Secret](https://telegra.ph/file/32b386ed7afea6270af7e.png)
14. After adding all 5 Secrets it should look like this 
![Example](https://telegra.ph/file/17303148f87a74739313b.png)
15. Press the ```Run``` button and you should see something like this in the console
![Console Example](https://telegra.ph/file/63cfa0b6ad0e6dbcf869a.png)
16. Copy the url from the browser preview tab
![URL](https://telegra.ph/file/5159ec265faa4f3bcfa90.png)
> Add the url in a cron job website to prevent replit from going to sleep
17. Go to [Cron-job](https://cron-job.org/en/) and sign up
18. Then go to the ```Cronjobs``` tab and click ```Create Cronjob``` button
19. Give it a title and paste the copied replit url in the ```URL``` field then change the **Execution Schedule** to ```Every 1 minute(s)```
![Change execution time](https://telegra.ph/file/0956f42c048ff09c00252.png)
20. Then press create done now just check the bot it should work fine 24/7

    
## Screenshots

![App Screenshot](https://telegra.ph/file/ded190af77245cb7adcac.png)
![App Screenshot](https://telegra.ph/file/2070ac6a9fa56db3f7b6d.png)

## Feedback

If you have any feedback or any suggestions, please reach out to me at [Bipul Dey](https://t.me/bipuldey19)
Feel free to give Pull Requests and Bug Report

🖤 _Please give this repo a star if you like it. This will encourage me to do more works like this _

