const puppeteer = require('puppeteer')
const Base = `https://movie.douban.com/subject/`
const doubanId = `6874741`
const videoBase = `https://movie.douban.com/trailer/226487/#content`
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
}).catch((err) => console.log(err));
(async () => {
    console.log('start visit the target page')
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(Base + doubanId, {
        waitUniyl: 'networkdle2'
    })
    await sleep(1000)
    //封面图
    const result = await page.evaluate(() => {
        var $ = window.$
        var it = $('.related-pic-video')
        if (it && it.length > 0) {
            var link = it.attr('href')
            var cover = it.find('img').attr('src')
            return {
                link,
                cover
            }
        }
        return {}
    })
    //视频
    let video
    if (result.link) {
        await page.goto(result.link, {
            waitUniyl: 'networkdle2'
        })
        await sleep(2000)
        video = await page.evaluate(() => {
            var $ = window.$
            var it = $('source')
            if (it && it.length > 0) {
                return it.attr('src')
            }
            return ''
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }
    browser.close()
    // console.log(result)
    process.send({
        data
    })
    process.exit(0)
})()