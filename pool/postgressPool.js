
const Pool = require('pg').Pool;

const poolPostgress = new Pool({
    user: "admin",
    password: "admin",
    database: "api",
    host: "postgresql",
    port: "5432"
});

module.exports = poolPostgress;
