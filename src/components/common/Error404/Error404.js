import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { set404error, reset404error } from '../../../store/actions/errors'
import styles from './Error404.module.css'


const Error404 = ({ location, history }) => {

    const dispatch = useDispatch();
    const invalidPath = useSelector(state => state.errors.error404)

    useEffect(() => {
        if (invalidPath === null) {
            dispatch(set404error(location.pathname));
        }
        history.push('/path_not_found')
        return () => dispatch(reset404error())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.Error404}>
            <h3>No match for path: <code>"{invalidPath}"</code>. Please, check whether the URL is correct.</h3>
        </div>
    )
}

export default withRouter(Error404);