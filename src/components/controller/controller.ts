import type { CallbackGen, NewsAPIResponse, SourcesResponseData } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: CallbackGen<SourcesResponseData>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallbackGen<NewsAPIResponse>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof HTMLElement) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');

                    if (
                        newsContainer instanceof HTMLElement &&
                        newsContainer.getAttribute('data-source') !== sourceId &&
                        sourceId
                    ) {
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
                }
            }
            return;
        }
        target = (target as Node).parentNode;
    }
}

export default AppController;
