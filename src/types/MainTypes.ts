export interface Category {
    id:         number;
    created_at?: Date;
    updated_at?: Date;
    title?:      string;
    position?:   number;
    parent?:     number | null;
}


export interface Recipe {
    title:           string;
    summa?:           number;
    category?:        Category;
    thumbnail?:       string;
    image?:           string;
    text?:            string;
    big_image?:       boolean | null;
    section?:         boolean | null;
    parent_category?: Category;
}