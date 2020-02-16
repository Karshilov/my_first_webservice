const mysql = require('../database/mysql.js')
const dataBase = require('mysql')

module.exports = async (ctx, next) => {
  ctx.db = await mysql.getConnection()
  try { 
    await next()
  } finally {
    await ctx.db.end()
  }
}