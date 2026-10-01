# Payout and settlement reconciliation

The offline module checks selected GBP payment captures, refunds, fees, chargebacks and payout components against bank confirmations. It reports processor activity, confirmed bank transfers and unsettled amounts separately.

A payout marked deposited can still be processing at the bank. The module requires a matching bank amount, settlement timestamp and statement evidence before treating it as settled. See [Shopify payout details](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/view-details).

This is a bounded reconciliation capability. It does not calculate profit, a whole-account bank balance or available pilot funding. It does not replace the existing aggregate dashboard. Source exports, bank statements and private matching rows remain private.

Actual paid-order spending checks stay blocked until settlement reconciliation is integrated. The aggregate dashboard also blocks a spending indication for actual paid-order datasets instead of treating captured payments as confirmed bank cash.

The current preparation dataset records zero paid orders and £0 spending. No live order or bank data has been reconciled, and production measurement is unverified.
