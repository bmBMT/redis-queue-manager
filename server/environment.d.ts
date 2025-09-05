declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      TIME_ZONE: string;
      PORT: string;
    }
  }
}

export {}