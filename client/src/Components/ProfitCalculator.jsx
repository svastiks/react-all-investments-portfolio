import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaCalculator, FaChartLine, FaDollarSign, FaInfoCircle, FaChevronDown, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const COIN_LIST_CACHE_KEY = 'profit_calc_coinlist';
const COIN_LIST_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours
const PRICE_CACHE_PREFIX = 'profit_calc_price_';
const PRICE_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

const fetchCoinList = async () => {
  // Try cache first
  const cached = localStorage.getItem(COIN_LIST_CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < COIN_LIST_CACHE_TIME) {
        return data;
      }
    } catch {}
  }
  // Fetch from CoinGecko
  const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'cad',
      order: 'market_cap_desc',
      per_page: 250,
      page: 1,
      sparkline: false,
      locale: 'en',
    },
  });
  const data = res.data.map(coin => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
  }));
  localStorage.setItem(COIN_LIST_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
};

const fetchCoinPrice = async (id) => {
  const cacheKey = PRICE_CACHE_PREFIX + id;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { price, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < PRICE_CACHE_TIME) {
        return price;
      }
    } catch {}
  }
  const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
    params: {
      ids: id,
      vs_currencies: 'cad',
    },
  });
  const price = res.data[id]?.cad;
  if (typeof price === 'number') {
    localStorage.setItem(cacheKey, JSON.stringify({ price, timestamp: Date.now() }));
    return price;
  }
  return null;
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProfitCalculator = () => {
  const [formData, setFormData] = useState({
    buyPrice: '',
    sellPrice: '',
    quantity: '',
    fees: '',
    taxRate: '15',
  });
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [coinList, setCoinList] = useState([]);
  const [coinSearch, setCoinSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const dropdownRef = useRef();
  const resultsRef = useRef();
  const query = useQuery();

  useEffect(() => {
    fetchCoinList().then(list => {
      setCoinList(list);
      // Preselect coin from query param if present
      const coinId = query.get('coin');
      if (coinId) {
        const found = list.find(c => c.id === coinId);
        if (found) setSelectedCoin(found);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Close dropdown on outside click
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      setLoadingPrice(true);
      fetchCoinPrice(selectedCoin.id).then(price => {
        setFormData(prev => ({ ...prev, sellPrice: price ?? '' }));
        setLoadingPrice(false);
      });
    } else {
      setFormData(prev => ({ ...prev, sellPrice: '' }));
    }
  }, [selectedCoin]);

  const calculateProfit = useCallback(() => {
    const { buyPrice, sellPrice, quantity, fees, taxRate } = formData;
    if (!buyPrice || !sellPrice || !quantity) {
      setResults(null);
      return;
    }
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const qty = parseFloat(quantity);
    const tradingFees = parseFloat(fees) || 0;
    const tax = parseFloat(taxRate) / 100;
    const totalInvestment = buy * qty;
    const totalValue = sell * qty;
    const grossProfit = totalValue - totalInvestment;
    const netProfit = grossProfit - tradingFees;
    const percentageGain = ((sell - buy) / buy) * 100;
    const roi = (netProfit / totalInvestment) * 100;
    const taxableGain = Math.max(0, netProfit);
    const taxAmount = taxableGain * tax;
    const afterTaxProfit = netProfit - taxAmount;
    const breakEvenPrice = buy + (tradingFees / qty);
    const breakEvenPercentage = ((breakEvenPrice - buy) / buy) * 100;
    const maxLoss = totalInvestment + tradingFees;
    const riskRewardRatio = netProfit > 0 ? netProfit / maxLoss : 0;
    setResults({
      totalInvestment,
      totalValue,
      grossProfit,
      netProfit,
      percentageGain,
      roi,
      tradingFees,
      taxAmount,
      afterTaxProfit,
      breakEvenPrice,
      breakEvenPercentage,
      maxLoss,
      riskRewardRatio
    });
  }, [formData]);

  useEffect(() => {
    calculateProfit();
  }, [calculateProfit]);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [results]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetCalculator = () => {
    setFormData({
      buyPrice: '',
      sellPrice: '',
      quantity: '',
      fees: '',
      taxRate: '15'
    });
    setResults(null);
    setSelectedCoin(null);
    setCoinSearch('');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // Dropdown logic
  const filteredCoins = coinList.filter(coin =>
    coin.name.toLowerCase().includes(coinSearch.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(coinSearch.toLowerCase())
  );

  return (
    <div className="profit-calculator">
      <div className="calculator-header">
        <FaCalculator className="calculator-icon" />
        <h2>Profit Calculator</h2>
        <p>Calculate your crypto investment returns and analyze potential profits</p>
      </div>

      {/* Coin selection dropdown */}
      <div className="form-group" style={{ width: '100%', marginBottom: 18 }}>
        <label htmlFor="coin-select">Select Coin (optional)</label>
        <div className="coin-dropdown-wrapper" ref={dropdownRef}>
          <div
            className={`coin-dropdown-input${dropdownOpen ? ' open' : ''}`}
            onClick={() => setDropdownOpen(v => !v)}
            tabIndex={0}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', background: '#f7f8fa', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '0.65rem 1rem', minHeight: 44 }}
          >
            {selectedCoin ? (
              <>
                <img src={selectedCoin.image} alt={selectedCoin.symbol} style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 8 }} />
                <span style={{ fontWeight: 600 }}>{selectedCoin.name}</span>
                <span style={{ color: '#64748b', marginLeft: 6 }}>({selectedCoin.symbol.toUpperCase()})</span>
              </>
            ) : (
              <span style={{ color: '#64748b' }}>Search or select a coin...</span>
            )}
            <FaChevronDown style={{ marginLeft: 'auto', color: '#64748b' }} />
          </div>
          {dropdownOpen && (
            <div className="coin-dropdown-list" style={{ position: 'absolute', zIndex: 10, background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 8, width: '100%', maxHeight: 260, overflowY: 'auto', marginTop: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <div style={{ padding: 8, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', background: '#f7f8fa' }}>
                <FaSearch style={{ color: '#64748b', marginRight: 6 }} />
                <input
                  type="text"
                  placeholder="Search coin name or symbol"
                  value={coinSearch}
                  onChange={e => setCoinSearch(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 15, width: '100%' }}
                  autoFocus
                />
              </div>
              {filteredCoins.length === 0 && (
                <div style={{ padding: 16, color: '#64748b', textAlign: 'center' }}>No coins found</div>
              )}
              {filteredCoins.map(coin => (
                <div
                  key={coin.id}
                  className="coin-dropdown-item"
                  style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}
                  onClick={() => {
                    setSelectedCoin(coin);
                    setDropdownOpen(false);
                  }}
                >
                  <img src={coin.image} alt={coin.symbol} style={{ width: 22, height: 22, borderRadius: '50%', marginRight: 8 }} />
                  <span style={{ fontWeight: 600 }}>{coin.name}</span>
                  <span style={{ color: '#64748b', marginLeft: 6 }}>({coin.symbol.toUpperCase()})</span>
                </div>
              ))}
            </div>
          )}
          {selectedCoin && (
            <button
              style={{ marginTop: 6, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}
              onClick={() => { setSelectedCoin(null); setCoinSearch(''); }}
              type="button"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>

      <div className="calculator-tabs">
        <button 
          className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          <FaDollarSign /> Basic
        </button>
        <button 
          className={`tab ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          <FaChartLine /> Advanced
        </button>
      </div>

      <div className="calculator-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="buyPrice">Buy Price (CAD)</label>
            <input
              type="number"
              id="buyPrice"
              name="buyPrice"
              value={formData.buyPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.000001"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sellPrice">Sell Price (CAD)</label>
            <input
              type="number"
              id="sellPrice"
              name="sellPrice"
              value={formData.sellPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.000001"
              readOnly={!!selectedCoin}
              style={selectedCoin ? { background: '#f3f4f6', color: '#64748b', cursor: 'not-allowed' } : {}}
            />
            {loadingPrice && selectedCoin && <span style={{ color: '#64748b', fontSize: 12 }}>Fetching latest price...</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.000001"
            />
          </div>
          {activeTab === 'advanced' && (
            <div className="form-group">
              <label htmlFor="fees">Trading Fees (CAD)</label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={formData.fees}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
              />
            </div>
          )}
        </div>

        {activeTab === 'advanced' && (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="taxRate">Capital Gains Tax Rate (%)</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleInputChange}
                placeholder="15"
                step="0.1"
                min="0"
                max="100"
              />
            </div>
          </div>
        )}
      </div>

      {results && (
        <div className="calculator-results" ref={resultsRef}>
          <h3>Results</h3>
          
          <div className="results-grid">
            <div className="result-card primary">
              <div className="result-label">Total Investment</div>
              <div className="result-value">{formatCurrency(results.totalInvestment)}</div>
            </div>
            
            <div className="result-card primary">
              <div className="result-label">Total Value</div>
              <div className="result-value">{formatCurrency(results.totalValue)}</div>
            </div>
            
            <div className={`result-card ${results.percentageGain >= 0 ? 'profit' : 'loss'}`}>
              <div className="result-label">Percentage Gain/Loss</div>
              <div className="result-value">
                {results.percentageGain >= 0 ? '+' : ''}{formatPercentage(results.percentageGain)}
              </div>
            </div>
            
            <div className={`result-card ${results.netProfit >= 0 ? 'profit' : 'loss'}`}>
              <div className="result-label">Net Profit/Loss</div>
              <div className="result-value">
                {results.netProfit >= 0 ? '+' : ''}{formatCurrency(results.netProfit)}
              </div>
            </div>
            
            <div className={`result-card ${results.roi >= 0 ? 'profit' : 'loss'}`}>
              <div className="result-label">ROI</div>
              <div className="result-value">
                {results.roi >= 0 ? '+' : ''}{formatPercentage(results.roi)}
              </div>
            </div>
          </div>

          {activeTab === 'advanced' && (
            <>
              <div className="results-section">
                <h4>Advanced Analysis</h4>
                <div className="results-grid">
                  <div className="result-card">
                    <div className="result-label">Trading Fees</div>
                    <div className="result-value">{formatCurrency(results.tradingFees)}</div>
                  </div>
                  
                  <div className="result-card">
                    <div className="result-label">Tax Amount</div>
                    <div className="result-value">{formatCurrency(results.taxAmount)}</div>
                  </div>
                  
                  <div className={`result-card ${results.afterTaxProfit >= 0 ? 'profit' : 'loss'}`}>
                    <div className="result-label">After-Tax Profit</div>
                    <div className="result-value">
                      {results.afterTaxProfit >= 0 ? '+' : ''}{formatCurrency(results.afterTaxProfit)}
                    </div>
                  </div>
                  
                  <div className="result-card">
                    <div className="result-label">Break-even Price</div>
                    <div className="result-value">{formatCurrency(results.breakEvenPrice)}</div>
                  </div>
                  
                  <div className="result-card">
                    <div className="result-label">Break-even %</div>
                    <div className="result-value">{formatPercentage(results.breakEvenPercentage)}</div>
                  </div>
                  
                  <div className="result-card">
                    <div className="result-label">Max Loss</div>
                    <div className="result-value">{formatCurrency(results.maxLoss)}</div>
                  </div>
                </div>
              </div>

              <div className="risk-analysis">
                <h4>Risk Analysis</h4>
                <div className="risk-metrics">
                  <div className="risk-item">
                    <span className="risk-label">Risk/Reward Ratio:</span>
                    <span className="risk-value">{results.riskRewardRatio.toFixed(2)}</span>
                  </div>
                  <div className="risk-item">
                    <span className="risk-label">Risk Level:</span>
                    <span className={`risk-level ${results.riskRewardRatio > 2 ? 'low' : results.riskRewardRatio > 1 ? 'medium' : 'high'}`}>
                      {results.riskRewardRatio > 2 ? 'Low Risk' : results.riskRewardRatio > 1 ? 'Medium Risk' : 'High Risk'}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="calculator-info">
            <FaInfoCircle />
            <p>
              <strong>Note:</strong> This calculator provides estimates for educational purposes. 
              Always consult with a financial advisor for investment decisions. 
              Tax calculations are simplified and may not reflect your specific tax situation.
            </p>
          </div>

          <div className="form-actions" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-reset" onClick={resetCalculator}>
              Reset Calculator
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfitCalculator; 