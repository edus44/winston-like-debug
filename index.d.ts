import winston from 'winston'

export function likeDebug(options?: { colors?: boolean }): winston.Logform.Format

export function withNamespace(
  logger: winston.Logger
): (module: string | { filename: string }) => winston.Logger
