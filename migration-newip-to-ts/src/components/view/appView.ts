import News from './news/news';
import Sources from './sources/sources';
import { NewsInterface } from '../../types/news';
import { SourcesInterface } from '../../types/sources';
import { IAppView } from '../../types/app';
import { DataType, IResponse } from '../../types/loader';

export class AppView implements IAppView {
    public news: NewsInterface;
    public sources: SourcesInterface;
    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Pick<IResponse, DataType.articles>) {
        const values = Array.isArray(data?.articles) ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Pick<IResponse, DataType.sources>) {
        const values = Array.isArray(data?.sources) ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
