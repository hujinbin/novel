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
            if(ctx.method === 'GET' && String(ctx.path).indexOf('/api/') === -1){
                await ctx.render('404')
            }else{
                ctx.body = "404  | Page Not Found";
            }
        } else if (status === 500) {
            ctx.body = "500  | Internal Server Error";
        }
    }
};