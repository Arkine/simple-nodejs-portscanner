const net = require("net");
const portDictionary = require('./portDictionary').ports;
const chalk = require('chalk');

module.exports = (port, options) => {
    const s = new net.Socket();

    const formatName = portObj => Array.isArray(portObj) ? portObj.map(i => i['description']).join(' | ') : portObj['description'] ;
    
    const log = (port, portObj, data = null) => {
        console.log(`${chalk.green('PORT:')} ${port}`)
        console.log(`${chalk.green('DESCRIPTION:')} ${formatName(portObj)}`)
        if (data) console.log(`${chalk.green('DATA:')} ${data}`)
        console.log('==================================');
    }

    // console.log({options});

    s.setTimeout(options['timeout'], () => s.destroy());
    s.connect(port, options['host'], () => {
        log(port, portDictionary[port]);
    });
    s.on('data', (data) => {
        log(port, portDictionary[port], data);
        s.destroy();
    });
    s.on('error', (error) => {
        s.destroy();
    })
}