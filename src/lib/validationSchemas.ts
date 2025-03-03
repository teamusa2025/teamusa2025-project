import * as Yup from 'yup';
import { Role, Subrole } from '@prisma/client';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddUserSchema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  // Taken from https://stackoverflow.com/questions/59836052/how-to-validate-enums-in-yup
  role: Yup.mixed<Role>().oneOf(Object.values(Role)).required(),
  subrole: Yup.mixed<Subrole>().oneOf(Object.values(Subrole)).required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditUserSchema = Yup.object({
  id: Yup.number().required(),
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  // Taken from https://stackoverflow.com/questions/59836052/how-to-validate-enums-in-yup
  role: Yup.mixed<Role>().oneOf(Object.values(Role)).required(),
  subrole: Yup.mixed<Subrole>().oneOf(Object.values(Subrole)).required(),
});
