import type { CallbackGen, LoaderOptions } from '../../types';
import getKeys from '../../utils';

const status = {
    badRequest: 400,
    notFound: 404,
} as const;

class Loader {
    baseLink: string;
    options: Partial<LoaderOptions>;
    constructor(baseLink: string, options: Partial<LoaderOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: Partial<LoaderOptions> },
        callback: CallbackGen<T> = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        console.log('getResp', this.options);
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === status.badRequest || res.status === status.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: Partial<LoaderOptions>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        console.log('ourUrl', urlOptions);
        getKeys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: CallbackGen<T>, options: Partial<LoaderOptions> = {}) {
        console.log(options);
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
