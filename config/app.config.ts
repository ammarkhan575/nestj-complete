// without namespace configuration
const APP_CONFIG = () => {
    return {
        appName: 'MyApp',
        version: '1.0.0',
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
        jwtSecret: process.env.JWT_SECRET,
        nested: {
            key: 'value',
            anotherKey: {
                subKey: 'subValue'
            }
        }
    }
}

export default APP_CONFIG;