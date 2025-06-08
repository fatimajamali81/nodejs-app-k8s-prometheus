const client = require('prom-client');
const register = new client.Registry();

// create counters for our routes
const gandalfCounter = new client.Counter({
    name: 'gandalf_requests_total',
    help: 'Total number of requests to /gandalf',
    registers: [register],
});

const colomboCounter = new client.Counter({
    name: 'colombo_requests_total',
    help: 'Total number of requests to /colombo',
    registers: [register],
});

module.exports = { register, gandalfCounter, colomboCounter };
