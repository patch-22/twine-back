import createError from "http-errors"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import indexRouter from "./routes/index"
import eventsRouter from "./routes/events"
import db from "./database"
var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/events", eventsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

var server = require("http").Server(app)
var io = require("socket.io")(server)

server.listen(9000)

let getCount = token => {
  let total = 0
  let query = db.get("events")
  if (token) {
    query = query.filter({ target: token })
  }
  query.value().forEach(event => {
    total += event.count == 1 ? 1 : -1
  })
  return total
}
io.on("connection", client => {
  client.on("subscribeToData", interval => {
    console.log("client is subscribing to timer with interval ", interval)
    setInterval(() => {
      let data = {
        current: getCount(),
        insights: [
          "You're busier than usual.",
          "You're approaching your building's capacity.",
        ],
        places: {
          kitchen: {
            current: getCount("kitchen"),
            insights: ["Your microwave does not appear to be working."],
          },
          workspace: {
            current: getCount("workspace"),
            insights: ["People are annoyed by the ping pong table."],
          },
          secondary: {
            current: getCount("secondary"),
            insights: [],
          },
          pivotal: {
            current: getCount("pivotal"),
            insights: ["This room is almost at capacity."],
          },
          lobby: {
            current: getCount("lobby"),
            insights: [],
          },
        },
      }
      client.emit("data", data)
    }, interval)
  })
})

export default app
