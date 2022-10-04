import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { hideSelectedBadge } from '../../api'

const BadgeSettingsFrom = ({ formData, formChanged, saveFormChange, clearFormChange }) => {
    const styles = useStyles()
    const dispatch = useDispatch()
    const [ state, setState ] = useState(formData)

    const handleSaveClick = () => {
        if(formChanged){
            clearFormChange()
            dispatch(hideSelectedBadge())
        } else {
            saveFormChange(state)
            dispatch(hideSelectedBadge())
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formHead}>
                <h3>Trigger settings</h3>
            </div>
            <form 
                className={styles.formBody}
                onSubmit={ (ev) => ev.preventDefault() }
            >
                { Object.keys(state).map( ( key, i ) => (
                    <div 
                        key={i}
                        className={styles.formGroup}
                    >
                        <div className={styles.inputLabel}>
                            <label className={`badge-settings-form`} >{key}</label>
                        </div>

                        { Array.isArray(Object.values(state)[i].value) ? (
                            <Select
                                className={styles.formInput}
                                variant="outlined" 
                                value={state.Sport.selected}
                                onChange={(ev) => setState({
                                    ...state,
                                    [key]: {
                                        ...Object.values(state)[i],
                                        selected: ev.target.value,
                                    }
                                })}
                            >
                                {Object.values(state)[i].value.map( v => <MenuItem value={v}>{v}</MenuItem> )}   
                            </Select>
                        ) : (
                            <input
                                className={styles.formInput} 
                                type="text"
                                value={Object.values(state)[i].value}
                                onChange={(ev) => setState({
                                    ...state,
                                    [key]: {
                                        ...Object.values(state)[i],
                                        value: ev.target.value,
                                    }
                                })}
                                disabled={!Object.values(state)[i].isActive}
                            />
                        )}
                        
                    </div>
                ))}

            </form>
            <div className={styles.formFoot} >
                <Button
                    variant="contained"
                    color={ formChanged ? "secondary" : "primary" }
                    className={`badge-settings-form`}
                    onClick={() => handleSaveClick() }
                > 
                    { formChanged ? 'clear' : 'save' }
                </Button>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        backgroundColor: '#fff',
        borderRadius: 3,
        width: 'fit-content',
        height: 'fit-content',
        margin: '3px 0',
        boxShadow: '0px 0px 4px 2px rgba(0,0,0,.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    formHead: {
        padding: '5px 10px',
        width: '100%',
        height: 'fit-content',
        textAlign: 'start',
        borderBottom: '1px solid rgba(0,0,0,.2)',
    },

    formBody: {
        padding: '10px',
        width: '100%',
        flexGrow: 1,
    },

    formGroup: {
        height: 30,
        display: 'flex',
        margin: '5px 0',
        width: '100%',
    },

    inputLabel: {
        padding: '0 10px',
        height: '100%',
        minWidth: '40%',
        border: '1px solid rgba(0,0,0,.2)',
        borderRight: 'none',
        borderRadius: '3px 0 0 3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontWeight: 600,
    },

    formInput: {
        flexGrow: 1,
        height: '100%',
        width: '60%',
        padding: '5px',
        border: '1px solid rgba(0,0,0,.2)',
        borderRadius: '0 3px 3px 0',
        '&:focus' : {
            border: '1px solid #2d6cdf'
        }
    },

    formFoot: {
        padding: '5px 10px',
        width: '100%',
        height: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})

export default BadgeSettingsFrom
