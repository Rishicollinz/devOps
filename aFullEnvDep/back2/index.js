const express = require('express')
const app = express()
const port = 3000

app.get('/api', (req, res) => {
  res.send('This is from the server!')
})
app.get('/api/1',(req,res)=>{
  res.send("This is api 1")
})
app.get('/api/2',(req,res)=>{
  res.send("This is api 2")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
