import type { ConsumptionGroup, payments } from 'data/type';
import 'styles/table/Body.css';
import { SubTotal } from './body/SubTotal';
import { TableBodyRow } from './body/TableBodyRow';

export function TableBodyCells({
  consumptions,
  payments,
}: {
  consumptions: ConsumptionGroup[];
  payments: payments[];
}) {
  return (
    <>
      {consumptions.flatMap((group: ConsumptionGroup) => {
        return (
          <>
            {group.rows.map(row => (
              <TableBodyRow
                key={`${group.salesOrderId}-${row.consumption.id}`}
                row={row}
                payments={payments}
              />
            ))}

            {/* Sub Total 행 */}
            <SubTotal group={group} payments={payments} />
          </>
        );
      })}
    </>
  );
}
