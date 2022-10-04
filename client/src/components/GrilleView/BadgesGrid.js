import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';

const BadgesGrid = ({ badges }) => {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            { badges.map( badge => {
                
                let reUnlockableCount = 0
                if( Object.keys(badge.options)[0] === 're-unlockable' ){
                    reUnlockableCount = Object.values(badge.options)[0].value
                }

                let progress = 0
                if( Object.keys(badge.options)[0] === 'reccurent' ){
                    progress = ( Object.values(badge.options)[0].value / Object.values(badge.options)[0].default ) * 100
                }

                return (
                    <div key={badge._id} className={styles.gridElement}>
                        <Badge badgeContent={reUnlockableCount} color="secondary">    
                            <div className={styles.badgeBox}>

                                { badge.image ? (
                                    <img src={badge.image} alt={badge.name} className={styles.image} />
                                ) : (
                                    <p>{badge.name}</p>
                                )}

                                { progress > 0 && (
                                    <div className={styles.progressContainer}>
                                        <LinearProgress 
                                            color="secondary"
                                            variant="determinate"
                                            value={progress}
                                        />
                                    </div>
                                )}

                            </div>
                        </Badge>
                    </div>
                )
            })}
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridTemplateRows: 'repeat(3, 80px)',
        gridTemplateColumns: 'repeat(3, 80px)',
        alignContent: 'center',
        justifyContent: 'center',
    },

    gridElement: {
        backgroundColor: '#002651',
        borderRadius: '3px',
        margin: '8px',
        position :'relative',
    },

    badgeBox: { 
        width: '64px',
        height: '64px',
        display: 'grid',
        placeContent: 'center',
    },

    image: {
        width: '100%',
        objectFit: 'contain',
    },

    progressContainer: {
        width: '90%',
        height: 5,
        position: 'absolute',
        bottom: 5,
        left: '5%',
    },
})

export default BadgesGrid
