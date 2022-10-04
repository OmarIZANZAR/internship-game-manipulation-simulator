import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import RefreshIcon from '@material-ui/icons/Refresh';
import Typography from '@material-ui/core/Typography';

import PlayerCard from './PlayerCard';
import PlayerSearchForm from './PlayerSearchForm';
import PlayerSearchPopper from './PlayerSearchPopper';

import { getPlayer, searchPlayers, clearSearchedPlayers } from '../../api'

const GrilleHeader = () => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const { searchedPlayers, player } = useSelector( state => state )
    
    const formRef = useRef(null)
    const [ openPopper, setOpenPopper ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ query, setQuery ] = useState('')

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if( query.length === 0) return
        
        setLoading(true)
        setOpenPopper(true)

        dispatch(searchPlayers(query))
    }

    useEffect(() => {
        if ( searchedPlayers ) {
            setLoading(false)
        }
    }, [searchedPlayers])

    const cancelSearch = () => {
        setOpenPopper(false)
        setLoading(false)
        dispatch(clearSearchedPlayers())
    }

    const closePopper = () => {
        setOpenPopper(false)
        dispatch(clearSearchedPlayers())
    }

    const refreshPlayer = () => {
        if(player) dispatch( getPlayer( player._id ) )
    }

    return (
        <div className={`${styles.container} grille-header-form`}>

            <ButtonBase 
                className={styles.refreshBtn}
                onClick={refreshPlayer}
            >
                <RefreshIcon fontSize="small" />
            </ButtonBase>

            { player ? ( 
                <PlayerCard player={player} /> 
            ) : (
                <Typography variant="overline" color="primary">
                    No Selected Player
                </Typography>
            )}

            <PlayerSearchForm
                formRef={formRef}
                query={query}
                setQuery={setQuery}
                loading={loading}
                handleSubmit={handleSubmit}
                cancelSearch={cancelSearch}
            />

            <PlayerSearchPopper
                loading={loading}
                players={searchedPlayers}
                openPopper={openPopper}
                closePopper={closePopper}
                formRef={formRef} 
            />

        </div>
    )
}

const useStyles = makeStyles({
    container: {
        backgroundColor: '#071e3d',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
    },

    refreshBtn: {
        backgroundColor: '#1f4287',
        color: '#fff',
        height: 30,
        width: 30,
        border: 'none',
        borderRadius: 3,
        boxShadow: '0px 0px 4px 1px rgba(0,0,0,.2)',
        cursor: 'pointer',
        fontWeight: 700,
        '&:hover': {
            backgroundColor: '#1f4287',
        },
    },
})

export default GrilleHeader
