/**
 * API Requests for stores
 */

import axiosClient from "./requests"

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)


export const getAllStores = async () => {
    const rawRequest = await axiosClient.get("store");
    const data = rawRequest.data;
    const finalResults = await populatePhotos(data);
    return finalResults;
}

export const populatePhotos = async(data: object[]) => {
    const output = [];
    
    for (let store of data) {
        console.log(store)
        //let image = await axiosClient.get(`images/stores/${store["store_file_name"]}`);

        store["image"] = `${ROOT_URL}/images/stores/${store["store_file_name"]}`;

        output.push(store); 
    }

    console.log(output);

    return output;
}