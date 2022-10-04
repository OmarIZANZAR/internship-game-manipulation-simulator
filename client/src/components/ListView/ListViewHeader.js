import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import DropDown from './DropDown';
import DropDownToggler from './DropDownToggler';
import BadgesSearch from './BadgesSearch';
 
const ListViewHeader = ({ sport, league, level, filterBadges }) => {
    const styles = useStyles()

    const { displayDropDown } = useSelector( state => state )

    const [ title, setTitle ]= useState('')

    const levelName = () => {
        switch( level) {
            case 1: return 'bronze';
            case 2: return 'argent';
            case 3: return 'or';
            default: return '';
        }
    }

    useEffect(() => {
        let title = '';

        if( sport ){
            title = `${sport.name}`
        }

        if(sport && sport.leagues.length > 1 && league ){
            title = title + ` / ${league.name}`
        }

        if(league && league.levels.length > 1){
            title = title + ` / ${levelName()}`
        }

        setTitle(title)
    }, [sport, league, level])

    return (
        <div className={styles.container}>
            <div className={styles.barContent}>

                <DropDownToggler title={title} />

                { displayDropDown && <DropDown /> }

                <BadgesSearch filterBadges={filterBadges} />

            </div>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        minHeight: 70,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 4px 1px rgba(0,0,0,.2)',
    },

    barContent: {
        height: '30px',
        margin: 8,
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
})

export default ListViewHeader
