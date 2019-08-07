import React from "react"
import logo from "./logo.svg"
import "./App.scss"
import Insight from "./Insight"
import Chart from "./Chart"
import { GridLoader } from "react-spinners"
import axios from "axios"
import Map from "./Map"
import { subscribeToData } from "./api"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      selected: null,
    }
    this.personEnter = new Audio("/welcome.mp3")
    this.personLeave = new Audio("/goodbye.mp3")
    this.selectRoom = this.selectRoom.bind(this)
  }
  componentDidMount() {
    subscribeToData((err, data) => {
      if (data.current && this.state.data && this.state.data.current) {
        if (data.current > this.state.data.current) {
          this.personEnter.play()
        }
        if (data.current < this.state.data.current) {
          this.personLeave.play()
        }
      }
      this.setState({ data })
    })
  }
  selectRoom(room) {
    this.setState({
      selected: room,
    })
  }
  render() {
    let { data, selected } = this.state
    if (!data) {
      return (
        <div className="loading">
          <GridLoader />
        </div>
      )
    }
    let analytics = (
      <div>
        {data.insights.map(insight => (
          <Insight text={insight} />
        ))}
        <Chart />
      </div>
    )
    if (selected) {
      analytics = (
        <div>
          <h2>{selected}</h2>
          <h1 className="pulsing pulsing-light">
            {data.places[selected].current} guests
          </h1>
          <div className="insight">
            <i className="mdi mdi-wifi text-success" /> Device working normally
          </div>
          {data.places[selected].insights.map(insight => (
            <Insight text={insight} />
          ))}
          <Chart />
        </div>
      )
    }
    return (
      <>
        <div className="container">
          <header className="col-md-8 offset-md-2">
            <h2>Dogpatch Labs</h2>
            <h1>
              <span className="pulsing">{data.current} guests </span>
            </h1>
            <Map selectRoom={this.selectRoom} />
          </header>
        </div>
        <div className={selected ? "bg-dark text-light" : "bg-light"}>
          <div className="container">
            <header className="col-md-8 offset-md-2">{analytics}</header>
          </div>
        </div>
      </>
    )
  }
}
