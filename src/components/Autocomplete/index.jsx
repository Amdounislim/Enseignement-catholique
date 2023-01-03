import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import "./index.css";

function Autocomplete({ etablissements, setInputSearch }) {
    const items = etablissements

    const handleOnSearch = (string) => {
        setInputSearch(string)
    }


    const handleOnSelect = (item) => {
        setInputSearch(item.name)
    }


    const formatResult = (item) => {
        return (
            <>
                <span className='list-items'>{item.name}</span>
            </>
        )
    }

    return (

        <div className="AutoComplete">
            <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                formatResult={formatResult}
            />
        </div>

    )
}

export default Autocomplete