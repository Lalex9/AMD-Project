import queryString from 'query-string';

const getUrlParamValue = (param) => {
    const idx = window.location.href.indexOf("?");

    if (idx !== -1) {
        const queryStringFormatted = queryString.parse(window.location.search);
        return queryStringFormatted[param];
    }

    return null;
}

export {getUrlParamValue};
