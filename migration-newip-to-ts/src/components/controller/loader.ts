import { ISources } from '../view/sources/sources';
import { INews } from '../view/news/news';

export interface ILoader {
    getResp(params: IParams<Partial<IOptions>>, callback: (data: Pick<IResponse, DataTypes>) => void): void;
    errorHandler(res: Response): Response | ErrorEvent;
    makeUrl(options: IOptions, endpoint: string): string;
    load(method: string, endpoint: string, callback: (data: IResponse) => void, options: IOptions): void;
}

export type IParams<T> = {
    endpoint: string;
    options?: T;
};

export type IOptions = {
    apiKey: string;
    sources: string;
    everything: string;
};

export type IOption = 'apiKey' | 'sources' | 'everything';

export type DataTypes = 'sources' | 'articles';

export type IResponse = {
    status: string;
    sources: ISources[];
    articles: INews[];
};

class Loader implements ILoader {
    private readonly baseLink: string;
    private readonly options: Partial<IOptions>;

    constructor(baseLink: string, options: Partial<IOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IParams<Partial<IOptions>>,
        callback = (data: Pick<IResponse, DataTypes>): void => {
            console.error('No callback for GET response', data);
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Partial<IOptions>, endpoint: string) {
        const urlOptions: Partial<IOptions> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as IOption]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: IResponse) => void, options: Partial<IOptions> = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<IResponse> => res.json())
            .then((data: IResponse): void => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
