
export const {
    SERVER_PORT = 4000,
}: any = process.env

export const IN_PRODUCTION = process.env.NODE_ENV === 'production' 
  