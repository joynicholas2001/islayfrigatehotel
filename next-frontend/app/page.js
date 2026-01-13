import { fetchRooms } from '@/lib/api'
import HomeClient from '@/components/HomeClient'

async function getRooms() {
    try {
        const response = await fetchRooms()
        return response.data.slice(0, 3)
    } catch (err) {
        console.error('Failed to fetch rooms', err)
        return []
    }
}

export default async function Home() {
    const rooms = await getRooms()

    return <HomeClient rooms={rooms} />
}
