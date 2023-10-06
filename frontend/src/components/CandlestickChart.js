import { Stack } from "@chakra-ui/react";
import React from "react";
import Chart from "react-apexcharts";
export default function CandleStick({symbol, candlestick_data}) {
const data = {
	series: [
		{
			data: candlestick_data
		},
	],
	options: {
		chart: {
			type: "candlestick",
			height: 350,
			zoom: {
				autoScaleYaxis: true
			},
		},
		title: {
			text: symbol,
			align: 'left',
			style: {
				color: '#127DE2'
			}
		},
		noData: {
			text: 'Loading...'
		},
		tooltip: {
			enabled: true,
			theme: "light",
			onDatasetHover: {
				highlightDataSeries: true,
			}
		},
		xaxis: {
			type: 'datetime',
		},
		yaxis: {
			tooltip: {
				enabled: true
			},
			decimalsInFloat: 2
		},
		toolbar: {
			tools: {
				pan: true
			}
		},
		plotOptions: {
			candlestick: {
			  colors: {
				upward: '#90E614',
				downward: '#127DE2'
			  },
			}
		}
	},
};


  return (
  <Stack bg="white" 
  	borderWidth = "3px"
	borderColor = "#127DE2">
		<Chart
			type="candlestick"
			height={290}
			width={775}
			options={data.options}
			series={data.series}
      	/>
    </Stack>
  );
}
