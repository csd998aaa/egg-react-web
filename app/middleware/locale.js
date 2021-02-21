module.exports = () => {
    return async function i18n(ctx, next) {
        ctx.locals = {
            globalData: "Chenshaodu"
        }
        
        await next()
    }
}