import { ISources } from './sources';
import { INews } from './news';

export interface ILoader {
    getResp(params: IParams<Partial<IOptions>>, callback: (data: Pick<IResponse, DataTypes>) => void): void;
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
