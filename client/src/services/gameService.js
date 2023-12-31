import * as request from '../lib/request'

const baseUrl = 'http://localhost:3030/data/games'

export const getAll = async () => {
    const result = await request.get(baseUrl)

    return Object.values(result)
}

export const getOne = async (gameId) => {
    const result = await request.get(`${baseUrl}/${gameId}`)

    return result
}

export const create = async (data) => {
    const result = await request.post(baseUrl,data)

    return result
}

export const del = async (gameId) => {
    const result = await request.del(`${baseUrl}/${gameId}`)

    return result
}

export const put = async (gameId, data) => {
    const result = await request.PUT(`${baseUrl}/${gameId}`, data)

    return result
}