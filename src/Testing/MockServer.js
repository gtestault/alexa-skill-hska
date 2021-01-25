const mockserver = require('mockserver');
const http = require('http')

class MockServer {
   constructor(port) {
       this.port = port || 9001
       this.server = http.createServer(mockserver('src/Testing/Mock/MockResponses')).listen(this.port);
   }
   getServerAddress() {
       return "http://localhost:" + this.port
   }
}
class MockServerFactory {
    static init() {
        this.getInstance()
        return this
    }
    static getInstance() {
        if (!this.instance) {
            console.log("creating mock server")
            this.instance = new MockServer()
        }
        return this.instance
    }
}
module.exports = MockServerFactory
