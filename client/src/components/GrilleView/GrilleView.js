import React from 'react'
import { makeStyles } from '@material-ui/core'

import Box from '@material-ui/core/Box'

import GrilleHeader from './GrilleHeader'
import GrilleSportsList from './GrilleSportsList'
import GrilleScreen from './GrilleScreen'

const GrilleView = () => {
    const styles = useStyles()

    return (
        <div className={styles.container}>
            <GrilleHeader />

            <Box
                w="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <GrilleSportsList />
                <GrilleScreen />
            </Box>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        backgroundColor: '#002651',
        width: '75%',
        height: '100%',
    }
})

export default GrilleView
