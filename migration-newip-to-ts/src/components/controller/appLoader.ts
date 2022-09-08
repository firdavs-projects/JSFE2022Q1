import Loader from './loader';

const BASE_LINK = 'https://nodenews.herokuapp.com/'; // https://newsapi.org/v2/
const API_KEY = '3e0051a0449244e4a8b52db30a0af781';

class AppLoader extends Loader {
    public constructor() {
        super(BASE_LINK, { apiKey: API_KEY });
    }
}

export default AppLoader;
