export const databaseConfig = {
  host: process.env.MYSQL_HOST || 'db',
  port: parseInt(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  databaseName: process.env.MYSQL_DATABASE
}
