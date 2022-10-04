import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

// MUI components
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge';

// MUI icons
import SettingsIcon from '@material-ui/icons/Settings';
import FlashOnIcon from '@material-ui/icons/FlashOn';

// MY components
import BadgeSettingsFrom from './BadgeSettingsFrom';

// API
import { toggleSelectedBadge, updateBadge } from '../../api'

const BadgeListItem = ({ badge }) => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const {player, selectedSport, selectedLeague, selectedBadge} = useSelector( state => state )

    const btnRef = useRef()
    const [formData, setFormData] = useState( badge.options )
    const [formChanged, setFormChanged] = useState( false )

    const saveFormChange = (data) => {
        setFormData(data)
        setFormChanged(true)
    }

    const clearFormChange = () => {
        setFormData(badge.options)
        setFormChanged(false)
    }

    function showSettingsForm(ev) {
        dispatch(toggleSelectedBadge( badge ))
    }

    const handleTriggerClick = () => {
        dispatch(updateBadge(player._id, selectedSport, selectedLeague, badge._id, formData))
        setFormChanged(false)
    }

    return (        
        <Card className={styles.container}>

            <CardMedia 
                className={styles.image}
                image={badge.image}
            />

            <Box 
                // className={styles.content} 
                display="flex"
                flexGrow={1}
                flexDirection="column"
                height="100%"
            >
            
                <CardContent className={styles.contentTop}>
                    
                    <Typography variant="subtitle2" >
                        { badge.description }
                    </Typography>

                    <Box 
                        // className={styles.contentTopTexts}
                        display="flex"
                        flexDirection="column"  
                    >
                        <Typography variant="caption">
                            {Object.keys(badge.options)[0]}: {Object.values(badge.options)[0].default}
                        </Typography>
                    </Box>
                    
                </CardContent>

                <Divider />

                <Box 
                    // className={styles.contentBottom}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    py={0.5}
                    px={1}
                >

                    <Typography variant="subtitle2">
                        coins: { badge.coins }
                    </Typography>

                    <CardActions className={styles.cardActions}>
                        <ButtonBase
                            title="settings"
                            ref={btnRef}
                            className={styles.btnStyle}
                            style={{
                                border: badge._id === selectedBadge?._id 
                                    ? 'solid 1px #2d6cdf' 
                                    : 'solid 1px rgba(0,0,0,.2)',
                            }}
                            onClick={ (ev) => showSettingsForm(ev)}  
                        >
                            <Badge 
                                color="secondary" 
                                variant="dot" 
                                invisible={!formChanged}
                                style={{ zIndex: 0 }}
                            >
                                <SettingsIcon fontSize="small" />
                            </Badge>
                        </ButtonBase>

                        <ButtonBase
                            title="trigger"
                            className={styles.btnStyle}
                            onClick={ () => handleTriggerClick() }
                        >
                            <FlashOnIcon fontSize="small" />
                        </ButtonBase>

                        {/* BADGE SETTINGS FORM */}
                        <Popper 
                            open={selectedBadge && selectedBadge._id === badge._id}
                            anchorEl={btnRef.current}
                            placement={'bottom-start'}
                            disablePortal={false}
                            transition
                        >
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} >
                                    <BadgeSettingsFrom
                                        formData={formData}
                                        formChanged={formChanged}
                                        saveFormChange={saveFormChange}
                                        clearFormChange={clearFormChange}
                                    />
                                </Fade>
                            )}
                        </Popper>
                    </CardActions>
                </Box>
            </Box>

        </Card>
    )
}

const useStyles = makeStyles({
    container: {
        width: '90%',
        height: '100px',
        margin: 'auto',
        marginBottom: '10px',
        display: 'flex',
    },

    image: {
        backgroundColor: '#002651',
        height: '100%',
        width: '100px',
        objectFit: 'contain',
        display: 'grid',
        placeContent: 'cneter',
    },

    contentTop: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '8px',
    },

    cardActions: {
        padding: 0,
    },

    btnStyle: {
        backgroundColor: '#fff',
        height: 'min-content',
        width: 30,
        padding: 0,
        borderRadius: '3px',
        border: 'solid 1px rgba(0,0,0,.2)',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.1)',
        }
    },
})

export default BadgeListItem
