import { ISources } from './sources';
import { INews } from './news';

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

export enum DataType {
    sources = 'sources',
    articles = 'articles',
}

export enum StatusCodes {
    unauthorized = 401,
    notFound = 404,
}
