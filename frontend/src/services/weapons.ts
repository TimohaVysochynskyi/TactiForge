import weaponPairs from "../data/weaponPairs.json";
import { WeaponPairType, WeaponType } from "../types/Weapon.types";

const pairs = weaponPairs as WeaponPairType[];

export const fetchAllWeaponPairs = async (): Promise<WeaponPairType[]> => pairs;

export const fetchWeaponWithId = async (
  id: string
): Promise<WeaponType | undefined> =>
  pairs.flatMap((pair) => pair.weapons).find((weapon) => weapon._id === id);
