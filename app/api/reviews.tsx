/**
 * API Requests for stores
 */

import axiosClient from "./requests"
import Constants from "expo-constants";
import FormData from "form-data";
import * as FileSystem from 'expo-file-system';

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)



export const createReview = async (storeId: string, userId: number, rating: number, description: string, recommend: boolean, images: string[]) => {

    const formData = new FormData();
    
    const request = {
        "review_rating": rating,
        "review_description": description,
        "user_id": userId,
        "store_id": storeId,
        "review_recommended": recommend ? 1 : 0,
        "files": images.map((image, index) => { return { "uri": image, "name": `${index}.jpeg`, "type": "image/jpeg"} })
    }

    axiosClient.post("review", request).then(async (res) => {
        const options: FileSystem.FileSystemUploadOptions = {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "image/jpeg, image/png",
            },
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "image",
          };
          
          const response = await FileSystem.uploadAsync(
            `${ROOT_URL}/image/review/${res.data.id}`,
            images[0] || "",
            options
          );

    })


    return axiosClient.post("review", request);
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