import React from 'react'

const MovieCard = ({movie: {title, vote_average, poster_path, orginal_language, release_date}}) => {
  return (
    <div className="movie-card">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`:'/no-movie.png'}  alt={title}/>
        <div className="mt-4">
            <h3>{title}</h3>
            <div className="content">
                <div className="rating">
                    <img src="/public/Movie App w_ React(unzip)/star.png" alt="Star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className ="text-white">{orginal_language}</p>
                <span>•</span>
                <p className ="year">{release_date ? release_date.split('-')[0]: 'N/A'}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard