'use server';

import { Stuff, Condition, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing user in the database.
 * @param user, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editUser(user: User) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      subrole: user.subrole,
    },
  });
  // After updating, redirect to the admin page
  redirect('/admin');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password, username.
 */
export async function createUser(credentials: { email: string; password: string; username: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const hashedPassword = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      username: credentials.username,
      password: hashedPassword,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const hashedPassword = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password: hashedPassword,
    },
  });
}
/**
 * When a new user want to gain access to the application, they can request access.
 * @param credentials, an object with the following properties: fullName, email, reason.
 */
export async function requestAccess(credentials: { fullName: string; email: string, reason: string }) {
  // console.log(`requestAccess data: ${JSON.stringify(credentials, null, 2)}`);
  await prisma.requestAccess.create({
    data: {
      email: credentials.email,
      fullName: credentials.fullName,
      reason: credentials.reason,
      status: 'pending', // Default status
      createdAt: new Date(),
    },
  });
}
