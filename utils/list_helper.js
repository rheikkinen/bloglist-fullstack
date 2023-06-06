const totalLikes = (blogs) => {
    const initialValue = 0
    const sumOfLikes = blogs.reduce(
        (sum, blog) => sum + blog.likes,
        initialValue
    )
    return sumOfLikes
}

module.exports = { totalLikes }