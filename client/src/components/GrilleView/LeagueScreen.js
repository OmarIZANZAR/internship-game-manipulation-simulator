import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import BadgesGrid from './BadgesGrid';

import { setSelectedLevel } from '../../api';

const LeagueScreen = ({ league }) => {
    const styles = useStyles()
    const { selectedLevel } = useSelector( state => state )
    const badges = league.badges.filter( badge => badge.level === selectedLevel )

    return (
        <div className={styles.container}>

            <div className={styles.leagueHead}>
                <div className={styles.leagueAvatar}>
                    { league.image ? (
                        <img src={league.image} alt={league.name} className={styles.image} />
                    ) : (
                        <p>{league.name}</p>
                    )}
                </div>

                <p>{ league.description }</p>
            </div>

            <div className={styles.leagueBody}>
                
                { league.levels.length > 1 && 
                    <LevelsNavigation selectedLevel={selectedLevel} />
                }
                
                <BadgesGrid badges={badges} />
            </div>
        </div>
    )
}

const LevelsNavigation = ({ selectedLevel }) => {
    const styles = useStyles()
    const dispatch = useDispatch()

    return (
        <div className={styles.levelsNavigationContainer}>
            <button 
                className={styles.levelsNavigationBtn}
                style={{
                    border: selectedLevel === 1 ? '1px solid #2d6cdf' : '1px solid rgba(0,0,0,.2)',
                }}
                onClick={() => dispatch(setSelectedLevel(1))}
            >bronze</button>

            <button 
                className={styles.levelsNavigationBtn}
                style={{
                    border: selectedLevel === 2 ? '1px solid #2d6cdf' : '1px solid rgba(0,0,0,.2)',
                }}
                onClick={() => dispatch(setSelectedLevel(2))}    
            >argent</button>

            <button
                className={styles.levelsNavigationBtn}
                style={{
                    border: selectedLevel === 3 ? '1px solid #2d6cdf' : '1px solid rgba(0,0,0,.2)',
                }}
                onClick={() => dispatch(setSelectedLevel(3))}
            >or</button>
        </div>
    )
}

const useStyles = makeStyles({
    // GAME SCREEN STYLES:
    container: {
        backgroundColor: '#fff',
        borderRadius: '5px',
        width: 'fit-content',
        height: 'fit-content',
        padding: '5px',
        margin: 'auto',
    },

    leagueHead: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        fontWeight: '600',
    },

    leagueAvatar: {
        backgroundColor: '#002651',
        height: '130px',
        width: '130px',
        borderRadius: '3px',
        margin: '8px',
        display: 'grid',
        placeContent: 'center',
    },

    image: {
        width: '100px',
        objectFit: 'contain',
    },

    leagueBody: {
        height: '60%',
        width: '100%',
    },

    // LEVELS NAVIGATION STYLES:
    levelsNavigationContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 0',
    },

    levelsNavigationBtn: {
        backgroundColor: '#fff',
        width: 60,
        padding: 5,
        margin: '0 5px',
        borderRadius: '3px',
        cursor: 'pointer',
    },
})

export default LeagueScreen
