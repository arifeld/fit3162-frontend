/**
 * API Requests for stores
 */

import axiosClient from "./requests"
import Constants from "expo-constants";
import FormData from "form-data";
import * as FileSystem from 'expo-file-system';

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)



export const createReview = async (storeId: string, userId: number, rating: number, description: string, recommend: boolean, imagesBase64: string[]) => {

    const formData = new FormData();
    
    const request = {
        "review_rating": rating,
        "review_description": description,
        "user_id": userId,
        "store_id": storeId,
        "review_recommended": recommend ? 1 : 0,
        "files": imagesBase64
    }

    //axiosClient.post("review", request)


    axiosClient.post("review", request, {headers: { "Content-Type": "multipart/form-data" }})
        .then((res) => console.log("Success:", res))
        .catch((err) => console.error(err));
}

export const getStoreByID = async(id: string) => {
    const rawRequest = await axiosClient.get(`store/id/${id}`);
    const data = rawRequest.data[0];
    data["image"] = `${ROOT_URL}/images/stores/${data["store_file_name"]}`;
    return data;
}

export const getReviewsByStoreID = async(id: string) => {
    const rawRequest = await axiosClient.get(`review/${id}`);
    return rawRequest.data;
}

export const populatePhotos = async(data: object[]) => {
    const output = [];
    
    for (let store of data) {
        store["image"] = `${ROOT_URL}/images/stores/${store["store_file_name"]}`;
        output.push(store); 
    }
    console.log(output);

    return output;
}

export const createReply = async(reviewId: string, reply: string) => {
    const request = {
        "review_id": reviewId,
        "business_id": 1,
        "review_description": reply
    }

    return axiosClient.post(`review/reply/${reviewId}`, request)
        .then((res) => console.log("Success:", res))
        .catch((err) => console.error(err));
}