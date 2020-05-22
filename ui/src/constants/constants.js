import queryString from 'query-string';

const getUrlParamValue = (param) => {
    const idx = location.href.indexOf("?");

    if (idx !== -1) {
        const queryStringFormatted = queryString.parse(location.search);
        return queryStringFormatted[param];
    }

    return null;
}

export {getUrlParamValue};
