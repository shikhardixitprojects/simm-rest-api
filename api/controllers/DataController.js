/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const authData = require('../../data/authdata')
 const publicChartData = require('../../data/publicchartData')
 const privateData = require('../../data/privateRawData')

module.exports = {

    welcome: (req, res) => {
        return res.send('Welcome to SIMM App RESTful API')
    },
    checkAuthData: async(req, res) => {
        const isAuthorized = await authData.checkAuthorized(req.body.email);
        return res.send(isAuthorized);
    },
    getAuthData: async (req, res) => {
        return res.send('Nice Try.');
    },
    getPublicChartData: async(req,res) => {
        const pcData = await publicChartData.getPCData();
        return res.send(pcData);
    },
    getPrivateChartData: async(req,res) => {
        const privData = await privateData.getPrivateRawData();
        return res.send(privData);
    }

}

