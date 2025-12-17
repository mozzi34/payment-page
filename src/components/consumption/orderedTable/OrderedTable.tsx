import { Cell, HeaderCell } from 'components/ui/Cell';
import 'styles/consumption/Order.css';
import type { Consumption } from 'data/type';
import { formatCurrency } from 'utils/number';

type Group = {
  salesOrderId: number;
  consumptions: Consumption[];
};

export function OrderedTable({ consumptions }: { consumptions: Consumption[] }) {
  const groups = consumptions.reduce<Group[]>((acc, consumption) => {
    const salesOrderId = consumption.salesOrder.id;

    const group = acc.find(g => g.salesOrderId === salesOrderId);

    if (group) {
      group.consumptions.push(consumption);
    } else {
      acc.push({
        salesOrderId,
        consumptions: [consumption],
      });
    }

    return acc;
  }, []);

  return (
    <div className="ordered-table">
      <div className="ordered-table-header">
        <HeaderCell className="ordered-table-header-item">Style No.</HeaderCell>
        <HeaderCell className="ordered-table-header-item">Supplier Item #</HeaderCell>
        <HeaderCell className="ordered-table-header-item">Fabric Name</HeaderCell>
        <HeaderCell className="ordered-table-header-item">Fabric Color</HeaderCell>
        <HeaderCell className="ordered-table-header-item">Order Qty</HeaderCell>
        <HeaderCell className="ordered-table-header-item ordered-table-header-item-unit">
          Unit
        </HeaderCell>
        <HeaderCell className="ordered-table-header-item">U/price</HeaderCell>
        <HeaderCell className="ordered-table-header-item">Amount</HeaderCell>
      </div>
      <div className="ordered-table-body">
        {groups.map(group => {
          const subTotal = group.consumptions.reduce((sum, c) => sum + c.orderAmount, 0);

          return (
            <>
              {group.consumptions.map(consumption => (
                <div className="ordered-table-body-item" key={consumption.id}>
                  <Cell className="ordered-table-body-item-item">
                    {consumption.salesOrder.styleNumber}
                  </Cell>
                  <Cell className="ordered-table-body-item-item">
                    {consumption.supplierItemCode}
                  </Cell>
                  <Cell className="ordered-table-body-item-item">{consumption.fabricName}</Cell>
                  <Cell className="ordered-table-body-item-item">{consumption.colorName}</Cell>
                  <Cell className="ordered-table-body-item-item">{consumption.orderQuantity}</Cell>
                  <Cell className="ordered-table-body-item-item ordered-table-body-item-item-unit">
                    {consumption.unit}
                  </Cell>
                  <Cell className="ordered-table-body-item-item">
                    <div className="ordered-table-body-item-item-price">
                      <p>$</p>
                      <p className="ordered-table-body-item-item-price-value">
                        {formatCurrency(consumption.unitPrice)}
                      </p>
                    </div>
                  </Cell>
                  <Cell className="ordered-table-body-item-item">
                    <div className="ordered-table-body-item-item-price">
                      <p>$</p>
                      <p className="ordered-table-body-item-item-price-value">
                        {formatCurrency(consumption.orderAmount)}
                      </p>
                    </div>
                  </Cell>
                </div>
              ))}
              <div className="ordered-table-body-subtotal">
                <div className="ordered-table-footer-spacer"></div>
                <div className="ordered-table-footer-spacer"></div>
                <div className="ordered-table-footer-spacer"></div>
                <div className="ordered-table-footer-spacer"></div>
                <div className="ordered-table-footer-spacer"></div>
                <div className="ordered-table-footer-spacer"></div>
                <Cell className="ordered-table-footer-label">Sub Total</Cell>
                <Cell className="ordered-table-footer-value">
                  <div className="ordered-table-body-item-item-price">
                    <p>$</p>
                    <p className="ordered-table-body-item-item-price-value">
                      {formatCurrency(subTotal)}
                    </p>
                  </div>
                </Cell>
              </div>
            </>
          );
        })}
      </div>
      <div className="ordered-table-body-footer">
        <div className="ordered-table-footer-spacer"></div>
        <div className="ordered-table-footer-spacer"></div>
        <div className="ordered-table-footer-spacer"></div>
        <div className="ordered-table-footer-spacer"></div>
        <div className="ordered-table-footer-spacer"></div>
        <div className="ordered-table-footer-spacer"></div>
        <Cell className="ordered-table-footer-label">G.TTL</Cell>
        <Cell className="ordered-table-footer-value">
          ${formatCurrency(consumptions.reduce((sum, c) => sum + c.orderAmount, 0))}
        </Cell>
      </div>
    </div>
  );
}
