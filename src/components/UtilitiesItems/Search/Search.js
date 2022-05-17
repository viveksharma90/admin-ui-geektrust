import styles from './Search.module.css';

const Search = ({ placeholder, onChange }) => {
    return (
        <>
            <input
                className={styles.searchAction}
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            ></input>
        </>
    );
};

export default Search;
