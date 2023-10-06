const fs = require('node:fs');

async function get() {
    return await new Promise((resolve,reject) => {
        fs.readdir('./public/images/Galery', (err, files) => {
            if (err) {
                console.log(err);
            } else {
                files.forEach((element) => console.log(element));
                resolve(files);
            }
        });
    })

}

module.exports = {get};