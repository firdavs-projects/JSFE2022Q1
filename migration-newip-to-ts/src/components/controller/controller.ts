import AppLoader from './appLoader';
import { IResponse } from './loader';

export interface IAppController {
    getSources(callback: (data: Pick<IResponse, 'sources'>) => void): void;
    getNews(e: MouseEvent, callback: (data: Pick<IResponse, 'articles'>) => void): void;
}

class AppController extends AppLoader implements IAppController {
    getSources(callback: (data: Pick<IResponse, 'sources'>) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: Pick<IResponse, 'articles'>) => void) {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer && target) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
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
