-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'SHIPPED', 'DELIVERED');

-- CreateTable
CREATE TABLE "Pledge" (
    "id" TEXT NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "livemode" BOOLEAN NOT NULL,
    "tierId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "fulfillmentStatus" "FulfillmentStatus" NOT NULL,
    "shippingName" TEXT,
    "shippingLine1" TEXT,
    "shippingLine2" TEXT,
    "shippingCity" TEXT,
    "shippingState" TEXT,
    "shippingPostalCode" TEXT,
    "shippingCountry" TEXT,
    "paidAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pledge_stripeSessionId_key" ON "Pledge"("stripeSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Pledge_stripePaymentIntentId_key" ON "Pledge"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Pledge_livemode_paymentStatus_idx" ON "Pledge"("livemode", "paymentStatus");
