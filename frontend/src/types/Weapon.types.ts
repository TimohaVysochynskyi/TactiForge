
export type WeaponPairType = {
    name: string;
    weapons: WeaponType[];
}
export type Characteristic = {
    aspect: string;
    value: string;
};

export type WeaponType = {
    _id: string;
    name: string;
    country: string;
    year: string;
    media: string;
    shortText: string;
    characteristics: Characteristic[];
}