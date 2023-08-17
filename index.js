const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log("web running on "+process.env.PORT)
})