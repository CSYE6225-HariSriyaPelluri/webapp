const winston = require('winston');
const logFilePath = process.env.NODE_ENV === 'test' ? './webapp.log' : '/var/log/webapp/webapp.log';
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    //new winston.transports.Console({ level: 'error' }),
    // new line
    new winston.transports.File({ filename: logFilePath, level: 'info'}),
      ]
});

logger.on('error', (err) => {
  console.error('Winston encountered an error:', err);
});


// Test logging
logger.info('Test log message');
module.exports=logger