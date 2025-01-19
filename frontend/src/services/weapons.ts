import axios from "axios";
import { apiDomain } from "../constants.ts";
import { WeaponType } from "../types/Weapon.types.ts";

const URL = `${apiDomain}/weapons`;

export const fetchAllWeaponPairs = async () => {
  const response = await axios.get(`${URL}/`);

  return response.data;
};
export const fetchWeaponWithId = async (id: string) => {
  const response = await axios.get(`${URL}/${id}`);

  return response.data;
};
export const addWeapon = async (payload: WeaponType) => {
  const response = await axios.post(`${URL}/`, payload);

  return response.data;
};
