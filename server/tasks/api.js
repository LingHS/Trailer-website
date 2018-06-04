// const url = `http://api.douban.com/v2/movie/subject/1764796 `
const rp = require('request-promise-native')
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
};
//豆瓣ａｐｉ
(async () => {
    let movies = await Movie.find({
        $or: [{
                summary: {
                    $exists: false
                }
            },
            {
                summary: null
            },
            {
                title: ''
            },
            {
                summary: ''
            }
        ]
    })
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i]
        let movieData = await fetchMovie(movie)
        if (movieData) {
            let tags = movieData.tags || []
            movie.tags = tags
            movie.summary = movieData.summary || ''
            movie.title = movieData.alt_title || movie.title || ''
            movie.rawTitle = movieData.rawTitle || movieData.title || ''
            if (movieData.attrs) {
                movie.movieTypes = movieData.attr.movie_type || []
                movie.movieTypes.forEach(async item => {
                    let cat = await Category.findOne({
                        name: item
                    })
                    if (!cat) {
                        cat = new Category({
                            name: item,
                            movies: [movie._id]
                        })
                    } else {
                        if (cat.movies.indexOf(movie._id) === -1) {
                            cat.movies.push(movie._id)
                        }
                    }
                    await cat.save()
                })
                let dates = movieData.atrs.pubdate || []
                let pubdates = []
                dates.map(item => {
                    if (item && item.split('(').length > 0) {
                        let parts = item.split('(')
                        let date = parts[0]
                        let country = parts
                        let country = 'weizhi'
                        /*6月4日　20:37 */
                    }
                })
            }
        }
    }
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