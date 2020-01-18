import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../src/redux/store.js';

import { RoutesIndex, routes } from '../../src/router/index.jsx';
import getData from '../../src/common/getData';

async function reactRoute(ctx, next) {
    const url = ctx.request.path
    for (let item of routes) {
        let itemPath = item.path
        // 判断是否有子页面 统一/:id处理
        if(String(item.path).indexOf('/:id') != -1){
           let path = String(item.path).match(/\/(\S*)\//)[1]
           const urlParamsList = String(url).split('/')
           if(urlParamsList.length ===3 && urlParamsList[1] === path){
            itemPath = url
           }
        }
        if (itemPath == url) {
            const data = await getData(ctx.request.path);
            await ctx.render('index', {
                title: item.name ? item.name+ '-' : '',
                root: renderToStaticMarkup(
                    <Provider store={store}>
                        <StaticRouter location={ctx.url} context={data}>
                            <RoutesIndex {...store.getState()} />
                        </StaticRouter>
                    </Provider>
                )
            });
            break;
        }
    }
    await next();
}

export default reactRoute;
