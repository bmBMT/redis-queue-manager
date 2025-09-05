export const maskSensitiveFields = (obj: any): any => {
  const mask = (val: any) => (typeof val === "string" ? "******" : val)
  if (Array.isArray(obj)) {
    return obj.map((item) => maskSensitiveFields(item))
  } else if (obj && typeof obj === "object") {
    const clone: Record<string, any> = {}
    for (const key of Object.keys(obj)) {
      const lowerKey = key.toLowerCase()
      if (lowerKey.includes("password") || lowerKey.includes("token")) {
        clone[key] = mask(obj[key])
      } else {
        clone[key] = maskSensitiveFields(obj[key])
      }
    }
    return clone
  }
  return obj
}
