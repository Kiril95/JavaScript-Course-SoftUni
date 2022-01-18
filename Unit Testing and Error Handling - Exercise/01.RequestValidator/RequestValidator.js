function validator(request) {
    let methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let uriPattern = /^([\w\d\.]+|\*)$/g;
    let versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    let messagePattern = /^([^<>\\&'"]*)$/g;

    if(!methods.includes(request.method) || !request.hasOwnProperty('method')){
        throw new Error ('Invalid request header: Invalid Method');
    }
    if(!uriPattern.test(request.uri) || !request.hasOwnProperty('uri')) {
        throw new Error ('Invalid request header: Invalid URI');
    }
    if(!versions.includes(request.version) || !request.hasOwnProperty('version')) {
        throw new Error ('Invalid request header: Invalid Version');
    }
    if(!messagePattern.test(request.message) || !request.hasOwnProperty('message')) {
        throw new Error ('Invalid request header: Invalid Message');
    }

    return request;
}

validator({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
})