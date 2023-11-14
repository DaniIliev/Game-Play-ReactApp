const buildOptions = (data) => {
    const options = {}

    if(data){
        options.headets = {
            'Content-Type': 'application/json'
        }

        options.body = JSON.stringify(data)
    }

    return options
}

const request = async (method, url, data) => {
    const responce = await fetch(url, {
        method,
        ...buildOptions(data)
    })

    const result = await responce.json()


    return result
}

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const PUT = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");
export const patch = request.bind(null, "PATCH");

