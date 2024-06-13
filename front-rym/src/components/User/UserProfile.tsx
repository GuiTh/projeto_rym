import React,  {useState, useEffect} from 'react'
import { getUserByUsername, updateUser } from '../../services/userService'


interface User{
    user_id: number;
    userName: string;
    email: string;
}

const UserProfile: React.FC<{userName: string}> = ({userName}) =>{
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() =>{
        const fetchUser = async () =>{
            try{
                const data = await getUserByUsername(userName)
                setUser(data)
            }catch(error){
                console.error("Nao foi possivel recuperar o usuario", error)
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
    }, [userName])


    const handleUpdate = async() =>{
        if(user){
            try{
                const updatedUser = await updateUser(user.user_id, {...user})
                setUser(updatedUser)
            }catch(error){
                console.log('Falha ao atualizar usuario', error)
            }
        }
    }

    if(loading){
        return <div>Carregando</div>
    }

    if(!user){
        return <div>Usuario nao encontrado</div>
    }

    return(
        <div>
            <h1>{user.userName}</h1>
            <p>Email: {user.email}</p>
            <button onClick={handleUpdate}>Atualizar email</button>
        </div>
    )

}

export default UserProfile