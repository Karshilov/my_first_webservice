const mysql = require('../../middleware/mysql.js');

exports.route = {
    async post(data = []) {
        const ret = data;
        for (var i = 0; i < 20; i++) {
            if (typeof ret[i.toString()] === 'string') {
                const typeOfAnswer = ret[i.toString()][0] + 'answer';
                //console.log(ret[i.toString()]);
                let form = await this.db.execute(`select ${typeOfAnswer} from questions where id=${i + 1}`);
                if (ret[i.toString()][0] != 'O') {
                    //console.log("gkdgkd");
                    const nowCounter = form[0][0][`${typeOfAnswer}`] + 1;
                    let change = await this.db.execute(`update questions set ${typeOfAnswer}=${nowCounter} where id=${i + 1}`);
                }
                else {
                    //console.log("what happened?");
                    const nowCounter = form[0][0][`${typeOfAnswer}`] + '   ' + ret[i.toString()].substring(2);
                    let change = await this.db.execute(`update questions set ${typeOfAnswer}='${nowCounter}' where id=${i + 1}`);
                }
            }
            else {
                for (var j = 0; j < ret[i.toString()].length; j++) {
                    const str = ret[i.toString()][j];
                    //console.log(`???? ${str}`);
                    const typeOfAnswer = str[0] + 'answer';
                    let form = await this.db.execute(`select ${typeOfAnswer} from questions where id=${i + 1}`);
                    if (str[0] != 'O') {
                        //console.log("gkdgkd");
                        const nowCounter = form[0][0][`${typeOfAnswer}`] + 1;
                        let change = await this.db.execute(`update questions set ${typeOfAnswer}=${nowCounter} where id=${i + 1}`);
                    }
                    else {
                        //console.log("what happened?");
                        const nowCounter = form[0][0][`${typeOfAnswer}`] + '\n' + ret[i.toString].substring(2);
                        let change = await this.db.execute(`update questions set ${typeOfAnswer}='${nowCounter}' where id=${i + 1}`);
                    }
                }
            }
        }
        return 'success';
    }
}