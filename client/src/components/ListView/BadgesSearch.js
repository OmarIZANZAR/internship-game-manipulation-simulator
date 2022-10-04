import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';

const BadgesSearch = ({ filterBadges }) => {
    const styles = useStyles()

    return (
        <form
            className={styles.formContainer}
            onSubmit={ (ev) => ev.preventDefault() }
        >
            <InputBase 
                className={styles.badgesSearchBarInput}
                type="text" 
                placeholder="search"
                onChange={ (ev) => filterBadges(ev)  }
            />

            <ButtonBase 
                type="submit" 
                className={styles.submitBtn}
                title="search in all leagues"
            >
                <SearchIcon fontSize="small" />
            </ButtonBase>
        </form>
    )
}

const useStyles = makeStyles({  
    formContainer: {
        height: '100%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
    },

    badgesSearchBarInput: {
        height: '100%',
        border: '1px solid rgba(0,0,0,.2)',
        flexGrow: 1,
        padding: 5,
    },

    submitBtn: {
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
            backgroundColor: 'rgba(0,0,0,.1)',
        }
    }
})

export default BadgesSearch
