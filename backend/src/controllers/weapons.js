import createHttpError from 'http-errors';
import { getAllWeaponPairs, getWeaponById } from '../services/weapons.js';

export const getAllWeaponPairsController = async (req, res, next) => {
  const weaponPairs = await getAllWeaponPairs();

  res.status(200).send({
    status: 200,
    message: 'Successfully found weapon pairs',
    data: weaponPairs,
  });
};

export const getWeaponByIdController = async (req, res, next) => {
  const { id } = req.params;
  const weapon = await getWeaponById(id);

  if (!weapon) {
    return next(createHttpError(404, 'Weapon not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found weapon with id ${id}`,
    data: weapon,
  });
};
