import React, { useEffect } from 'react';
import styles from './CommonError.module.css';


const CommonError = ({ message, id, resetError }) => {

    useEffect(() => {
        const timerId = setTimeout(() => resetError(id), 3000)
        return () => clearTimeout(timerId)
    }, [resetError, id])

    const closeOnClick = () => resetError(id)

    return (
        <div className={styles.error} onClick={closeOnClick}>
            {message}
        </div>
    )
}

export default CommonError;