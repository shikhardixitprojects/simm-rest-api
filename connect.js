const fs = require('mz/fs');
const { google } = require('googleapis');

async function connect() {
    let content = await fs.readFile('simm-charts-dev1-822a74aec109.json');
    let parsedContent = JSON.parse(content);
    let jwtClient = new google.auth.JWT(
        parsedContent.client_email,
        null,
        parsedContent.private_key,
        ['https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive']);

    jwtClient.authorize((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Successfully connected!");
        }
    })
    return jwtClient;
}

module.exports = connect;