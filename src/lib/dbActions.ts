/* eslint-disable max-len */

'use server';

import {
  Stuff,
  Condition,
  User,
  $Enums,
  StressTestOneInput,
} from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

// -- Stress Test One Input Retrieval & Update --

/**
 * Retrieves the single StressTestOneInput record (id = 1)
 */
export async function getStressTestOneInput(): Promise<StressTestOneInput | null> {
  return prisma.stressTestOneInput.findUnique({
    where: { id: 1 },
  });
}

/**
 * Updates the StressTestOneInput record (id = 1)
 * @param input - object containing presentValue, interestRate, termYears, monthlyContributionPercent
 */
export async function updateStressTestOneInput(input: {
  presentValue: number;
  interestRate: number;
  termYears: number;
  monthlyContributionPercent: number;
}): Promise<StressTestOneInput> {
  return prisma.stressTestOneInput.update({
    where: { id: 1 },
    data: {
      presentValue: input.presentValue,
      interestRate: input.interestRate,
      termYears: input.termYears,
      monthlyContributionPercent: input.monthlyContributionPercent,
    },
  });
}

// -- Stuff CRUD --

export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') condition = 'poor';
  else if (stuff.condition === 'excellent') condition = 'excellent';

  await prisma.stuff.create({
    data: { name: stuff.name, quantity: stuff.quantity, owner: stuff.owner, condition },
  });
  redirect('/list');
}

export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: { name: stuff.name, quantity: stuff.quantity, owner: stuff.owner, condition: stuff.condition },
  });
  redirect('/list');
}

export async function deleteStuff(id: number) {
  await prisma.stuff.delete({ where: { id } });
  redirect('/list');
}

// -- User CRUD --

export async function addUser(user: { password: string; username: string; email: string; role: $Enums.Role; subrole: $Enums.Subrole; }) {
  const hashedPassword = await hash(user.password, 10);
  await prisma.user.create({ data: { ...user, password: hashedPassword } });
  redirect('/admin');
}

export async function editUser(user: User) {
  if (user.password === 'Replace This To Change Password') {
    await prisma.user.update({
      where: { id: user.id },
      data: { username: user.username, email: user.email, role: user.role, subrole: user.subrole },
    });
  } else {
    const hashedPassword = await hash(user.password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { username: user.username, email: user.email, password: hashedPassword, role: user.role, subrole: user.subrole },
    });
  }
  redirect('/admin');
}

export async function deleteUser(id: number) {
  await prisma.user.delete({ where: { id } });
  redirect('/admin');
}

// -- Access Requests --

export async function requestAccess(credentials: { fullName: string; email: string; reason: string }) {
  await prisma.requestAccess.create({
    data: { ...credentials, status: 'pending', createdAt: new Date() },
  });
}

// -- Audited Finances --

export async function saveAuditedFinances(financeData: any) {
  await prisma.auditedFinances.upsert({
    where: { year: financeData.year },
    update: financeData,
    create: financeData,
  });
}
