import News from './news/news';
import Sources from './sources/sources';
import { NewsInterface } from '../../types/news';
import { SourcesInterface } from '../../types/sources';
import { IAppView } from '../../types/app';
import { DataType, IResponse } from '../../types/loader';

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
        const values = Array.isArray(data?.sources) ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
