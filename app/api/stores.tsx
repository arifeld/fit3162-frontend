/**
 * API Requests for stores
 */

import axiosClient from "./requests"
import RequestsConnector from "./requests"


export const getAllStores = async () => {
    return await axiosClient.get("store")
}