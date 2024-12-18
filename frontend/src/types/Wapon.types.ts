
export type WeaponPairType = {
    name: string;
    weapons: WeaponType[];
}
export type WeaponType = {
    _id: string;
    name: string;
    country: string;
    year: string;
    media: string;
    shortText: string;
}