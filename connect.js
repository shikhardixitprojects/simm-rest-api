const fs = require('mz/fs');
const { google } = require('googleapis');

async function connect() {
    if (process.env.NODE_ENV === 'production') {
        let jwtClient = new google.auth.JWT(
            process.env.client_email,
            null,
            process.env.private_key.replace(/\\n/g, '\n'),
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
    } else {
        let content = await fs.readFile('simm-charts-dev1-822a74aec109.json');
        let parsedContent = JSON.parse(content);
        let jwtClient = new google.auth.JWT(
            parsedContent.client_email,
            null,
            parsedContent.private_key.replace(/\\n/g, '\n'),
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
}

module.exports = connect;