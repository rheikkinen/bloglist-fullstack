const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('favoriteBlog', () => {
    test('returns a blog with the most likes', () => {
        const favorite = listHelper.favoriteBlog(helper.listWithManyBlogs)
        expect(favorite.title).toBe('Canonical string reduction')
        expect(favorite.author).toBe('Edsger W. Dijkstra')
        expect(favorite.likes).toBe(12)
    })
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('of list with one blog is calculated correctly', () => {
        expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(10)
    })

    test('of list with many blogs is calculated correctly', () => {
        expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(36)
    })
})