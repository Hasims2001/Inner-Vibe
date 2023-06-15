import axios from "axios";
const baseurl = `https://important-boot-bat.cyclic.app`;
// get
export  function fetchData (){
    let url = `${baseurl}/products`;
    return axios.get(`${url}`);
}

export function singleData (id){
    let url = `${baseurl}/products/${id}`;
    return axios.get(`${url}`);
}


// user get
export function getUserData (){
    let url = `${baseurl}/users`;
    return axios.get(`${url}`);
}
// user post
export function postUserData (data){
    console.log(data);
    let url = `${baseurl}/users`;
    return axios.post(`${url}`, {...data});
}

