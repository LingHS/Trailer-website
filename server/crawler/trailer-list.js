const puppeteer = require('puppeteer')
const url = `https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0`

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;
(async () => {
    console.log('start visit the target page')
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUniyl: 'networkdle2'
    })
    await sleep(3000)
    await page.waitForSelector('.more')
    for (let i = 0; i < 1; i++) {
        await sleep(3000)
        await page.click('.more')
    }
    const result = await page.evaluate(() => {
        var $ = window.$
        var items = $('.list-wp .list a')
        var links = []
        if (items.length >= 1) {
            items.each((index, item) => {
                let it = $(item)
                let doubanId = it.find('div').data('id')
                let title = it.find('img').attr('alt')
                let rate = Number(it.find('p strong').text())
                let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links
    })
    browser.close()
    console.log(result)
})()