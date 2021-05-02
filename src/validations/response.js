const config = {
    statusCode: {
        OK: 200,
        Internal_Server_Error: 500,
        Not_Found: 404,
        Forbidden: 403,
        Bad_Request: 400,
        Found: 302
    }
}

class Response {
    static found(res, data={}, message='Found') {
        return res.status(config.statusCode.found).json({ status: config.statusCode.found, statusMessage: message, result: {...data}});
     }
 
     static notFound(res, data={}, message = 'Not Found') {
         return res.status(config.statusCode.Not_Found).json({ status: config.statusCode.Not_Found, statusMessage: message,  result: {...data} });        
     }
 
     static success(res,  data={}, message = 'OK') {
         return res.status(config.statusCode.OK).json({ status: config.statusCode.OK, statusMessage: message,  result: {...data} });
     }
 
     static forbidden(res,  data={}, message = 'OK') {
         return res.status(config.statusCode.Forbidden).json({ status: config.statusCode.Forbidden, statusMessage: message, result: {...data} });
     }
 
     static serverError(res,  data={}, message = 'Internal Server Error') {
         return res.status(config.statusCode.Internal_Server_Error).json({ status: config.statusCode.Internal_Server_Error, message: message, result: {...data} });
     }
}
export default Response;