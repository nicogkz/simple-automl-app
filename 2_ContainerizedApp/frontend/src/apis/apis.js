import axios from "axios";
import { config } from "../configs/configs";

const headers = {'content-type': 'application/json'}

export function testAPI(){
    return axios.get(`${config.api_url}/`,{headers: headers})
    .then((res)=>{
        return res
    })
    .catch((err) => {
        return err
    })
}

export function postEstimation(data){
    return axios.post(`${config.api_url}/api/v1/estimate`,data,{headers: headers})
    .then((res)=>{
        return res
    })
    .catch((err) => {
        return err
    })
}