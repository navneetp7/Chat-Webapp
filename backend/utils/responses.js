const response = (req, status, res = '') => {
    let desc = "";
    switch (status) {
        case 200:
            desc = 'Ok'
            break
        case 201:
            desc = 'Created'
            break
        case 400:
            desc = 'Bad Request'
            break
        case 401:
            desc = 'Unauthorized'
            break
        case 404:
            desc = 'Not Found'
            break
        case 500:
            desc ='Internal Server Error'
            break
        default:
            desc = ''
    }

    const isObject=(data)=>{ 
        return !!data && data.constructor === Object
    }

    const res ={
        status: status,
        description: desc,
        res :isObject(res)? [res]:res
    }

    res.status(status).json(res);

};