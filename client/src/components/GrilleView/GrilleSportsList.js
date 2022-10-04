import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles'

import { setSelectedSport } from '../../api'

const GrilleSportsList = () => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const { selectedSport, player } = useSelector( state => state)

    return (
        <div className={styles.container} >
            { player && player.sports.map( (sport, i) => (
                <button
                    key={i}
                    className={`${styles.btn} ${ selectedSport === sport._id ? styles.selectedBtn : null }`}

                    onClick={ () =>  dispatch(setSelectedSport( sport._id )) }
                >
                    { sport.name }
                </button>
            ))}
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '70%',
        minHeight: 60,
        margin: 'auto',
        padding: '1rem',
    },

    btn: {
        color: '#fff',
        fontWeight: 600,
        width: '80px',
        padding: '10px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        backgroundColor: '#1f4287',
    },

    selectedBtn: {
        backgroundColor: '#2d6cdf',
    },

})

export default GrilleSportsList
