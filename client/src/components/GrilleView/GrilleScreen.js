import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import LeagueScreen from './LeagueScreen'

import { nextLeague, prevLeague, setSelectedLeague } from '../../api'

const GrilleScreen = () => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const { selectedSport, selectedLeague, player } = useSelector( state => state )
    const [ sport, setSport ] = useState(null)

    useEffect(() => {
        if( player && selectedSport ){
            setSport(player.sports.find( sport => sport._id === selectedSport ))
        } else if ( player ) {
            setSport(player.sports[0])
        }

        dispatch(setSelectedLeague(0))
    }, [selectedSport, player])

    return (
        <div className={styles.container} >
            { sport && <LeagueScreen league={ sport.leagues[selectedLeague] } /> }

            { sport && <button
                className={`${styles.moveBtn} ${styles.moveBtnLeft}`}
                onClick={ () => dispatch(prevLeague()) }
            >
                <ArrowBackIosIcon fontSize="medium" />
            </button>}

            { sport && (
                <LeaguesNavigation 
                    selectedLeague={selectedLeague}
                    leagues={sport.leagues}
                />
            )}

            { sport && <button
                className={`${styles.moveBtn} ${styles.moveBtnRight}`}
                onClick={ () => dispatch(nextLeague()) }
            >
                <ArrowForwardIosIcon fontSize="medium" />
            </button>}
        </div>
    )
}

const LeaguesNavigation = ({ selectedLeague, leagues }) => {
    const styles = useStyles()
    const dispatch = useDispatch()

    return (
        <div className={styles.navigationDots} >
            { leagues.map( (league, i) => (
                <div 
                    key={i}
                    style={{ 
                        width: 'fit-content',
                        height: 10,
                        width: 10,
                        borderRadius: '50%',
                        margin: '1px 3px',
                        cursor: 'pointer',
                        backgroundColor: selectedLeague === i ? '#fff' : 'rgba(255,255,255,.4)' ,
                    }}
                    onClick={() => dispatch(setSelectedLeague(i))}
                ></div>
            ))}
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        width: '70%',
        height: '500px',
        backgroundColor: '#071e3d',
        borderRadius: 20,
        margin: 'auto',
        padding: '8px',
        position: 'relative',
    },

    navigationDots : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        padding: '5px 0',
    },

    moveBtn: {
        position: 'absolute',
        height: 30,
        padding: 10,
        top: 235,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: 3,
        '&:hover': {
            backgroundColor: 'rgba(252, 252, 252, .1)',
        }
    },

    moveBtnRight: {
        right: 0,
    },

    moveBtnLeft: {
        left: 0,
        paddingLeft: 15,
    }
})

export default GrilleScreen
