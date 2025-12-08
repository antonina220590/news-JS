import type { NewsAPIResponse, SourcesResponseData } from '../../types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesElement = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: NewsAPIResponse) => this.view.drawNews(data))
            );
            this.controller.getSources((data: SourcesResponseData) => this.view.drawSources(data));
        }
    }
}

export default App;
