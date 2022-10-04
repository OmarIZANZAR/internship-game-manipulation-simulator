import axios from 'axios'
import * as actions from '../actions'

const server_uri = "http://localhost:5000/players"

// API
export const getPlayer = ( playerId ) => async (dispatch) => {
    try {

        const { data } = await axios.get(server_uri + `/${playerId}`)

        if(data.isError){
            console.log("COULD NOT FETCH PLAYER", data.info)
            return
        }

        dispatch({
            type: actions.SET_PLAYER,
            payload: { player: data.player }
        })

    } catch (error) {
        console.log("COULD NOT FETCH PLAYER")
    }
}

export const searchPlayers = ( query ) => async (dispatch) => {
    try {        
        if(query.length === 0) return

        const { data } = await axios.get(server_uri + `?email=${query}`)

        if(data.isError){
            console.log("COULD NOT FETCH PLAYERS", data.info)
            return
        }

        dispatch({
            type: actions.SET_SEARCHED_PLAYERS,
            payload: { searchedPlayers: data.players }
        })
    } catch (error) {
        console.log("COULD NOT FETCH PLAYERS")
    }
}

export const updateBadge = ( playerId, sportId, leagueIndex , badgeId , badgeOptions) => async (dispatch) => {
    try {
        const { data } = await axios.put( server_uri + `/${playerId}`, {
            sportId,
            leagueIndex,
            badgeId,
            badgeOptions,
        })

        if(data.isError){
            console.log("COULD NOT UPDATE BADGE", data.info)
            return
        }

        dispatch({
            type: actions.UPDATE_PLAYER,
            payload: { player: data.player }
        }) 
    } catch (error) {
        console.log("COULD NOT UPDATE BADGE")
    }
}

// ACTIONS
export const setPlayer = ( player ) => ({ 
    type: actions.SET_PLAYER, 
    payload: { player } 
})

export const toggleSelectedBadge = ( data ) => ({
    type: actions.TOGGLE_SELECTED_BADGE,
    payload: { selectedBadge: data }
})

// -- data setters
export const setSportLeagueLevel = ( sport, league, level ) => ({
    type: actions.SET_SPORT_LEAGUE_LEVEL,
    payload: {
        selectedSport: sport,
        selectedLeague: league,
        selectedLevel: level,
    },
})
export const setSelectedSport = ( sportId ) => ({ 
    type: actions.SET_SELECTED_SPORT, 
    payload: { selectedSport: sportId } 
})
export const setSelectedLeague = ( leagueIndex ) => ({
    type: actions.SET_SELECTED_LEAGUE,
    payload: { selectedLeague: leagueIndex },
})
export const setSelectedLevel = ( level ) => ({
    type: actions.SET_SELECTED_LEVEL,
    payload: { selectedLevel: level }
})

export const clearSearchedPlayers = () => ({ type: actions.CLEAR_SEARCHED_PLAYERS })
export const hideSelectedBadge = () => ({ type: actions.HIDE_SELECTED_BADGE })
export const toggleDropDown = () => ({ type: actions.TOGGLE_DROP_DOWN })
export const hideDropDown = () => ({ type: actions.HIDE_DROP_DOWN })
export const nextLeague = () => ({ type: actions.NEXT_LEAGUE })
export const prevLeague = () => ({ type: actions.PREV_LEAGUE })
