declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PORT: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}
