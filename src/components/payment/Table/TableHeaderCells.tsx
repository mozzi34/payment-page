import { Cell, HeaderCell } from 'components/ui/Cell';
import { Select } from 'components/ui/Select';
import type { ConsumptionGroup, payments } from 'data/type';
import React from 'react';
import 'styles/consumption/Order.css';

export function TableHeaderCells({
  payments,
  isOptionModalOpen,
  allConsumptionGroups,
  selectedStyleNumber,
  selectedFabricName,
  selectedColorName,
  onStyleNumberChange,
  onFabricNameChange,
  onColorNameChange,
}: {
  payments: payments[];
  allConsumptionGroups: ConsumptionGroup[];
  isOptionModalOpen: boolean;
  selectedStyleNumber: string | null;
  selectedFabricName: string | null;
  selectedColorName: string | null;
  onStyleNumberChange?: (value: string) => void;
  onFabricNameChange?: (value: string) => void;
  onColorNameChange?: (value: string) => void;
}) {
  if (isOptionModalOpen) {
    return (
      <>
        <div className="ordered-table-header">
          <HeaderCell className="ordered-table-header-item">Style No.</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Supplier Item #</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Fabric Name</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Fabric Color</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Order Qty</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Unit</HeaderCell>
          <HeaderCell className="ordered-table-header-item">U/price</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
          {payments.map(payment => (
            <React.Fragment key={payment.id}>
              <HeaderCell className="ordered-table-header-item">Shipped Qty</HeaderCell>
              <HeaderCell className="ordered-table-header-item">U/price</HeaderCell>
              <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
            </React.Fragment>
          ))}

          <HeaderCell className="ordered-table-header-item">Qty</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
        </div>

        <div className="ordered-table-header ordered-table-select-row">
          <Cell className="ordered-table-header-item">
            <Select
              value={selectedStyleNumber || 'All'}
              onChange={onStyleNumberChange}
              options={Array.from(
                new Set(
                  allConsumptionGroups.flatMap(group =>
                    group.rows.map(row => row.consumption.salesOrder.styleNumber)
                  )
                )
              )}
            />
          </Cell>
          <div className="ordered-table-header-item"></div>
          <Cell className="ordered-table-header-item">
            <Select
              value={selectedFabricName || 'All'}
              onChange={onFabricNameChange}
              options={Array.from(
                new Set(
                  allConsumptionGroups.flatMap(group =>
                    group.rows.map(row => row.consumption.fabricName)
                  )
                )
              )}
            />
          </Cell>
          <Cell className="ordered-table-header-item">
            <Select
              value={selectedColorName || 'All'}
              onChange={onColorNameChange}
              options={Array.from(
                new Set(
                  allConsumptionGroups.flatMap(group =>
                    group.rows.map(row => row.consumption.colorName)
                  )
                )
              )}
            />
          </Cell>
          <div className="ordered-table-header-item"></div>
          <div className="ordered-table-header-item"></div>
          <div className="ordered-table-header-item"></div>
          <div className="ordered-table-header-item"></div>
          {payments.map(payment => (
            <React.Fragment key={payment.id}>
              <div className="ordered-table-header-item"></div>
              <div className="ordered-table-header-item"></div>
              <div className="ordered-table-header-item"></div>
            </React.Fragment>
          ))}
          <div className="ordered-table-header-item"></div>
          <div className="ordered-table-header-item"></div>
        </div>
      </>
    );
  }
  return (
    <div className="ordered-table-header">
      <HeaderCell className="ordered-table-header-item">Style No.</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Supplier Item #</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Fabric Name</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Fabric Color</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Order Qty</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Unit</HeaderCell>
      <HeaderCell className="ordered-table-header-item">U/price</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
      {payments.map(payment => (
        <React.Fragment key={payment.id}>
          <HeaderCell className="ordered-table-header-item">Shipped Qty</HeaderCell>
          <HeaderCell className="ordered-table-header-item">U/price</HeaderCell>
          <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
        </React.Fragment>
      ))}

      <HeaderCell className="ordered-table-header-item">Qty</HeaderCell>
      <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
    </div>
  );
}
