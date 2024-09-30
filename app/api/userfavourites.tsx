/**
 * API Requests for stores
 */

import axiosClient from "./requests"

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)


export const addToFavourites = async (  user_id: number, store_id: number) => {
    const request = {
        "user_id": user_id,
        "store_id": store_id,
    }

    console.log(request)

    return axiosClient.post("favourite", request);

}

export const removeFromFavourites = async (user_id:number, store_id:number) => {
    const request = {
        "user_id": user_id,
        "store_id": store_id,
    }   
    

    console.log(request);

    return axiosClient.post("favourite/remove", request);

}


export const checkFavourites = async (user_id:number, store_id:number) => {
    

    const rawRequest = await axiosClient.get(`favourite/${user_id}/${store_id}`);
    const data = rawRequest.data;
    console.log("this is checkfav");
    console.log(data);
    return data;
}


