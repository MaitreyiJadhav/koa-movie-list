const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('db')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
  const dbtitle = await ctx.request.body.title
  const item = await show(dbtitle)
  ctx.body = item
})

async function show(title) {
  try {
    // const itemData = await pool.query(`SELECT * FROM blogPosts WHERE blogTitle  LIKE '%${title}%'`)
    const itemData = await pool.query(`SELECT *FROM movies WHERE movieWatched = 1 '%${title}%'`)
    return itemData[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()



