import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Chart = (props) => {
    console.log(props);

    const [chartData, setChart] = useState(null);

    useEffect(() => {

        axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=cad&days=7`)
            .then(res => {
                setChart(res.data.prices);
                console.log(res.data.prices);
            }).catch(error => console.log(error));
    }, [props.id]);

    if (chartData == null) {
        return <div>LOADING...</div>
    }

    const chartData_main = chartData.map(value => ({
        x: value[0],
        y: value[1].toFixed(2)
    }));

    const options = {
        responsive: true
    }

    const data = {
        labels: chartData_main.map(value => moment(value.x).format('MMM DD')),
        datasets: [
            {
                fill: true,
                label: props.id,
                data: chartData_main.map(value => value.y),
            }
        ]
    };

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )
}

export default Chart