import api from "../api";

interface Album{
    title: string;
    releaseDate?: string;
    coverUrl?: string;
}

export const getAlbumsByArtist = async (artist_id: number) =>{
    const response = await api.get(`/albums/artist/${artist_id}`)
    return response.data
}

export const getAlbumsById = async (album_id: number) =>{
    const response = await api.get(`/albums/${album_id}`)
    return response.data
}

export const createAlbum = async(album: Album) =>{
    const response = await api.post('/albums', album)
    return response.data
}

export const updateAlbum = async(album_id:number, album: Album) =>{
    const response = await api.patch(`/albums/${album_id}`, album)
    return response.data
}

export const deleteAlbum = async(album_id: number) =>{
    const response = await api.delete(`/albums/${album_id}`)
    return response.data
}