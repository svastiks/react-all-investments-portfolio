import React, { useEffect } from 'react';
import ProfitCalculator from '../Components/ProfitCalculator';

const ProfitCalculatorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="profit-calculator-page">
      <div className="page-container">
        <ProfitCalculator />
      </div>
    </main>
  );
};

export default ProfitCalculatorPage; 