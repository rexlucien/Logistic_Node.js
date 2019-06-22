/**
 * Created by ying.wu on 2017/7/10.
 */
const version = require('./ecpay_logistics/version.js');
const create_client = require('./ecpay_logistics/create_client.js');
const query_client = require('./ecpay_logistics/query_client.js');
const return_client = require('./ecpay_logistics/return_client.js');
const c2c_process_client = require('./ecpay_logistics/c2c_process_client.js');

class ECPayLogistics {
    constructor(params) {
        this.version = new version();
        this.create_client = new create_client(params);
        this.query_client = new query_client(params);
        this.return_client = new return_client(params);
        this.c2c_process_client = new c2c_process_client(params);
    }
}
module.exports = ECPayLogistics;
