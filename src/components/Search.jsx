import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className = "search">
        <div>
            <img src ="/Movie App w_ React(unzip)\Search-Input.png"/>
            <input type = "text" placeholder='Search Latest Movies' value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
    </div>
  )
}

export default Search