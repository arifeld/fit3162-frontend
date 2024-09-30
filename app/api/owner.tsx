/**
 * API Requests for stores
 */

import axiosClient from "./requests"

import Constants from "expo-constants";

const DEV_API = "http://"+Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000')
const ROOT_URL = (process.env.NODE_ENV === "production" ? process.env.API_ENDPOINT : DEV_API)

export const getBusinessByOwnerID = async (id: string) => {
    try {
        // Fetch data from the backend with owner_id as query parameter
        const rawRequest = await axiosClient.get('owner/business', {
            params: { owner_id: id },  // Pass owner_id as a query parameter
        });

        // Assuming the API returns an array of businesses, we extract the first one
        const data = rawRequest.data;

        // Extract the business_id from the first business (if the array is not empty)
        if (data && data.length > 0) {
            const businessId = data[0].business_id;
            console.log("business_id", businessId);  // Log the business_id for debugging
            return businessId;
        } else {
            console.warn('No business found for the given owner_id');
            return null;  // Return null if no business was found
        }
    } catch (error) {
        console.error('Failed to fetch business by owner ID:', error);
        throw error;  // Rethrow the error so it can be handled elsewhere
    }
};


export const getOwnerIdByEmail = async (email: string) => {
    const rawRequest = await axiosClient.get(`owner/email/${email}`);

    // Correctly extract the data from the response object
    const data = rawRequest.data.result;  // Access the 'result' field directly
    console.log("data", data);  // This should now log the user_id correctly (e.g., 2)
    
    return data;
}
