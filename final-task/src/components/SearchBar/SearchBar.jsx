import React from 'react';
import searchBarStyles from './SearchBar.module.scss';

function SearchBar() {
    return (
        <div className={searchBarStyles.searchBarWrapper}>
            <input placeholder='Search ToDo' className={searchBarStyles.searchBarWrapper__input}/>
        </div>
    );
}

export default SearchBar;
