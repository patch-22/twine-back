import fs from "fs"
import low from "lowdb"
import FileSync from "lowdb/adapters/FileSync"
import Memory from "lowdb/adapters/Memory"

const shouldSaveThisBullshit = true

const db = low(!shouldSaveThisBullshit ? new Memory() : new FileSync("db.json"))

db.defaults({ events: [] }).write()

export default db
