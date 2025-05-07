-- CreateTable
CREATE TABLE "StressTestOneInput" (
    "id" SERIAL NOT NULL,
    "presentValue" DOUBLE PRECISION NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "termYears" INTEGER NOT NULL,
    "monthlyContributionPercent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StressTestOneInput_pkey" PRIMARY KEY ("id")
);
