import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '597c32c981b8463e92e2c8d6ec615f66', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
