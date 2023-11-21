const buildOptions = (data) => {
    const options = {}

    if(data){
        options.headets = {
            'Content-Type': 'application/json'
        }

        options.body = JSON.stringify(data)
    }

    const token = localStorage.getItem('accessToken');

    if(token){
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        }
    }

    return options
}

const request = async (method, url, data) => {

    const responce = await fetch(url, {
        method,
        ...buildOptions(data)
    })

    if(responce.status === 204){
        return {}
    }

    const result = await responce.json()

    if(!responce.ok){
        throw Error(result)
    }
    return result
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const PUT = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
export const patch = request.bind(null, "PATCH");

