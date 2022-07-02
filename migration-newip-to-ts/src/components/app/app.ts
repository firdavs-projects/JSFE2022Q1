import AppController, { IAppController } from '../controller/controller';
import { AppView, IAppView } from '../view/appView';

export interface IApp {
    start(): void;
}

class App implements IApp {
    private controller: IAppController;
    private view: IAppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: HTMLElement | null = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
