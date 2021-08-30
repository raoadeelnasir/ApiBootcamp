const express = require('express');
const dotenv = require("dotenv")
const app = express();

//Env Variables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000

app.get('/api/v1/bootcamps', (req, res) => {
    res.status(200).json({ success: true, msg: "Show all bootcamps" })
})
app.get('/api/v1/bootcamp', (req, res) => {
    res.status(200).json({ scuccess: true, msg: "Show single bootcamp" })
})
app.post("/api/v1/bootcamp/:id", (req, res) => {
    res.status(200).json({ success: true, msg: `Creat bootcamp ${req.params.id}` })
})
app.put('/api/v1/bootcamp/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `update bootcamp ${req.params.id}` })
})
app.delete('/api/v1/bootcamp/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete Bootcamp ${req.params.id}` })

})


app.listen(PORT, console.log(`Server is listing at port ${PORT}`))