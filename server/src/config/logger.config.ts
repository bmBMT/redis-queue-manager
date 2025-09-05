import * as winston from "winston"
import "winston-daily-rotate-file"
import dayjs from "dayjs"

const options = {
  file: {
    json: true,
    datePattern: "DD-MM-YYYY",
    handleExceptions: false,
    handleRejections: false,
    zippedArchive: true,
    maxSize: "5m",
    maxFiles: "30d",
  },
  console: {
    level: "debug",
    handleExceptions: false,
    handleRejections: false,
    json: false,
    colorize: true,
  },
}

const infoTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: "info",
  filename: `${__dirname}/../../logs/info-%DATE%.log`,
})

const errorTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: "error",
  filename: `${__dirname}/../../logs/ERRORS-%DATE%.log`,
})

const debugTransport = new winston.transports.DailyRotateFile({
  ...options.file,
  level: "debug",
  filename: `${__dirname}/../../logs/DEBUG-%DATE%.log`,
})

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.ms()
  ),
})

const timestampFormat = () =>
  new Date().toLocaleString("en-GB", {
    timeZone: process.env.TIME_ZONE,
    hour12: false,
  })

// const requestTransport = new winston.transports.DailyRotateFile({
//   ...options.file,
//   level: "request",
//   filename: `${__dirname}/../../logs/request-%DATE%.log`,
//   format: winston.format.combine(
//     winston.format.combine(),
//     winston.format.timestamp({
//       format: timestampFormat,
//     }),
//     winston.format.printf(
//       (info) =>
//         `[${dayjs(info.timestamp as any, "DD/MM/YYYY, hh:mm:ss").format("DD-MM-YYYY, HH:mm:ss Z")}] ${
//           info.level
//         }: ${"request"}`
//     )
//   ),
// })

export const loggerInstance = winston.createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    trace: 4,
    debug: 5,
    request: 6,
  },

  format: winston.format.combine(
    winston.format.combine(),
    winston.format.timestamp({
      format: timestampFormat,
    }),
    winston.format.printf(
      (info) =>
        `[${dayjs(info.timestamp as any, "DD/MM/YYYY, hh:mm:ss").format("DD-MM-YYYY, HH:mm:ss Z")}] ${info.level}: ${
          info.message
        }`
    )
  ),
  transports: [infoTransport, errorTransport, debugTransport, consoleTransport],
  exitOnError: false,
}) as Exclude<winston.Logger, "silent"> & {
  fatal: winston.LeveledLogMethod
  trace: winston.LeveledLogMethod
  msgPrefix: string
  silent: winston.LeveledLogMethod
}

delete (loggerInstance as any).msgPrefix

loggerInstance.fatal = loggerInstance.error
loggerInstance.trace = loggerInstance.debug
