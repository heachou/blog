const net = require('net')

const response = `
HTTP/1.1 200 ok
Data: Tue,30 Jun 2020 01:00:00 GMT
Content-Type: text/plain
Connection: Closed
// 上面是描述，下面设计文本内容
Hello word
`
const server= net.createServer(socket=>{
    socket.end(response)
})

server.listen(80,(err)=>{
    console.log('err',err);
})