import Loader from './loader';

const BASE_LINK = 'https://newsapi.org/v2/';
const API_KEY = '597c32c981b8463e92e2c8d6ec615f66';

class AppLoader extends Loader {
    constructor() {
        super(BASE_LINK, { apiKey: API_KEY });
    }
}

export default AppLoader;
