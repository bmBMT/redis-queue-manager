declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string;
      TIME_ZONE: string;
      PORT: string;
      AUTH_SECRET: string;
      NODE_ENV: 'development' | 'production'
    }
  }
}

export {}