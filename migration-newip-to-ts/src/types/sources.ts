export interface SourcesInterface {
    draw(data: ISources[]): void;
}

export type ISources = {
    id: string;
    name: string;
    description: string;
    category: string;
    language: string;
    country: string;
    url: string;
};
