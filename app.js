const express = require('express')
const path = require('path')
const app = express()


app.use(express.static(path.join(__dirname, 'dist')))
app.listen(8081,() => {
    console.log('app listening on port 8081.')
})


