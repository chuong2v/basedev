import winston from 'winston'
import 'winston-daily-rotate-file'

let logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      filename: './log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      level: 'debug',
      colorize: true,
      timestamp: true
    }),

    new winston.transports.DailyRotateFile({
      filename: '/data/logs/basedev/log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      level: 'debug',
      timestamp: true,
      json: false
    })
  ]
})

export default logger