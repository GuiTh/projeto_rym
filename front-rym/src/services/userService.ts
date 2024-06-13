import api from '../api'

//interface para definir estrutura do usuario
interface User{
    user_id: number;
    userName: string;
    email: string
}

export const getUserByUsername = async (userName: string): Promise<User> =>{
    const response = await api.get(`/users/${userName}`)
    return response.data
}

export const createUser = async (user: Partial<User>): Promise<User> =>{
    const response = await api.post("/users", user)
    return response.data
}

export const updateUser = async (user_id: number, user: Partial<User>): Promise<User> =>{
    const response = await api.put(`/users/${user_id}`, user)
    return response.data
}

export const deleteUser = async (user_id: number): Promise<void> =>{
    await api.delete(`/users/${user_id}`)
}