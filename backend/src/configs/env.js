const envVars = [
    'DB_HOST',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'JWT_SECRET'
]

envVars.forEach((v) => {
    if (process.env[v] === undefined || process.env[v] === null){
        throw new Error(`${v} não foi encontrada!`);
    }
})