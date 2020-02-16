const config = require('./default.js')
const mysql = require('mysql')

mysql.autoCommit = true
let connectionPool = null

module.exports = {
  async getConnection() {
    if(!connectionPool){
      connectionPool = await mysql.createPool({ 
        ...config.sqlBase
      })
    }
    return await connectionPool.getConnection(function(err, connection) {if (err) throw err})
  },
}