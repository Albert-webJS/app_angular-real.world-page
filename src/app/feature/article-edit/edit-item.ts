export interface ArticleEditElementForm {
    type: string | null;
    placeholder: string;
    nameElementForm: string;
    row?: number;
    tag: string;
}

export const EDIT_ELEMENT_ITEMS: ArticleEditElementForm[] = [
    { type: "text", placeholder: "Article Title", nameElementForm: "title", tag: "input" },
    { type: "text", placeholder: "What's this article about?", nameElementForm: "description", tag: "input" },
    { type: null, placeholder: "Write your article (in markdown)", nameElementForm: "body", row: 8, tag: "textarea" },
    { type: "text", placeholder: "Enter tags", nameElementForm: "tagList", tag: "input" },
]