const express = require("express")
const server = express()


server.get("/", (req, res) => {
  return res.status(200).json({
    message: " Created a new mongo app"
  })
})


server.listen(2000, () => {
  console.log("server is listening on port 2000")
})
