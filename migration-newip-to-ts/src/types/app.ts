import { DataType, IResponse } from './loader';

export interface IApp {
    start(): void;
}

export interface IAppView {
    drawSources(data: Pick<IResponse, DataType.sources>): void;
    drawNews(data: Pick<IResponse, DataType.articles>): void;
}

export interface IAppController {
    getSources(callback: (data: Pick<IResponse, DataType.sources>) => void): void;
    getNews(e: MouseEvent, callback: (data: Pick<IResponse, DataType.articles>) => void): void;
}
