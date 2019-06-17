const React=require('react');
const { renderToStaticMarkup }=require('react-dom/server');
const { StaticRouter }=require('react-router-dom');
// import { Provider } from 'react-redux';
// import store from '../../client/redux/store.js';

// import { RoutesIndex, routes } from '../../src/router/index.jsx';
// import getData from '../../client/common/getData';

async function reactRoute(ctx, next) {
    // for (let item of routes) {
    //     if (item.path == ctx.url) {
    //         const data = await getData(ctx.url);
    //         await ctx.render('index', {
    //             root: renderToStaticMarkup(
    //                 // <Provider store={store}>
    //                     <StaticRouter location={ctx.url} context={data}>
    //                         <RoutesIndex {...store.getState()} />
    //                     </StaticRouter>
    //                 // </Provider>
    //             )
    //         });
    //         break;
    //     }
    // }
    await next();
}

module.exports=reactRoute;