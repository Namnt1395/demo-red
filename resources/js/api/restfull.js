import request from '../utils/request';

class Restfull {
    constructor(uri) {
        this.uri = uri;
    }

    list(query) {
        return request({
            url: '/' + this.uri,
            method: 'get',
            params: query,
        })
    }
    getOne(id) {
        return request({
            url: '/' + this.url + '/'+ id,
            method: 'get'
        })
    }
    store(resource) {
        console.log("resource...", resource)
        return request({
            url: '/' + this.uri,
            method: 'post',
            data: resource,
        });
    }
    update(id, resource) {
        return request({
            url: '/' + this.uri + '/' + id,
            method: 'put',
            data: resource,
        });
    }
    destroy(id) {
        return request({
            url: '/' + this.uri + '/' + id,
            method: 'delete',
        });
    }
}

export {Restfull as default}
