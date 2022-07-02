import News, { NewsInterface } from './news/news';
import Sources, { SourcesInterface } from './sources/sources';
import { IResponse } from '../controller/loader';
import { DataType } from '../controller/controller';

export interface IAppView {
    drawSources(data: Pick<IResponse, DataType.sources>): void;
    drawNews(data: Pick<IResponse, DataType.articles>): void;
}

export class AppView implements IAppView {
    public news: NewsInterface;
    public sources: SourcesInterface;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Pick<IResponse, DataType.articles>) {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Pick<IResponse, DataType.sources>) {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
