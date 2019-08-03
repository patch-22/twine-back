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
    axios.get("/events").then(data => {
      this.setState({ data })
    })
  }
  render() {
    if (!this.state.data) {
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
          <h1>431 guests</h1>
          <Insight text="A lot more people than the usual of 357 guests." />
          <Insight text="You're approaching your building's capacity limit of 500 guests." />
          <Chart />
        </header>
      </div>
    )
  }
}
