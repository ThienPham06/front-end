import { API_BASE_URL, ACCESS_TOKEN } from '../constant';
// import { func } from '../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/@types/prop-types';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => {
        if(response.ok){
        return response.json()
       }else{
       throw new Error('Something went wrong...')
     }
    });
              
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(loginRequest)
    });
}
