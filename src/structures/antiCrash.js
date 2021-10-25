module.exports = client => {
   process.on('unhandledRejection', (reason, p) => {
        console.log(' [AntiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        console.log(' [AntiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
    }) 
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [AntiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [AntiCrash] :: Multiple Resolves');
        console.log(type, promise, reason);
    });
}