import axios from "axios";
const baseurl = `https://inner-vibe.onrender.com`;
// get
export  function fetchData (){
    let url = `${baseurl}/products`;
    return axios.get(`${url}`);
}

export function fetchProductData(sorting, search){
    let url = `${baseurl}/products`;
    if(search && sorting){
        url += `?q=${search}&_sort=price&_order=${sorting}`;
    }else if(search && !sorting){
        url += `?q=${search}`;
    }else if(!search && sorting){
        url += `?_sort=price&_order=${sorting}`;
    }

    console.log(url);
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
    let url = `${baseurl}/users`;
    return axios.post(`${url}`, {...data});
}


// sale get
export function fetchSalesData (id){
    let url = `${baseurl}/sales?userId_like=${id}`;
    return axios.get(`${url}`);
}
// sale post
export function postSalesData (data){
    let url = `${baseurl}/sales`;
    return axios.post(`${url}`, {...data});
}


// blog get
export function fetchBlogData (page, limit){
    let url = `${baseurl}/blogpost`;
    console.log(page, limit);
    if(page && limit){
        url += `?_page=${page}&_limit=${limit}`;
    }
    return axios.get(`${url}`);
}

// blogId get
export function fetchBlogIdData (id){
    let url = `${baseurl}/blogpost/${id}`;
    return axios.get(`${url}`);
}



// Admin side
// Login Post
export function loginAdmin (){
    let url = `${baseurl}/admins`;
    return axios.get(`${url}`);
}

// whole data
export function wholeData (){
    return axios.get(`${baseurl}`);
}