import * as request from '../lib/request'


const baseUrl = 'http://localhost:3030/data/comments'; 

export const create = async (gameId, comment) => {
    const newComment = await request.get(`${baseUrl}`,{
        gameId,
        comment
    })

    return newComment
}