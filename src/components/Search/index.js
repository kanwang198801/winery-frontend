import * as React from 'react';
import { Input } from 'antd';
// import styles from './styles.module.css';
import PropTypes from 'prop-types';

const { Search } = Input;
export default function SearchWines({ onSearchChange, placeholder }) {
    return (
        <Search
            placeholder={placeholder}
            type='search'
            onChange={onSearchChange}
        />
    );
}

SearchWines.propTypes = {
    onSearchAllChange: PropTypes.func,
    placeholder: PropTypes.string,
};