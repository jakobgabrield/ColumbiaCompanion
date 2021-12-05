import React, {useState} from 'react'
import "../css/SearchPage.css"

export default function SearchPage() {

    const [search, setSearch] = useState("");

    return (
        <div className="SearchPage">
            <div className="search-bar" >
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Courses"></input>
                <button>Search</button>
            </div>
        </div>
    )
}
