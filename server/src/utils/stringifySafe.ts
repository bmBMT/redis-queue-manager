export const stringifySafe = (value: any, replacer?: (number | string)[] | null, space?: string | number): string => {
  try {
    return JSON.stringify(value, replacer, space)
  } catch {
    return "[Unserializable Payload]"
  }
}
