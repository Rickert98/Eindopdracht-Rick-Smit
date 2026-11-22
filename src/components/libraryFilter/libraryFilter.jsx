import styles from './libraryFilter.module.css';

function Filter(filterName, set) {
    return (
        <label>
            {filterName.filterName}
            <input
                type="radio"
                name="library-filter"
                onChange={(()=>{set(filterName.filterName)})}
            />
        </label>
    )
}

export default Filter;