import api from '../api'

interface Artist{
    name: string;
    bio?: string
}

export const getAll = async () =>{
    const response = await api.get('/artistas')
    return response.data
}

export const getArtistByName = async(artist_name: string) =>{
    const response = await api.get(`/artistas/${artist_name}`)
    return response.data
}

export const createArtist = async(artist: Artist) =>{
    const response = await api.post(`/artistas`, artist)
    return response.data
}

export const updateArtist = async(artist_id: number, artist: Artist) =>{
    const response = await api.patch(`/artistas/${artist_id}`, artist)
    return response.data
}

export const removeArtist = async(artist_id: number) =>{
    const response = await api.delete(`/artistas/${artist_id}`)
    return response.data
}