import React from "react";
import CommentList from "../../components/Comments/CommentList";

const AlbumPage: React.FC<{albumId: number}> = ({albumId}) =>{
    return (
        <div>
            <h1>Detalhes do album</h1>
            <p>Aqui vem as informacoes sobre o album do componente de album</p>
            <CommentList albumId={albumId} />
        </div>
    )
}

export default AlbumPage