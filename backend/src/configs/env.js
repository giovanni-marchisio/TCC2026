const variables = [
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "JWT_SECRET",
    

];

variables.forEach((v) => {
    if (
        process.env[v] === undefined || 
        process.env[v] === null
    ){
        console.log(`${v} não foi encontrada no arquivo .env`);
    }
})