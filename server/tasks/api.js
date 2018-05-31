// const url = `http://api.douban.com/v2/movie/subject/1764796 `
const rp = require('request-promise-native')

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
};
//豆瓣ａｐｉ
(async () => {
    let movies = [{
            doubanId: 26861685,
            title: '红海行动',
            rate: 8.4,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2514119443.jpg'
        },
        {
            doubanId: 26990609,
            title: '华盛顿邮报',
            rate: 8.2,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2505577378.jpg'
        }
    ]
    movies.map(async movie => {
        let movieData = await fetchMovie(movie)
        try {
            movieData = JSON.parse(movieData)
            console.log(movieData.genres)
            console.log(movieData.summary)
        } catch (err) {
            console.log(err)
        }

    })
})()