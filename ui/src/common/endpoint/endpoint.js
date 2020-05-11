import queryString from 'query-string';
import _ from 'lodash';

import api from './api';
import {Interface, AbstractClass} from '../lang/implementations';
import {PATHS, METHOD_NAMES} from './endpoint-constants';

// Interface for implementing APIs
let ApiInterface = Interface(
    METHOD_NAMES
);

// Abstract API class. Abstract methods are 'get', 'post'
// Methods are left for concrete class implementation
class AbstractAPI extends AbstractClass(ApiInterface, [
    'get',
    'post'
]) {}

class ImplementationAPI extends AbstractClass(AbstractAPI, []) {
    searchMovies = (params = {}) => {
        return this.get(PATHS.SEARCH_MOVIE, params);
    };
}

class HttpBasedAPI extends ImplementationAPI {
    _url(baseUrl, path, params) {
        const query = _.isEmpty(params) ? '' : `?${queryString.stringify(params)}`;
        return `${baseUrl}/${path}${query}`;
    }

    get(path, params) {
        const baseUrl = 'http://localhost:8080';
        const url = this._url(baseUrl, path, params);
        return api.get(url);
    }

    post(path, payload, params) {
        const baseUrl = 'http://localhost:8080';
        const url = this._url(baseUrl, path, params);
        return api.get(url, payload);
    }
}

let httpApi;
let Endpoint = new Proxy({api}, {
    get: function(obj, prop) {
        if (prop === 'api') {
            if (!httpApi) {
                httpApi = new HttpBasedAPI();
            }

            return httpApi;
        }

        return obj[prop];
    }
});

export default Endpoint;