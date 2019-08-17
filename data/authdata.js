const { google } = require('googleapis');
const connect = require('../connect')

async function checkAuthorized(incomingEmail) {
    const authorizedEmails = await getAuthEmails();
    return authorizedEmails.includes(incomingEmail) ? true : false
}

async function getAuthEmails() {
    try {
        const jwtClient = await connect();
        let resData = await getAuthData(jwtClient);
        resData = resData.map(authEmail => authEmail.join(''));
        return resData;
    } catch (e) {
        console.log(e);
    }
}

async function getAuthData(jwtClient) {
    try{
        let spreadsheetId = '1EHbi5KyYD1vfLDNHFLbQzha57FeKWNHCtCsxZIWkQto';
        let sheetName = 'AuthData!A1:A100'
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
    checkAuthorized
};