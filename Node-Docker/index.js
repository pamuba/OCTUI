const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("<h2>Server Running!!!</h2>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on PORT: ${port}`))