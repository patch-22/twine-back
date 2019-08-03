import React, { PureComponent } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts"

const data = [
  {
    name: "9am",
    Current: 21,
    Average: 24,
  },
  {
    name: "10am",
    Current: 50,
    Average: 102,
  },
  {
    name: "11am",
    Current: 401,
    Average: 330,
    amt: 2290,
  },
  {
    name: "12pm",
    Current: 470,
    Average: 401,
  },
  {
    name: "1pm",
    Average: 190,
  },
  {
    name: "2pm",
    Average: 320,
  },
  {
    name: "3pm",
    Average: 105,
  },
]

export default class Chart extends PureComponent {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <Tooltip />
        <ReferenceLine x={3} stroke="#677e8c" />
        <Line
          type="monotone"
          dataKey="Average"
          stroke="#8884d8"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey="Current"
          stroke="#82ca9d"
          strokeWidth={2}
        />
      </LineChart>
    )
  }
}
