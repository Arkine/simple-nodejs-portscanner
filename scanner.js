
const commandLineArgs = require('command-line-args');
const scanPort = require('./scanPort.js');
const dns = require('dns');

const optionDefaults = [
    {
        name: 'startPort',
        alias: 's',
        type: Number
    },
    {
        name: 'endPort',
        alias: 'e',
        type: Number,
    },
    {
        name: 'target',
        alias: 't',
        type: String
    }
];

const options = commandLineArgs(optionDefaults);

const host = options['target'];
let startPort = options['startPort'];
const endPort = options['endPort'];
const timeout = options['timeout'];

const scannerOptions = {
    host,
    startPort,
    endPort,
    timeout
};

// sockets should timeout asap to ensure no resources are wasted
// but too low a timeout value increases the likelyhood of missing open sockets, so be careful


while (startPort <= endPort)  {
    const port = startPort;
    
    dns.lookup(host, (err, hostIp) => {
        console.log(`Scanning ${host}:${hostIp}`)
        scanPort(port, scannerOptions);
    })


    startPort++;
}