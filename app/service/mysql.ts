import * as mysql from "mysql" // https://www.npmjs.com/package/mysql
function createMysqlConnection(database) {
    return mysql.createConnection({
      host: "10.99.1.110",
      port: 3306,
      user: "root",
      password: "flashcat.cloud",
      database,
    })
}

export function mysqlQuery<T>(
  database: string,
  query: string,
  value?: (string | number)[] | Record<string, string | number>
): Promise<T> {
  const connection = createMysqlConnection(database)
  connection.connect()
  return new Promise((resolve, reject) => {
    connection.query(query, value, (err, rows: T) => {
      if (err) reject(err)
      connection.end()
      resolve(rows)
    })
  })
}
