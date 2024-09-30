/**
 * API Requests for stores
 */

import axiosClient from "./requests"

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)


export const createUser = async (  user_email: string, user_password: string, user_username: string) => {
    const request = {
        "user_email": user_email,
        "user_password": user_password ,
        "user_username": user_username,
    }

    console.log(request)

    return axiosClient.post("user", request);
}

export const loginUser = async (user_email: string, user_password: string) => {
    const request = {
        "user_email": user_email,
        "user_password": user_password,
    }

    console.log(request);

    return axiosClient.post("user/login", request);

}
