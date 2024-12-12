import { WeaponPairsCollection } from '../models/weapon_pair.js';
import { WeaponsCollection } from '../models/weapon.js';

export const getAllWeaponPairs = async () => {
  const weaponPairs = await WeaponPairsCollection.find().exec();

  for (const pair of weaponPairs) {
    pair.weapons = await WeaponsCollection.find({
      _id: { $in: pair.weapons },
    });
  }

  return weaponPairs;
};

export const getWeaponById = async (weaponId) => {
  const weapon = await WeaponsCollection.findOne({
    _id: weaponId,
  });

  return weapon;
};
