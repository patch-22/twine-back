import React from "react"
import logo from "./logo.svg"
import "./App.scss"

function Insight(props) {
  return (
    <div className="insight">
      <i className="mdi mdi-flash-circle" /> {props.text}
    </div>
  )
}

export default Insight
