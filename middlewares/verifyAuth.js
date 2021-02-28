require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

async function verifyAuth(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).json({ auth: false, message: 'Token não provido.'});
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Falha em conectar com o token, talvez ele tenha expirado. Tente logar novamente :).' });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyAuth;
