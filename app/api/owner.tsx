/**
 * API Requests for stores
 */

import axiosClient from "./requests"

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)

export const getBusinessByOwnerID = async(id: string) => {
    const rawRequest = await axiosClient.get(`owner/business/${id}`);

    // Correctly extract the data from the response object
    const data = rawRequest.data.result;  // Access the 'result' field directly
    console.log("data", data);  // This should now log the user_id correctly (e.g., 2)
    
    return data;
}

export const getOwnerIdByEmail = async (email: string) => {
    const rawRequest = await axiosClient.get(`owner/email/${email}`);

    // Correctly extract the data from the response object
    const data = rawRequest.data.result;  // Access the 'result' field directly
    console.log("data", data);  // This should now log the user_id correctly (e.g., 2)
    
    return data;
}
