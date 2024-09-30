/**
 * API Requests for stores
 */

import axiosClient from "./requests"

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)


export const loginOwner = async (owner_email: string, owner_password: string) => {
    const request = {
        "owner_email": owner_email,
        "owner_password": owner_password,
    }

    console.log(request);

    return axiosClient.post("owner/login", request);

}
