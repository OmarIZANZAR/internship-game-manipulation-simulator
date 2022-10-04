import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { hideDropDown, setSportLeagueLevel } from '../../api';

const DropDown = () => {
    const { player } = useSelector( state => state )
    const dispatch = useDispatch()

    const [ selectedSport, setSelectedSport ] = useState(null)
    const [ selectedLeague, setSelectedLeague ] = useState(null)
    const [ selectedLevel, setSelectedLevel ] = useState(null)

    useEffect(() => {
        if( selectedLeague && selectedLeague.levels.length === 1 ){
            dispatch(setSportLeagueLevel(selectedSport._id ,selectedLeague._id, 1))
            setSelectedLevel(null)   
        }
    }, [selectedLeague])

    useEffect(() => {
        if( selectedLevel ){
            dispatch(setSportLeagueLevel(selectedSport._id ,selectedLeague._id, selectedLevel))
            setSelectedLevel(null)
        }
    }, [selectedLevel])
     
    return (
        <ClickAwayListener onClickAway={() => dispatch(hideDropDown()) }>
            <div>
                { player && player.sports.length > 0 && (
                    <SportsList
                        sports={player.sports}
                        selectedSport={selectedSport}
                        setSelectedSport={setSelectedSport}
                    />
                )}

                { selectedSport && (
                    <LeaguesList 
                        leagues={ selectedSport.leagues }
                        selectedLeague={selectedLeague}
                        setSelectedLeague={setSelectedLeague}
                    />
                )}
                
                { selectedLeague && selectedLeague.levels.length > 1  ? (
                    <LevelsList 
                        league={selectedLeague}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                    />
                ) : ( null )}
            </div>
        </ClickAwayListener>
    )
}

const SportsList = ({ sports, setSelectedSport, selectedSport }) => {
    const styles = useStyles();

    const selectStyle = (sport) => {
        if( selectedSport && sport._id === selectedSport._id ){
            return styles.selectedListItem
        } else {
            return '';
        }
    }

    return (
        <div className={`${styles.list} ${styles.sportsList} drop-down-area`} >
            { sports.map( (sport, i) => (
                <div
                    key={i}
                    className={`${styles.listItem} ${selectStyle(sport)} drop-down-area`}
                    onClick={() => setSelectedSport(sport)}
                >
                    <Typography variant="body2">
                        { sport.name }
                    </Typography>

                    <ArrowForwardIosIcon fontSize="small" />
                </div>
            ))}
        </div>
    )
}

const LeaguesList = ({ leagues, setSelectedLeague, selectedLeague }) => {
    const styles = useStyles()

    const selectStyle = (league) => {
        if( league._id === selectedLeague?._id ){
            return styles.selectedListItem
        } else {
            return ''
        }
    }

    return (
        <div className={`${styles.list} ${styles.leaguesList} drop-down-area`} >
            { leagues.map( (league, i) => (
                <div
                    key={i}
                    className={`${styles.listItem} ${selectStyle(league)} drop-down-area`}
                    onClick={() => setSelectedLeague(league) }
                >
                    <Typography variant="body2">
                        { league.name }
                    </Typography>

                    { league.levels.length > 1 ? (
                        <ArrowForwardIosIcon fontSize="small" />
                    ) : (
                        <VisibilityIcon fontSize="small" />
                    ) }
                </div>
            ))}
        </div>
    )
}

const LevelsList = ({ setSelectedLevel }) => {
    const styles = useStyles()

    return (
        <div className={`${styles.list} ${styles.levelsList} drop-down-area`} >
                <div
                    className={`${styles.listItem} drop-down-area`}
                    onClick={() => setSelectedLevel(1)}
                >
                    <Typography variant="body2">
                        bronze
                    </Typography>

                    <VisibilityIcon fontSize="small" />
                </div>
                <div
                    className={`${styles.listItem} drop-down-area`}
                    onClick={() => setSelectedLevel(2)}
                >
                    <Typography variant="body2">
                        argent
                    </Typography>

                    <VisibilityIcon fontSize="small" />
                </div>
                <div
                    className={`${styles.listItem} drop-down-area`}
                    onClick={() => setSelectedLevel(3)}
                >
                    <Typography variant="body2">
                        or
                    </Typography>

                    <VisibilityIcon fontSize="small" />
                </div>
        </div>
    )
}
 
const useStyles = makeStyles((theme) => ({
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        cursor: 'pointer',
        paddingLeft: 20,
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.1)',
        }
    },

    selectedListItem: {
        backgroundColor: 'rgba(0,0,0,.1)',
    },

    list: {
        borderRadius: 3,
        backgroundColor: '#fff',
        width: 260,
        height: 'fit-content',
        minHeight: 280,
        position: 'absolute',
        top: 30,
        marginTop: 5,
        boxShadow: '0px 0px 4px 1px rgba(0,0,0,.2)',
    },

    sportsList: {
        left: 0,
        zIndex: 500,
    },

    leaguesList: {
        left: 255,
        zIndex: 400,
    },

    levelsList: {
        left: 510,
        zIndex: 300,
    },

    badgesList: {
        left: props => props.left,
        zIndex: props => props.index,
    },

    levelBadgesList: {
        left: 780,
        zIndex: 200,
    },

    nastedAccordion: {
        boxShadow: '0px 0px 4px 1px rgba(0,0,0,.2)',
        width: '95%',
        margin: 'auto',
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default DropDown
