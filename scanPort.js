const net = require("net");
const portDictionary = require('./portDictionary').ports;

module.exports = (port, options) => {
    const s = new net.Socket();

    // console.log({options});

    s.setTimeout(options['timeout'], () => s.destroy());
    s.connect(port, options['host'], () => {
        // console.log(`[${portDictionary[port]}] ${port} Open`)
    });
    s.on('data', (data) => {
        // console.log(`[${portDictionary[port]}] ${port} Data: ${data}`);
        s.destroy();
    });
    s.on('error', (error) => {
        s.destroy();
    })
}