import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import InputBase from '@material-ui/core/InputBase';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const PlayerSearchForm = ({ formRef, handleSubmit, query, setQuery, cancelSearch, loading }) => {
    const styles = useStyles()

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.formContainer}
        >
            <div className={styles.mailIcon}>
                <MailOutlineIcon fontSize="small" />
            </div>

            <InputBase 
                className={styles.grilleHeaderFormInput}
                type="text" 
                placeholder="search"
                value={query}
                onChange={ev => setQuery(ev.target.value)}
            />

            { !loading && 
                <ButtonBase
                    className={styles.btn}
                    type="submit" 
                    title="search"
                >
                    <SearchIcon fontSize="small" />
                </ButtonBase>
            }

            { loading &&
                <ButtonBase
                    className={styles.btn} 
                    onClick={cancelSearch}
                    title="cancel"
                >
                    <CloseIcon fontSize="small" />
                </ButtonBase>
            }

        </form>
    )
}

const useStyles = makeStyles({
    formContainer: {
        height: '30px',
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '3px',
    },

    mailIcon: {
        position: 'absolute',
        left: '7px',
        fontWeight: 800,
        color: 'black',
        // backgroundColor: '#f88',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    grilleHeaderFormInput: {
        borderrRadius: '3px 0 0 3px',
        border: '1px solid rgba(0,0,0,.2)',
        borderRight: 'none',
        height: '100%',
        flex: 2,
        height: '100%',
        border: '1px solid rgba(0,0,0,.2)',
        flex: 10,
        padding: '5px',
        paddingLeft: '2rem',
    },

    btn: {
        height: '100%',
        width: '30px',
        borderRadius: '0 3px 3px 0',
        backgroundColor: '#fff',
        border: '1px solid rgba(0,0,0,.2)',
        borderLeft: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }
    }
})

export default PlayerSearchForm
