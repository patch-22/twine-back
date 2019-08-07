import React from "react"
import ReactDOM from "react-dom"
import MapData from "./MapData"
import { RadioSVGMap } from "react-svg-map"

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pointedLocation: null,
      selectedLocation: null,
      tooltipStyle: {
        display: "none",
      },
    }

    this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this)
    this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this)
    this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleLocationMouseOver(event) {
    const pointedLocation = event.target.attributes.name.value
    this.setState({ pointedLocation })
  }

  handleLocationMouseOut() {
    this.setState({ pointedLocation: null, tooltipStyle: { display: "none" } })
  }

  handleLocationMouseMove(event) {
    const tooltipStyle = {
      display: "block",
      top: event.clientY + 10,
      left: event.clientX - 100,
    }
    this.setState({ tooltipStyle })
  }
  handleOnChange(selectedNode) {
    let id = selectedNode.attributes.id.nodeValue
    this.setState(prevState => {
      return {
        ...prevState,
        selectedLocation: selectedNode.attributes.name.value,
      }
    })
    this.props.selectRoom(id)
  }

  render() {
    return (
      <>
        <RadioSVGMap
          map={MapData}
          locationClassName={this.getLocationClassName}
          onLocationMouseOver={this.handleLocationMouseOver}
          onLocationMouseOut={this.handleLocationMouseOut}
          onLocationMouseMove={this.handleLocationMouseMove}
          onChange={this.handleOnChange}
        />
        <div className="map__tooltip" style={this.state.tooltipStyle}>
          {this.state.pointedLocation}
        </div>
      </>
    )
  }
}

export default Map
