import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { getPlayer } from '../../api'

const PlayerCard = ({ player }) => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const { player: storedPlayer } = useSelector( state => state )

    const handleClick = () => {
        if( !storedPlayer ){
            dispatch(getPlayer( player._id ))
        } else if( storedPlayer._id !== player._id ) {
            dispatch(getPlayer( player._id ))
        }
    }

    return (
        <Card className={styles.container}>
            <CardActionArea className={styles.cardArea} onClick={handleClick}>
                <Avatar
                    variant="rounded" 
                    alt={player.name}
                    src={player.avatar}
                />

                <CardContent className={styles.cardContent}>

                    <Typography variant="body2">
                        {player.email}
                    </Typography>
                    <Typography variant="subtitle2">
                        {player.name.toUpperCase()}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const useStyles = makeStyles({
    container: {
        margin: 8,
    },

    cardArea: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 4,
    },

    cardContent: {
        height: '100%',
        padding: 0,
        paddingLeft: 4,
    }
})

export default PlayerCard
