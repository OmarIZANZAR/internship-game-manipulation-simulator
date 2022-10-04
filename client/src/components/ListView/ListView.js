import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

import ListViewHeader from './ListViewHeader'
import BadgesList from './BadgesList'

const ListView = () => {
    const styles = useStyles()
    const { selectedSport, selectedLeague, selectedLevel, player } = useSelector(state => state)

    const [ sport, setSport ] = useState(null)
    const [ league, setLeague ] = useState(null)
    const [ badges, setBadges ] = useState(null)
    
    useEffect(() => {
        if( player && selectedSport && player.sports.length > 0 ){
            setSport( player.sports.find( sport => sport._id === selectedSport ) )
        } else if( player ) {
            setSport( player.sports[0] )
        }
    }, [player, selectedSport])

    useEffect(() => {
        if(sport){
            setLeague(sport.leagues[selectedLeague])
        }
    }, [sport, selectedLeague])
    
    useEffect(() => {
        if(league){
            setBadges(league.badges.filter( badge => badge.level === selectedLevel ))
        }
    }, [league, selectedLevel])

    const filterBadges = (ev) => {
        let searchTxt = ev.target.value
        if(searchTxt.length > 0){
            let newBadges = badges.filter( 
                badge => badge.name.includes(searchTxt) 
                || badge.description.includes(searchTxt) 
            )
            
            setBadges(newBadges)
        }else {
            setBadges(league.badges.filter( badge => badge.level === selectedLevel ))
        }
    }

    return (
        <div className={styles.container}>
            <ListViewHeader
                sport={sport}
                league={league}
                level={selectedLevel}
                filterBadges={filterBadges}
            />

            { badges && <BadgesList badges={badges} />}
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        width: '35%',
        height: '100%',
        backgroundColor: 'gainsboro',
        display: 'flex',
        flexDirection: 'column',
    }
})

export default ListView
