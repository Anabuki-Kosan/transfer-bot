const fs = require('fs');
module.exports = function checkHoliday() {

    const jsonObject = JSON.parse(fs.readFileSync('holidays.json', 'utf8'));
    const holidaysArray = jsonObject.holidays
    const result = [];

    holidaysArray.forEach((obj) => {
        result.push(obj.date)
    });

    const today = new Date();
    /** 文字列に日付をフォーマットする */
    const formatted = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');


    if(result.includes(formatted)){
        return false
    } else {
        return true
    }
}
