import api from "../api";

interface LoginCredentials{
    userName: string;
    password: string;
}

interface RegisterData{
    userName: string;
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data
}

export const register = async(data: RegisterData) =>{
    const response = await api.post('/auth/register', data)
    return response.data
}

export const logout = () => {
    localStorage.removeItem("token")
}