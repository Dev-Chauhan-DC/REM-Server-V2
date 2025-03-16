function ok200(message = "Success", data = null, meta = {}) {
    return {
        message: message,
        success: true,
        data: data,
        meta: meta
    }
}

function created201(message, data) {
    return {
        message: message ? message : "Created",
        success: true,
        data: data ? data : null
    }
}

function badRequest400(message, data) {
    return {
        message: message ? message : "Bad Request",
        success: false,
        data: data ? data : null
    }
}

function unauthorized401(message, data) {
    return {
        message: message ? message : "Unauthorized",
        success: false,
        data: data ? data : null
    }
}

function forbidden403(message, data) {
    return {
        message: message ? message : "Forbidden",
        success: false,
        data: data ? data : null
    }
}

function notFound404(message, data) {
    return {
        message: message ? message : "Not Found",
        success: false,
        data: data ? data : null
    }
}

function methodNotAllowed405(message, data) {
    return {
        message: message ? message : "Method Not Allowed",
        success: false,
        data: data ? data : null
    }
}

function internalServerError500(message, data) {
    return {
        message: message ? message : "Internal Server Error",
        success: false,
        data: data ? data : null
    }
}


module.exports = {
    ok200, internalServerError500,
    badRequest400, notFound404, methodNotAllowed405, forbidden403,
    unauthorized401, created201
};


