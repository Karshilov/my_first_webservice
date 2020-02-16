const mysql = require('../../middleware/mysql.js');
exports.route = {
    async post(data = []) {
        (async () => {
            const ret = data;
            for (var i = 0; i < ret.length; i++) {
                if (typeof ret[i] === 'string') {
                    const typeOfAnswer = ret[i][0] + 'answer';
                    let form = await this.db.execute(`select ${typeOfAnswer} from Q${i + 1}`);
                    if (ret[i][0] != 'O') {
                        const nowCounter = form.rows[0][0] + 1;
                        let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                    }
                    else {
                        const nowCounter = form.rows[0][0] + '\n' + ret[i].substring(2);
                        let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                    }
                }
                else {
                    for (var str in ret[i]) {
                        const typeOfAnswer = str[0] + 'answer';
                        let form = await this.db.execute(`select ${typeOfAnswer} from Q${i + 1}`);
                        if (str[0] != 'O') {
                            const nowCounter = form.rows[0][0] + 1;
                            let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                        }
                        else {
                            const nowCounter = form.rows[0][0] + '\n' + ret[i].substring(2);
                            let change = await this.db.execute(`update Q${i + 1} set ${typeOfAnswer}=${nowCounter}`);
                        }
                    }
                }
            }
        });
        /*      return await this.userCache('1mo+', async () => {
                const { cardnum } = this.user
                if (!cardnum.startsWith('213')) {
                  throw '只允许本科生查询'
                }
                let record = await this.db.execute(
                  `select T_BZKS.SSFJH from TOMMY.T_BZKS
                where XH= :cardnum
                `, [cardnum])
                let result = record.rows.map(Element => {
                  let [SSFJH] = Element
                  return { SSFJH }
                })
                result = result[0]
                let campus = '四牌楼'
                if (result.SSFJH.indexOf('梅园') !== -1 || result.SSFJH.indexOf('桃园') !== -1 || result.SSFJH.indexOf('橘园') !== -1) {
                  campus = '九龙湖'
                }
                result.campus = campus
                return result
              })
        */
    }
}