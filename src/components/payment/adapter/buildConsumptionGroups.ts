import type {
  Consumption,
  ConsumptionGroup,
  ConsumptionRow,
  Payment,
  PaymentBreakdown,
  PaymentCell,
} from 'data/type';

export type UnifiedTableData = {
  payments: Payment['payments'];
  consumptionGroups: ConsumptionGroup[];
};

export function adaptPaymentToUnifiedTable(
  data: Payment,
  selectedStyleNumber: string | null,
  selectedFabricName: string | null,
  selectedColorName: string | null
): UnifiedTableData {
  const { payments, consumptions, paymentBreakdowns } = data;

  const filteredConsumptions = consumptions.filter(consumption => {
    if (selectedStyleNumber && consumption.salesOrder.styleNumber !== selectedStyleNumber) {
      return false;
    }
    if (selectedFabricName && consumption.fabricName !== selectedFabricName) {
      return false;
    }
    if (selectedColorName && consumption.colorName !== selectedColorName) {
      return false;
    }
    return true;
  });

  const breakdownMap = new Map<string, PaymentBreakdown>();

  paymentBreakdowns.forEach(b => {
    breakdownMap.set(`${b.itemId}_${b.paymentId}`, b);
  });

  const groupMap = new Map<number, Consumption[]>();

  filteredConsumptions.forEach(consumption => {
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
