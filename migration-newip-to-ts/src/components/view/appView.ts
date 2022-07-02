import News, { INews, NewsInterface } from './news/news';
import Sources, { ISources, SourcesInterface } from './sources/sources';
import { IResponse } from '../controller/loader';

export interface IAppView {
    drawSources(data: Pick<IResponse, 'sources'>): void;
    drawNews(data: Pick<IResponse, 'articles'>): void;
}

export class AppView implements IAppView {
    private news: NewsInterface;
    private sources: SourcesInterface;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Pick<IResponse, 'articles'>) {
        const values: INews[] = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Pick<IResponse, 'sources'>) {
        const values: ISources[] = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
