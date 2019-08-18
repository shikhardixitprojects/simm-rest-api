const fs = require('mz/fs');
const { google } = require('googleapis');
const aws = require('aws-sdk');

async function connect() {
    if (NODE_ENV === 'production') {
        let s3 = new aws.S3({
            prodClientEmail: process.env.client_email,
            prodPrivateKey: process.env.private_key
        });
        let jwtClient = new google.auth.JWT(
            process.env.client_email,
            null,
            process.env.private_key,
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
}

module.exports = connect;