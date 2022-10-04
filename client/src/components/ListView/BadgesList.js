import React from 'react'
import { makeStyles } from '@material-ui/styles'

import BadgeListItem from './BadgeListItem'

const BadgesList = ({ badges }) => {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            { badges.map( badge => <BadgeListItem key={badge._id} badge={badge} /> )}
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        width: '100%',
        flexGrow: 1,
        padding: '10px',
        overflow: 'hidden',
        overflowY: 'scroll',
    }
})

export default BadgesList
