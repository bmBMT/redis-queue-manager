import { loggerInstance } from "@/config/logger.config"
import { middleware } from "@/config/trpc.config"
import { maskSensitiveFields } from "@/utils/maskSensitiveFields"
import { stringifySafe } from "@/utils/stringifySafe"

export default async (opts: any) => {
  const requestStart = Date.now()

  const result = await opts.next()
  const duration = Date.now() - requestStart

  if (result.ok)
    loggerInstance.info(
      `✔ tRPC Request\n` +
        `  • Type: ${opts.type}\n` +
        `  • Path: ${opts.path}\n` +
        `  • Duration: ${duration}ms\n` +
        `  • Context: ${stringifySafe(maskSensitiveFields(opts.ctx)) || "[Empty Context]"}\n` +
        `  • Input: ${stringifySafe(maskSensitiveFields(opts.input)) || "[Empty Input]"}\n` +
        `  • Result: ${stringifySafe(maskSensitiveFields(result.data))}`
    )
  else
    loggerInstance.error(
      `✘ tRPC Request\n` +
        `  • Type: ${opts.type}\n` +
        `  • Path: ${opts.path}\n` +
        `  • Duration: ${duration}ms\n` +
        `  • Context: ${stringifySafe(maskSensitiveFields(opts.ctx)) || "[Empty Context]"}\n` +
        `  • Input: ${stringifySafe(maskSensitiveFields(opts.input)) || "[Empty Input]"}\n` +
        `  • Message: ${result.error.message}`
    )

  return result
}
