import { PrismaClient, Role, Subrole, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Seed default accounts
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    let subrole: Subrole = 'EXECUTIVE';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
      subrole = 'ADMIN';
    }
    if (account.subrole === 'ANALYST') {
      subrole = 'ANALYST';
    }
    if (account.subrole === 'AUDITOR') {
      subrole = 'AUDITOR';
    }
    console.log(`  Creating user: ${account.email} with role: ${role} and subrole: ${subrole}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        username: account.username,
        password,
        role,
        subrole,
      },
    });
  });

  // Seed default data for "stuff"
  config.defaultData.forEach(async (data, index) => {
    let condition: Condition = 'good';
    if (data.condition === 'poor') {
      condition = 'poor';
    } else if (data.condition === 'excellent') {
      condition = 'excellent';
    } else {
      condition = 'fair';
    }
    console.log(`  Adding stuff: ${data.name} (${data.owner})`);
    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  });

  // Seed audited finances (AuditedFinances)
  config.auditedFinances.forEach(async (finData) => {
    console.log(`  Seeding audited finances for year: ${finData.year}`);
    await prisma.auditedFinances.upsert({
      where: { year: finData.year },
      update: {},
      create: {
        year: finData.year,
        revenue: finData.revenue,
        netSales: finData.netSales,
        costOfContracting: finData.costOfContracting,
        overhead: finData.overhead,
        costOfGoodsSold: finData.costOfGoodsSold,
        grossProfit: finData.grossProfit,
        grossMarginPercent: finData.grossMarginPercent,
        salariesAndBenefits: finData.salariesAndBenefits,
        rentAndOverhead: finData.rentAndOverhead,
        depreciationAndAmortization: finData.depreciationAndAmortization,
        interest: finData.interest,
        totalOperatingExpenses: finData.totalOperatingExpenses,
        operatingExpensesPercent: finData.operatingExpensesPercent,
        profitLossFromOperations: finData.profitLossFromOperations,
        profitLossFromOperationsPercent: finData.profitLossFromOperationsPercent,
        interestIncome: finData.interestIncome,
        interestExpense: finData.interestExpense,
        gainLossOnDisposalOfAssets: finData.gainLossOnDisposalOfAssets,
        otherIncomeExpense: finData.otherIncomeExpense,
        totalOtherIncomeExpense: finData.totalOtherIncomeExpense,
        totalOtherIncomeExpensePercent: finData.totalOtherIncomeExpensePercent,
        incomeLossBeforeIncomeTaxes: finData.incomeLossBeforeIncomeTaxes,
        preTaxIncomePercent: finData.preTaxIncomePercent,
        incomeTaxes: finData.incomeTaxes,
        netIncomeLoss: finData.netIncomeLoss,
        netIncomeLossPercent: finData.netIncomeLossPercent,
        cashEquivalents: finData.cashEquivalents,
        accountsReceivable: finData.accountsReceivable,
        inventory: finData.inventory,
        totalCurrentAssets: finData.totalCurrentAssets,
        propertyPlantAndEquipment: finData.propertyPlantAndEquipment,
        investment: finData.investment,
        totalLongTermAssets: finData.totalLongTermAssets,
        totalAssets: finData.totalAssets,
        accountsPayable: finData.accountsPayable,
        debtService: finData.debtService,
        taxesPayable: finData.taxesPayable,
        totalCurrentLiabilities: finData.totalCurrentLiabilities,
        debtServiceLongTerm: finData.debtServiceLongTerm,
        loansPayable: finData.loansPayable,
        totalLongTermLiabilities: finData.totalLongTermLiabilities,
        totalLiabilities: finData.totalLiabilities,
        equityCapital: finData.equityCapital,
        retainedEarnings: finData.retainedEarnings,
        totalStockholdersEquity: finData.totalStockholdersEquity,
        totalLiabilitiesAndEquity: finData.totalLiabilitiesAndEquity,
      },
    });
  });

  // Seed requestAccess data
  config.requestAccess.forEach(async (data) => {
    console.log(`  Adding access request: ${data.fullName} (${data.email})`);
    await prisma.requestAccess.upsert({
      where: { email: data.email },
      update: {},
      create: {
        fullName: data.fullName,
        email: data.email,
        reason: data.reason,
        status: data.status || 'pending', // Default to "pending" if missing
        createdAt: new Date(data.createdAt), // Ensure Date format
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
