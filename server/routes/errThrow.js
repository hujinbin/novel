module.exports = async(ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.throw(404);
        }
    } catch (err) {
        const status = err.status || 500;
        ctx.status = status;
        if (status === 404) {
            ctx.body = "404"
        } else if (status === 500) {
            ctx.body = "500";
        }
    }
};