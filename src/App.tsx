import { Button } from 'components/ui/Button';
import { PayableSection } from 'components/payment/PayableSection';
import { mockData } from 'data/mock';
import type { payments } from 'data/type';

function App() {
  const { payments } = mockData;

  return (
    <main>
      <h1>메인 페이지</h1>
      <Button>버튼</Button>
      <PayableSection payments={payments as payments[]} />
    </main>
  );
}

export default App;
