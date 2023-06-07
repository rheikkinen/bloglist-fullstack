const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce(
        (currentFavorite, blog) => {
            const favorite = blog.likes > currentFavorite.likes ? blog : currentFavorite
            return {
                title: favorite.title,
                author: favorite.author,
                likes: favorite.likes
            }
        }, blogs[0]
    )
}

module.exports = { totalLikes, favoriteBlog }