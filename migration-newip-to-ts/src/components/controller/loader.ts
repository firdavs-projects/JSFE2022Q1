import { ISources } from '../view/sources/sources';
import { INews } from '../view/news/news';

export interface IParams {
    endpoint: string;
    options?: IOptions;
}

export interface IOptions {
    apiKey?: string;
    sources?: string | null;
}

export interface UrlOptions {
    [key: string]: string | null;
}

export type DataType = 'sources' | 'articles';

export interface ILoader {
    getResp(params: IParams, callback: (data: Pick<IResponse, DataType>) => void): void;
    errorHandler(res: Response): Response | ErrorEvent;
    makeUrl(options: IOptions, endpoint: string): string;
    load(method: string, endpoint: string, callback: (data: IResponse) => void, options: IOptions): void;
}

export interface IResponse {
    status: string;
    sources: ISources[];
    articles: INews[];
}

class Loader implements ILoader {
    private readonly baseLink: string;
    private readonly options: IOptions;

    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IParams,
        callback = (_: Pick<IResponse, DataType>): void => {
            console.error('No callback for GET response');
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

    makeUrl(options: IOptions, endpoint: string) {
        const urlOptions: UrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: IResponse) => void, options: IOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<IResponse> => res.json())
            .then((data: IResponse): void => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
