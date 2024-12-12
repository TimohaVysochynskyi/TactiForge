import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const weapon_pairSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weapons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'weapon',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
export const WeaponPairsCollection = db.model('weapon_pair', weapon_pairSchema);
