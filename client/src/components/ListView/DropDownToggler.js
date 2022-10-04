import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { toggleDropDown } from '../../api'

const DropDownToggler = ({ title }) => {
    const styles = useStyles()
    const dispatch = useDispatch()

    return (
        <ButtonBase
            className={styles.dropDownBtn}
            onClick={ () => dispatch(toggleDropDown()) }
            title={ title }
        >
            <Typography noWrap variant="body2" >
                { title }
            </Typography>

            <KeyboardArrowDownIcon 
                fontSize="small" 
                className={styles.dropDownIcon}
            />
        </ButtonBase>
    )
}

const useStyles = makeStyles({
    dropDownBtn: {
        backgroundColor: '#fff',
        borderRadius: '3px 0 0 3px',
        border: '1px solid rgba(0,0,0,.2)',
        borderRight: 'none',
        height: '100%',
        width: 100,
        padding: '0 5px',
        cursor: 'pointer',
        fontSize: '1rem',
        position: 'relative',
        paddingRight: 20,
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.1)',
        }
    },

    dropDownIcon: {
        position: 'absolute',
        right: 0,
        top: 5,
    },
})

export default DropDownToggler
