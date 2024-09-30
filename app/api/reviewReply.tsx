/*
API Request for review replies
*/

import axiosClient from "./requests"
import Constants from "expo-constants";
import FormData from "form-data";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)

export const createReviewReply = async (reviewId: number, replyText: string, ownerId: number) => {
    
    const request = {
        "reviewId": reviewId,
        "replyText": replyText,
        "ownerId": 100
    }

    try {
        const response = await axiosClient.post("reply", request);
        return response.data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

export const getReplyByReviewId = async (reviewId: number) => {
    try {
        const response = await axiosClient.get(`reply/${reviewId}`);
        if (!response || response.status === 404) {
            return null
        }
        return response.data[0].reply_text;
    }
    catch (err) {
        console.error("Error getting reply by review id", err);
        throw err;
    }
}