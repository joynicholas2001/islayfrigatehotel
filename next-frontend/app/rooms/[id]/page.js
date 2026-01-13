import { fetchRooms } from '@/lib/api'
import RoomDetailClient from '@/components/RoomDetailClient'
import { notFound } from 'next/navigation'

async function getRoom(id) {
    try {
        const response = await fetchRooms()
        const foundRoom = response.data.find(r => r.id === parseInt(id))
        return foundRoom
    } catch (err) {
        console.error('Failed to fetch room', err)
        return null
    }
}

export default async function RoomDetail({ params }) {
    const { id } = params
    const room = await getRoom(id)

    if (!room) {
        notFound()
    }

    return <RoomDetailClient room={room} />
}
