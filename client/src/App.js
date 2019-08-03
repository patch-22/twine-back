import React from "react"
import logo from "./logo.svg"
import "./App.scss"
import Insight from "./Insight"
import Chart from "./Chart"
import { GridLoader } from "react-spinners"
import axios from "axios"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }
  componentDidMount() {
    axios.get("/events/summary").then(data => {
      this.setState({ data: data.data })
    })
  }
  render() {
    let { data } = this.state
    if (!data) {
      return (
        <div className="loading">
          <GridLoader />
        </div>
      )
    }
    return (
      <div className="container">
        <header className="col-md-8 offset-md-2">
          <h2>Dogpatch Labs</h2>
          <h1>{data.current} guests</h1>
          {data.insights.map(insight => (
            <Insight text={insight} />
          ))}
          <Chart />
        </header>
      </div>
    )
  }
}
