import Http from './Http';

async function getData(path) {
    switch (path) {
        case '/':
            let data = {};
            await Http('get', '/api/book/getBookList', {}).then(res => {
                data = res;
            });
            return data;
        default:
            return { path };
    }
}

export default getData;
