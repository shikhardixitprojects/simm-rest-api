const { google } = require('googleapis');
const connect = require('../connect')


async function getPrivateRawData(){
    try {
        const jwtClient = await connect();
        let resData = await getPrivateData(jwtClient);
        return resData;
    } catch (e) {
        console.log(e);
    }
}

async function getPrivateData(jwtClient) {
    try{
        let spreadsheetId = '1kyfMnAIx5dx-D26uicPynO1lT10j693lPgtxTZXdRSI';
        let sheetName = 'Portfolio!A2:AK30'
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
    getPrivateRawData
}