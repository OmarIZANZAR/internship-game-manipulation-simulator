import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';

import PlayerCard from './PlayerCard';

const PlayerSearchPopper = ({ loading, players, openPopper, formRef, closePopper }) => {
    const styles = useStyles()

    return (
        <Popper
            open={openPopper}
            anchorEl={formRef.current}
            placement="bottom-end" 
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper className={styles.playersSearchPopper} >

                        { !loading && (
                            <Box
                                width="100%"
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <IconButton 
                                    aria-label="close" 
                                    title="cancel" 
                                    size="small"
                                    onClick={closePopper} 
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}

                        { loading && <CircularProgress /> }

                        { !loading && players?.length === 0 && (
                            <Typography variant="overline" >No Player Found</Typography>
                        )}
                        
                        { !loading && players?.length > 0 && (
                            <Box>
                                { players.map( (player, i) => <PlayerCard key={i} player={player} /> ) }
                            </Box>
                        )}
                    </Paper>
                </Fade>
            )}
        </Popper>
    )
}

const useStyles = makeStyles({
    playersSearchPopper: {
        minWidth: "240px",
        minHeight: "60px",
        padding: "4px",
        margin: "8px 0px",
        backgroundColor: "gainsboro",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    
})

export default PlayerSearchPopper
