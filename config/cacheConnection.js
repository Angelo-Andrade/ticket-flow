const redis = require('redis');
require('dotenv').config({ path: './config/infoconn.env' });

module.exports.createClient = () => redis.createClient({
    socket: {
        host: process.env.DB_CACHE_HOST,
        port: process.env.DB_CACHE_PORT,
        tls: true, // Ative TLS se exigido pelo serviço Redis
    },
    username: process.env.DB_CACHE_USER,
    password: process.env.DB_CACHE_PASSWORD,
});
