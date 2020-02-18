const mysql = require('../../middleware/mysql.js');
exports.route = {
    async post(data = []) {
        const ret = data;
        console.log("success enter");
        console.log(data);
        console.log(ret);
        for (var i = 0; i < ret.keys.length; i++) {
            if (typeof ret[`${i}`] === 'string') {
                const typeOfAnswer = ret[`${i}`][0] + 'answer';
                console.log(`select ${typeOfAnswer} from questions`);
                let form = await this.db.execute(`select ${typeOfAnswer} from Q${i + 1}`);
                console.log(form);
                if (ret[`${i}`][0] != 'O') {
                    const nowCounter = form.rows[0][0] + 1;
                    let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                }
                else {
                    const nowCounter = form.rows[0][0] + '\n' + ret[`${i}`].substring(2);
                    let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                }
            }
            else {
                for (var str in ret[`${i}`]) {
                    const typeOfAnswer = str[0] + 'answer';
                    let form = await this.db.execute(`select ${typeOfAnswer} from Q${i + 1}`);
                    if (str[0] != 'O') {
                        const nowCounter = form.rows[0][0] + 1;
                        let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                    }
                    else {
                        const nowCounter = form.rows[0][0] + '\n' + ret[`${i}`].substring(2);
                        let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                    }
                }
            }
        }
    }
}