const winston = require('winston');
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    //new winston.transports.Console({ level: 'error' }),
    // new line
    new winston.transports.File({ filename: '/var/log/webapp/webapp.log', level: 'info'}),
      ]
});

logger.on('error', (err) => {
  console.error('Winston encountered an error:', err);
});


// Test logging
logger.info('Test log message');
module.exports=logger