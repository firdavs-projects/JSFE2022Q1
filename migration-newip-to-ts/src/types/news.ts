export interface NewsInterface {
    draw(data: INews[]): void;
}

export type ISourceNews = {
    id: string;
    name: string;
};

export type INews = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: ISourceNews;
    title: string;
    url: string;
    urlToImage: string;
};
