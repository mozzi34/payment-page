import { mockData } from 'data/mock';
import 'styles/App.css';
import { adaptPaymentToUnifiedTable } from 'components/payment/adapter/buildConsumptionGroups';
import { HeaderSection } from 'components/payment/Table/header/HeaderSection';
import { TableBodyCells } from 'components/payment/Table/TableBodyCells';
import { TableFooterCells } from 'components/payment/Table/TableFooterCells';
import { TableHeaderCells } from 'components/payment/Table/TableHeaderCells';
import { useState } from 'react';

function App() {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedStyleNumber, setSelectedStyleNumber] = useState<string | null>(null);
  const [selectedFabricName, setSelectedFabricName] = useState<string | null>(null);
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);

  const { consumptionGroups: allConsumptionGroups } = adaptPaymentToUnifiedTable(
    mockData,
    null,
    null,
    null
  );
  const { payments, consumptionGroups } = adaptPaymentToUnifiedTable(
    mockData,
    selectedStyleNumber === 'All' ? null : selectedStyleNumber,
    selectedFabricName === 'All' ? null : selectedFabricName,
    selectedColorName === 'All' ? null : selectedColorName
  );

  const handleSelectStyleNumber = (styleNumber: string) => {
    setSelectedStyleNumber(styleNumber === 'All' ? null : styleNumber);
  };

  const handleSelectFabricName = (fabricName: string) => {
    setSelectedFabricName(fabricName === 'All' ? null : fabricName);
  };

  const handleSelectColorName = (colorName: string) => {
    setSelectedColorName(colorName === 'All' ? null : colorName);
  };

  const handleClickOptionButton = () => {
    setIsOptionModalOpen(!isOptionModalOpen);
  };

  return (
    <main className="app">
      <div className="table-container">
        <HeaderSection payments={payments} handleClickOptionButton={handleClickOptionButton} />

        {/* 바디 */}
        <div className="table-body">
          <TableHeaderCells
            payments={payments}
            allConsumptionGroups={allConsumptionGroups}
            isOptionModalOpen={isOptionModalOpen}
            selectedStyleNumber={selectedStyleNumber}
            selectedFabricName={selectedFabricName}
            selectedColorName={selectedColorName}
            onStyleNumberChange={handleSelectStyleNumber}
            onFabricNameChange={handleSelectFabricName}
            onColorNameChange={handleSelectColorName}
          />
          <TableBodyCells consumptions={consumptionGroups} payments={payments} />
          <TableFooterCells consumptions={consumptionGroups} payments={payments} />
        </div>
      </div>
    </main>
  );
}

export default App;
