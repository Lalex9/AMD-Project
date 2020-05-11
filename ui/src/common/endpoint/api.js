const GET = 'get', POST = 'post';

const HEADERS = {
    ACCEPT: 'Accept',
    CONTENT_TYPE: 'Content-Type'
};

const RESPONSE_FORMAT = {
    JSON: 'json',
    XML: 'xml'
};

const BASE_HEADERS = {
    [HEADERS.ACCEPT]: 'application/json',
    [HEADERS.CONTENT_TYPE]: 'application/json'
};

const discardResponse = (response, error) => {
    if (!error) {
        error = new Error(response.statusText);
    }

    error.status = response.status;
    return Promise.reject(error);
};

const parseJson = (response) => {
    const status = response.status;
    return response.json().catch(parseError => discardResponse(response, parseError))
                          .then(
                              (json) => (response.ok ? json : Promise.reject(json)),
                              (reason) => (status === 204 ? {} : discardResponse(response, reason))
                          );
};

const responseHandler = {
    responseFormat: RESPONSE_FORMAT.JSON,
    parser: parseJson
};

const api = {
    get(url) {
        return fetch(url, {
            BASE_HEADERS,
            method: GET
        }).then(responseHandler.parser).catch((error) => Promise.reject(error));
    },
    post(url, payload) {
        return fetch(url, {
            BASE_HEADERS,
            method: POST,
            ...payload && {
                body: JSON.stringify(payload)
            }
        }).then(responseHandler.parser).catch((error) => Promise.reject(error));
    }
}

export default api;
