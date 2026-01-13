import { fetchRooms } from '@/lib/api'
import RoomsClient from '@/components/RoomsClient'

async function getRooms() {
    try {
        const response = await fetchRooms()
        return response.data
    } catch (err) {
        console.error('Failed to fetch rooms', err)
        return []
    }
}

export default async function Rooms() {
    const rooms = await getRooms()

    return <RoomsClient rooms={rooms} />
}
