import AppLoader from './appLoader';
import { IResponse } from './loader';

export interface IAppController {
    getSources(callback: (data: Pick<IResponse, DataType.sources>) => void): void;
    getNews(e: MouseEvent, callback: (data: Pick<IResponse, DataType.articles>) => void): void;
}

export enum DataType {
    sources = 'sources',
    articles = 'articles',
}

class AppController extends AppLoader implements IAppController {
    getSources(callback: (data: Pick<IResponse, DataType.sources>) => void) {
        super.getResp(
            {
                endpoint: DataType.sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: Pick<IResponse, DataType.articles>) => void) {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer && target) {
            if (target.classList.contains('source__item')) {
                const parent = <HTMLElement>target.parentElement;
                const sources = parent.querySelectorAll('.source__item');
                sources.forEach((source) => source.classList.remove('active'));
                target.classList.add('active');
                const sourceId: string = target.getAttribute('data-source-id') || '';
                if (newsContainer?.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', `${sourceId}`);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;
