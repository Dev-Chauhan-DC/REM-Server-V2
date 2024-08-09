class ResponseHelper {
    constructor() {
    }

    ok200(message, data) {
        return {
            message: message ? message : "Success",
            success: true,
            data: data ? data : null
        }
    }

    created201(message, data) {
        return {
            message: message ? message : "Created",
            success: true,
            data: data ? data : null
        }
    }

    badRequest400(message, data) {
        return {
            message: message ? message : "Bad Request",
            success: false,
            data: data ? data : null
        }
    }

    unauthorized401(message, data) {
        return {
            message: message ? message : "Unauthorized",
            success: false,
            data: data ? data : null
        }
    }

    forbidden403(message, data) {
        return {
            message: message ? message : "Forbidden",
            success: false,
            data: data ? data : null
        }
    }

    notFound404(message, data) {
        return {
            message: message ? message : "Not Found",
            success: false,
            data: data ? data : null
        }
    }

    methodNotAllowed405(message, data) {
        return {
            message: message ? message : "Method Not Allowed",
            success: false,
            data: data ? data : null
        }
    }

    internalServerError500(message, data) {
        return {
            message: message ? message : "Internal Server Error",
            success: false,
            data: data ? data : null
        }
    }
}



module.exports = ResponseHelper;


