import {Details} from '../pages/Details';
import {Homepage} from '../pages/Homepage';

const PATHS = {
    homepage: '/homepage',
    details: '/details'
}

const PATHS_CONFIG = {
    [PATHS.homepage]: Homepage,
    [PATHS.details]: Details
};

export {
    PATHS,
    PATHS_CONFIG
};