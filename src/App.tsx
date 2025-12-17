import { ConsumptionSection } from 'components/consumption/ConsumptionSection';
import { PayableSection } from 'components/payment/PayableSection';
import { mockData } from 'data/mock';
import type { payments } from 'data/type';
import 'styles/App.css';

function App() {
  const { payments, consumptions } = mockData;

  return (
    <main className="app">
      <ConsumptionSection consumptions={consumptions} />
      <PayableSection payments={payments as payments[]} />
    </main>
  );
}

export default App;
