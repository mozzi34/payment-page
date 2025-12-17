import type { ConsumptionGroup, PaymentCell } from 'data/type';

export function getPaymentTotals(consumptions: ConsumptionGroup[], paymentIndex: number) {
  let totalQty = 0;
  let totalAmount = 0;

  consumptions.forEach(group => {
    group.rows.forEach(row => {
      const cell = row.cells[paymentIndex];
      if (cell) {
        totalQty += cell.shippedQuantity;
        totalAmount += cell.amount;
      }
    });
  });

  return { totalQty, totalAmount };
}

export function sumCells(
  consumptions: ConsumptionGroup[],
  getValue: (cell: PaymentCell | undefined) => number
) {
  return consumptions.reduce((sum, group) => {
    return (
      sum +
      group.rows.reduce((rowSum, row) => {
        return (
          rowSum +
          row.cells.reduce((cellSum, cell) => {
            return cellSum + getValue(cell);
          }, 0)
        );
      }, 0)
    );
  }, 0);
}
