export interface Person {
    name: string;
    age: number;
    sex: string;
}

export interface MenuItem {
    key: string;
    label: string;
    path: string;
    children?: MenuItem[];
}