import React, {useState} from 'react'
import { getArtistByName } from '../../services/artistService'

interface Artist {
    artist_id: number;
    name: string;
    bio?: string;
}

const ArtistSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [artists, setArtists] = useState<Artist[]>([])

    const handleSearch = async () => {
        try{
            const data = await getArtistByName(searchTerm)
            setArtists(data)
        }catch(error){
            console.error('Failed to fetch artists', error)
        }
    }

    return (
        <div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Procure por um artista' />
            <button onClick={handleSearch}>Pesquise</button>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.artist_id}>{artist.name}</li>
                ))}
            </ul>
        </div>
    )
}


export default ArtistSearch