const { spawn } = require('child_process');
const path = require('path');
const process = require('process');

const args = process.argv.slice(2);
const folderPath = args[0] || '../images';

const absolutePath = path.resolve(folderPath);

// 启动 http-server
const httpServer = spawn('http-server', [absolutePath, '-p', '8080', '--cors', '-c-1'], { stdio: 'inherit' });

httpServer.on('close', (code) => {
  console.log(`http-server process exited with code ${code}`);
});

// 启动 server.js，并传递文件路径参数
const mainServer = spawn('node', ['server.js', absolutePath], { stdio: 'inherit' });

mainServer.on('close', (code) => {
  console.log(`server.js process exited with code ${code}`);
});

// 处理进程终止事件，确保服务器关闭
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  httpServer.kill('SIGINT');
  mainServer.kill('SIGINT');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Shutting down servers...');
  httpServer.kill('SIGTERM');
  mainServer.kill('SIGTERM');
  process.exit();
});
