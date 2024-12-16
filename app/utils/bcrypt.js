const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    bcryptGenerateHash: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds).then((hash) => {
                if (hash) return resolve(hash);

                reject(new Error("Falha ao gerar o hash"));
                
            }).catch((error) => {
                reject(error);
            });
        });
    },
    
    bcryptCompareHash: (password, hash) => {
        return new Promise((resolve, reject)=>{
            bcrypt.compare(password, hash).then(function(result) {
                return resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}