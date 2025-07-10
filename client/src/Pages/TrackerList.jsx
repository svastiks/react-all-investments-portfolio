import React, { useEffect, useState } from 'react'
import Chart from '../Components/Chart'

const TrackerList = (props) => {

  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    const allItems = { ...localStorage };
    const newDataArray = [];
    for (const key in allItems) {
      if (allItems.hasOwnProperty(key)) {
        const parsedArray = JSON.parse(allItems[key]);

        const finalArray = {
          image: parsedArray[1],
          name: parsedArray[0],
          symbol: parsedArray[3],
          price: parsedArray[4],
          marketCap: parsedArray[5]
        };
        newDataArray.push(finalArray);
      }
    }
    setDataArray(newDataArray);
  }, []);

  const removeCoin = (id) => {
    localStorage.removeItem(id);

    window.location.reload(true);
  }

  // Filter out invalid/corrupt entries
  const validDataArray = dataArray.filter(data =>
    data && data.image && data.name && data.symbol && typeof data.price === 'number' && !isNaN(data.price)
  );

  return (
    <main className="trackerlist-modern">
      <div className="trackerlist-header">Tracked User Investments</div>
      <div className="trackerlist-list">
        {validDataArray.length === 0 ? (
          <div className="trackerlist-empty">No investments tracked yet.</div>
        ) : (
          validDataArray.map((data) => (
            <div className="trackerlist-card" key={data.name}>
              <div className="trackerlist-card-main">
                <div className="trackerlist-card-image">
                  <img className="tracker-coinImage" src={data.image} alt="coinImage" />
                </div>
                <div className="trackerlist-card-info">
                  <div className="trackerlist-card-title">{data.name} <span className="trackerlist-card-symbol">({data.symbol})</span></div>
                  <div className="trackerlist-card-meta">
                    <span className="trackerlist-card-label">Price</span>
                    <span className="trackerlist-card-value">{typeof data.price === 'number' && !isNaN(data.price) ? data.price.toLocaleString() + ' CAD' : '-'}</span>
                  </div>
                </div>
                <div className="trackerlist-card-actions">
                  <button className="trackerlist-btn-remove" onClick={() => removeCoin(data.name)}>Remove</button>
                </div>
              </div>
              {data.name && (
                <div className="trackerlist-card-chart">
                  <Chart key={data.name} id={data.name} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default TrackerList