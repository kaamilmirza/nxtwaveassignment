interface Config {
    jwtSecret: string;
}

const config: Config = {
    jwtSecret: process.env.JWT_SECRET || 'defaultSecret'
}

export default config;
