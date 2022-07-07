import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IApp, IAppController, IAppView } from '../../types/app';
import { setFooterYear } from '../../utils';

class App implements IApp {
    private static _instance: App;
    private controller: IAppController;
    private view: IAppView;
    private constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    start() {
        setFooterYear();
        const sources: HTMLElement | null = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

const appInstance = App.Instance;
export default appInstance;
