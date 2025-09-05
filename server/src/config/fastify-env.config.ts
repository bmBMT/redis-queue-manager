import { FastifyEnvOptions } from "@fastify/env"

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      CLIENT_URL: string
      TIME_ZONE: string
      PORT: number
    }
  }
}

const schema: FastifyEnvOptions["schema"] = {
  type: "object",
  required: ["CLIENT_URL"],
  properties: {
    CLIENT_URL: {
      type: "string",
    },
    TIME_ZONE: {
      type: "string",
    },
    PORT: {
      type: "number",
    },
  },
}

export const fastifyEnvConfig: FastifyEnvOptions = {
  confKey: "config",
  schema,
  dotenv: true,
  data: process.env,
}
