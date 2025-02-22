-- CreateTable
CREATE TABLE "AuditedFinances" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "netSales" DOUBLE PRECISION NOT NULL,
    "costOfContracting" DOUBLE PRECISION NOT NULL,
    "overhead" DOUBLE PRECISION NOT NULL,
    "costOfGoodsSold" DOUBLE PRECISION NOT NULL,
    "grossProfit" DOUBLE PRECISION NOT NULL,
    "grossMarginPercent" DOUBLE PRECISION NOT NULL,
    "salariesAndBenefits" DOUBLE PRECISION NOT NULL,
    "rentAndOverhead" DOUBLE PRECISION NOT NULL,
    "depreciationAndAmortization" DOUBLE PRECISION NOT NULL,
    "interest" DOUBLE PRECISION NOT NULL,
    "totalOperatingExpenses" DOUBLE PRECISION NOT NULL,
    "operatingExpensesPercent" DOUBLE PRECISION NOT NULL,
    "profitLossFromOperations" DOUBLE PRECISION NOT NULL,
    "profitLossFromOperationsPercent" DOUBLE PRECISION NOT NULL,
    "interestIncome" DOUBLE PRECISION NOT NULL,
    "interestExpense" DOUBLE PRECISION NOT NULL,
    "gainLossOnDisposalOfAssets" DOUBLE PRECISION NOT NULL,
    "otherIncomeExpense" DOUBLE PRECISION NOT NULL,
    "totalOtherIncomeExpense" DOUBLE PRECISION NOT NULL,
    "totalOtherIncomeExpensePercent" DOUBLE PRECISION NOT NULL,
    "incomeLossBeforeIncomeTaxes" DOUBLE PRECISION NOT NULL,
    "preTaxIncomePercent" DOUBLE PRECISION NOT NULL,
    "incomeTaxes" DOUBLE PRECISION NOT NULL,
    "netIncomeLoss" DOUBLE PRECISION NOT NULL,
    "netIncomeLossPercent" DOUBLE PRECISION NOT NULL,
    "cashEquivalents" DOUBLE PRECISION NOT NULL,
    "accountsReceivable" DOUBLE PRECISION NOT NULL,
    "inventory" DOUBLE PRECISION NOT NULL,
    "totalCurrentAssets" DOUBLE PRECISION NOT NULL,
    "propertyPlantAndEquipment" DOUBLE PRECISION NOT NULL,
    "investment" DOUBLE PRECISION NOT NULL,
    "totalLongTermAssets" DOUBLE PRECISION NOT NULL,
    "totalAssets" DOUBLE PRECISION NOT NULL,
    "accountsPayable" DOUBLE PRECISION NOT NULL,
    "debtService" DOUBLE PRECISION NOT NULL,
    "taxesPayable" DOUBLE PRECISION NOT NULL,
    "totalCurrentLiabilities" DOUBLE PRECISION NOT NULL,
    "debtServiceLongTerm" DOUBLE PRECISION NOT NULL,
    "loansPayable" DOUBLE PRECISION NOT NULL,
    "totalLongTermLiabilities" DOUBLE PRECISION NOT NULL,
    "totalLiabilities" DOUBLE PRECISION NOT NULL,
    "equityCapital" DOUBLE PRECISION NOT NULL,
    "retainedEarnings" DOUBLE PRECISION NOT NULL,
    "totalStockholdersEquity" DOUBLE PRECISION NOT NULL,
    "totalLiabilitiesAndEquity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AuditedFinances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuditedFinances_year_key" ON "AuditedFinances"("year");
