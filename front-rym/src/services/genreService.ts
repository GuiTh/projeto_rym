import api from '../api'

interface Genre{
    genre_id: number;
    name: string
}

export const createGenre = async (genre: Partial<Genre>): Promise<Genre> =>{
    const response = await api.post(`/genres`, genre)
    return response.data
}

export const getAllGenres = async():Promise<Genre[]> =>{
    const response = await api.get('/genres')
    return response.data
}

export const updateGenre = async (genre_id: number, genre: Partial<Genre>): Promise<Genre> =>{
    const response = await api.put(`/genres/${genre_id}`, genre)
    return response.data
}

export const deleteGenre = async(genre_id: number): Promise<void> =>{
    await api.delete(`/genres/${genre_id}`)
}