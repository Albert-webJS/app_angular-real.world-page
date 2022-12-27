export type Articles = {
    articles: Article[]
    articlesCount: number;
};

export interface ArticleRequest {
    article: ArticleBody;
};

export interface ArticleBody {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export interface Article {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
    favorite: true,
    favoritesCount: number,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    };
};