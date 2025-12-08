export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface SourcesResponseData {
    status: string;
    sources: Sources[];
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface Sources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type CallbackGen<T> = (data: T) => void;

export interface LoaderOptions {
    apiKey: string;
    sources: string;
}

export interface LoaderConfig<T> {
    method: string;
    endpoint: string;
    callback: CallbackGen<T>;
    options?: Partial<LoaderOptions>;
}
