const winston = require('winston');
const logFilePath = process.env.NODE_ENV === 'test' ? './webapp.log' : '/var/log/webapp/webapp.log';
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format((info, opts) => {
      // let level = info.level.toUpperCase();
      //   if(level === 'VERBOSE') {
      //     level = 'DEBUG';
      //   }

      //   info['severity'] = level;
        delete info["level"];
        return info;
    })(),
  ),
  transports: [
    new winston.transports.Console({ level: 'error' }),
    new winston.transports.File({ filename: logFilePath}),
      ]
});

logger.on('error', (err) => {
  console.error('Winston encountered an error:', err);
});

module.exports=logger