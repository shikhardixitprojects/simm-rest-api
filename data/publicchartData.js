const { google } = require('googleapis');
const connect = require('../connect')

async function getPCData(){
    try {
        const jwtClient = await connect();
        let resData = await getPublicChartData(jwtClient);
        return resData;
    } catch (e) {
        console.log(e);
    }
}

async function getPublicChartData(jwtClient) {
    try{
        let spreadsheetId = '1IV4sYNJYeGs4uIAaDs68vxRATUaYUqK6L-uQbDKRJe4';
        let sheetName = 'Sheet1!A2:B100'
        let sheets = google.sheets('v4');
        const res = await sheets.spreadsheets.values.get({
            auth: jwtClient,
            spreadsheetId: spreadsheetId,
            range: sheetName
        })
        return res.data.values;
    }
    catch(err){
        console.log('The API returned an error: ' + err);
    }
}

module.exports = {
    getPCData
}