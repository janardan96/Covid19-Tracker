import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function Graph({ casesType = 'cases' }) {
    const [data, setData] = useState({});
    // https://disease.sh/v3/covid-19/historical/all?lastdays=30

    const buildChartData = (data, caseType) => {
        let chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[caseType][date];
        }
        return chartData;

    }

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
            .then(response => response.json())
            .then(data => {
                let chartData = buildChartData(data, casesType);
                setData(chartData)
            })
    }, [casesType])

    function chooseColor(casestype) {
        switch (casestype) {
            case 'cases':
                return {
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                }
            case 'recovered':
                return {
                    backgroundColor: "#b6f16c",
                    borderColor: "#a5f145",
                }
            case 'deaths':
                return {
                    backgroundColor: '#f5aaa7',
                    borderColor: '#f98a86'
                }
            default:
                break;
        }
    }



    return (
        <div>
            {data?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                ...chooseColor(casesType),
                                data: data,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    );
}

export default Graph
