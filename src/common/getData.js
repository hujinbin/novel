import axiosHttp from './axiosHttp';

async function getData(path) {
    switch (path) {
        case '/':
            let data = {};
            await axiosHttp.config({ url: '/api/book/getBookList' }).then(res => {
                data = res;
            });
            return data;
        default:
            return { path };
    }
}

export default getData;
