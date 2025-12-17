import type { Consumption, Payment, PaymentBreakdown } from 'data/type';

export type PaymentCell = PaymentBreakdown | null;

export type ConsumptionRow = {
  consumption: Consumption;
  cells: PaymentCell[];
};

export type ConsumptionGroup = {
  salesOrderId: number;
  rows: ConsumptionRow[];
  subTotalAmount: number;
};

export type PaymentBundle = {
  payment: Payment['payments'][number];
  consumptionGroups: ConsumptionGroup[];
};

export type UnifiedTableData = {
  payments: Payment['payments'];
  consumptionGroups: ConsumptionGroup[];
};

export function adaptPaymentToConsumptionGroups(data: Payment): PaymentBundle[] {
  const { payments, consumptions, paymentBreakdowns } = data;

  const breakdownMap = new Map<string, PaymentBreakdown>();

  paymentBreakdowns.forEach(b => {
    breakdownMap.set(`${b.itemId}_${b.paymentId}`, b);
  });

  return payments.map(payment => {
    const groupMap = new Map<number, Consumption[]>();

    consumptions.forEach(consumption => {
      const salesOrderId = consumption.salesOrder.id;

      if (!groupMap.has(salesOrderId)) {
        groupMap.set(salesOrderId, []);
      }

      const existing = groupMap.get(salesOrderId);
      if (existing) {
        existing.push(consumption);
      } else {
        groupMap.set(salesOrderId, [consumption]);
      }
    });

    const groups: ConsumptionGroup[] = [];

    groupMap.forEach((groupConsumptions, salesOrderId) => {
      const rows: ConsumptionRow[] = groupConsumptions.map(consumption => {
        const cell = breakdownMap.get(`${consumption.id}_${payment.id}`) ?? null;
        const cells: PaymentCell[] = [cell];

        return {
          consumption,
          cells,
        };
      });

      const subTotalAmount = groupConsumptions.reduce((sum, c) => sum + c.orderAmount, 0);

      groups.push({
        salesOrderId,
        rows,
        subTotalAmount,
      });
    });

    return {
      payment,
      consumptionGroups: groups,
    };
  });
}

export function adaptPaymentToUnifiedTable(data: Payment): UnifiedTableData {
  const { payments, consumptions, paymentBreakdowns } = data;

  const breakdownMap = new Map<string, PaymentBreakdown>();

  paymentBreakdowns.forEach(b => {
    breakdownMap.set(`${b.itemId}_${b.paymentId}`, b);
  });

  const groupMap = new Map<number, Consumption[]>();

  consumptions.forEach(consumption => {
    const salesOrderId = consumption.salesOrder.id;

    if (!groupMap.has(salesOrderId)) {
      groupMap.set(salesOrderId, []);
    }

    const existing = groupMap.get(salesOrderId);
    if (existing) {
      existing.push(consumption);
    } else {
      groupMap.set(salesOrderId, [consumption]);
    }
  });

  const groups: ConsumptionGroup[] = [];

  groupMap.forEach((groupConsumptions, salesOrderId) => {
    const rows: ConsumptionRow[] = groupConsumptions.map(consumption => {
      const cells: PaymentCell[] = payments.map(payment => {
        return breakdownMap.get(`${consumption.id}_${payment.id}`) ?? null;
      });

      return {
        consumption,
        cells,
      };
    });

    const subTotalAmount = groupConsumptions.reduce((sum, c) => sum + c.orderAmount, 0);

    groups.push({
      salesOrderId,
      rows,
      subTotalAmount,
    });
  });

  return {
    payments,
    consumptionGroups: groups,
  };
}
