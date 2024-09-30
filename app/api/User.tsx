import axiosClient from "./requests"

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)

export const getUserIdByEmail = async (email: string) => {
    const rawRequest = await axiosClient.get(`user/email/${email}`);

    // Correctly extract the data from the response object
    const data = rawRequest.data.result;  // Access the 'result' field directly
    console.log("data", data);  // This should now log the user_id correctly (e.g., 2)
    
    return data;
}

export const getUserNameFromId = async (id: number) => {
    const rawRequest = await axiosClient.get(`user/name/${id}`);

    // Correctly extract the data from the response object
    const data = rawRequest.data.result;  // Access the 'result' field directly
    console.log("data", data);  // This should now log the user_id correctly (e.g., 2)
    
    return data;
}

export const updateUserName = async (user_id: number, user_username: string) => {
    const rawRequest = await axiosClient.put(`user/${user_id}`, { user_username });

    // Correctly extract the data from the response object
    const data = rawRequest.data.result;  // Access the 'result' field directly
    console.log("data", data);  // This should now log the user_id correctly (e.g., 2)
    
    return data;
}


