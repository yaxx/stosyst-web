
export const {
    SERVER_PORT = 8080,
}: any = process.env

export const IN_PRODUCTION = process.env.NODE_ENV === 'production'