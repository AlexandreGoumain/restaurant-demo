export type MenuItem = {
    title: string;
    desc?: string;
    price?: string;
    image?: string;
};

export type MenuCategory = {
    id: string;
    title: string;
    items: MenuItem[];
};
