import React, { useEffect, useState } from 'react';
import navStyles from './NavBar.module.scss';
import { useSearch } from '../../customHooks/useSearch';

function NavBar() {

    const [searchedText, setSearchedText] = useState('');
    const searchFor = useSearch();

    function handleTextChanging(event) {
        setSearchedText(event.target.value);
        searchFor(event.target.value);
    }

    return (
        <nav className={navStyles.navBarWrapper}>
            <div className={navStyles.searchBarWrapper}>
                <input placeholder='Search ToDo' className={navStyles.searchBarWrapper__input}
                    onChange={(e) => handleTextChanging(e)} value={searchedText} />
            </div>
            <div className={navStyles.userBlock}>
                <div>notifications</div>
                <div>profile pic</div>
            </div>
        </nav>
    );
}

export default NavBar;