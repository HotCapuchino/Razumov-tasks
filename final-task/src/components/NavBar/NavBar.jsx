import React, { useState } from 'react';
import navStyles from './NavBar.module.scss';
import SearchBar from '../SearchBar/SearchBar';

function NavBar() {

    const [searchedText, setSearchedText] = useState('');

    function handleTextChanging(event) {
        console.log(event.target.value);
        setSearchedText(event.target.value);
    }

    return (
        <nav className={navStyles.navBarWrapper}>
            <SearchBar placeholder='Search ToDo' value={searchedText} onChange={(e) => handleTextChanging(e)} />
            <div className={navStyles.userBlock}>
                <div>notifications</div>
                <div>profile pic</div>
            </div>
        </nav>
    );
}

export default NavBar;
