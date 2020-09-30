const net = require("net");
const portDictionary = require('./portDictionary').ports;

module.exports = (port, options) => {
    const s = new net.Socket();

    // console.log({options});

    s.setTimeout(options['timeout'], () => s.destroy());
    s.connect(port, options['host'], () => {
        const name = Array.isArray(portDictionary[port]) ? portDictionary[port].reduce((prev, curr, i) => `${prev} | ${curr['description']}`, '') : portDictionary[port]['description'] ;
       
        console.log(`PORT: ${port}`)
        console.log(`DESCRIPTION: [${name}]`)
        console.log('==================================');
    });
    s.on('data', (data) => {
        const name = Array.isArray(portDictionary[port]) ? portDictionary[port].reduce((prev, curr, i) => `${prev} | ${curr['description']}`, '') : portDictionary[port]['description'] ;
        
        console.log(`PORT: ${port}`)
        console.log(`DESCRIPTION: [${name}]`)
        console.log(`DATA: [${data}]`)
        console.log('==================================');
        s.destroy();
    });
    s.on('error', (error) => {
        s.destroy();
    })
}