import axios from "axios"
import { configDotenv } from "dotenv"

configDotenv()
const client = axios.create({
    baseURL: process.env.API_BASE,
    validateStatus: (status) => status === 200
})

export class FlightService {
    static async getFlights(page = 0, size = 12) {
        return await client.request({
            url: '/flight',
            params: {
                'page': page,
                'size': size,
                'sort': 'scheduledAt,asc'
            }
        })
    }

    static async getFlightById(id: any) {
        return await client.request({
            url: `/flight/${id}`
        })
    }
}