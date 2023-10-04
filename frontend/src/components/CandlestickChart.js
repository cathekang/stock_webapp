import { Stack } from "@chakra-ui/react";
import React from "react";
import Chart from "react-apexcharts";
export default function CandleStick({symbol, candlestick_data}) {
	console.log(candlestick_data)
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
			}
		},
		title: {
			text: symbol,
			align: 'left'
		},
		noData: {
			text: 'Loading...'
		},
		xaxis: {
			type: 'datetime'
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
		}
	},
};


  return (
  <Stack bg="white" color = "black">
		<Chart
			type="candlestick"
			height={290}
			width={700}
			options={data.options}
			series={data.series}
      	/>
    </Stack>
  );
}
