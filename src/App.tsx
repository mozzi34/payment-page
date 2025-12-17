import { mockData } from 'data/mock';
import 'styles/App.css';
import { adaptPaymentToUnifiedTable } from 'components/payment/adapter/buildConsumptionGroups';
import { HeaderSection } from 'components/payment/Table/header/HeaderSection';
import { TableBodyCells } from 'components/payment/Table/TableBodyCells';
import { TableFooterCells } from 'components/payment/Table/TableFooterCells';
import { TableHeaderCells } from 'components/payment/Table/TableHeaderCells';

function App() {
  const { payments, consumptionGroups } = adaptPaymentToUnifiedTable(mockData);

  return (
    <main className="app">
      <div className="table-container">
        <HeaderSection payments={payments} />

        {/* 바디 */}
        <div className="table-body">
          <TableHeaderCells payments={payments} />
          <TableBodyCells consumptions={consumptionGroups} payments={payments} />
          <TableFooterCells consumptions={consumptionGroups} payments={payments} />
        </div>
      </div>
    </main>
  );
}

export default App;
