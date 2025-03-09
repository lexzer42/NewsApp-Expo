export interface ArticleSource {
    id: string;
    name: string;
}

export interface Article {
    id: string; // Unique ID for the article
    source: ArticleSource;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
}

export interface NewsApiResponse {
    status: "ok" | "error";
    totalResults: number;
    articles: Article[];
    code?: string;
    message?: string;
}

export type NewsApiError = {
    message: string;
    code?: string;
};

// Navigation type definitions
export type RootStackParamList = {
    HomeTabs: undefined;
    Detail: { article: Article };
    Categories: undefined;
    News: undefined;
};

export type HomeTabParamList = {
    News: undefined;
    Categories: undefined;
    Saved: undefined;
};