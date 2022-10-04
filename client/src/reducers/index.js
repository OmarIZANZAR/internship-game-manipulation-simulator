import * as actions from '../actions'

const mainReducer = ( state, { type, payload }) => {
    switch(type){
        case actions.SET_SELECTED_SPORT:
            return {
                ...state,
                selectedSport: payload.selectedSport,
            };

        case actions.SET_SELECTED_LEAGUE:
            return {
                ...state,
                selectedLeague: payload.selectedLeague,
                selectedLevel: 1,
            };

        case actions.NEXT_LEAGUE:
            let sp = state.player.sports.find( sport => sport._id === state.selectedSport )

            if( state.selectedLeague === sp.leagues.length - 1 ) {
                return state;
            } else {
                return {
                    ...state,
                    selectedLeague: state.selectedLeague + 1 ,
                    selectedLevel: 1,
                };
            };

        case actions.PREV_LEAGUE:
            if( state.selectedLeague - 1 < 0 ) {
                return state;
            } else {
                return {
                    ...state,
                    selectedLeague:  state.selectedLeague - 1 ,
                    selectedLevel: 1,
                };
            };
            
        case actions.SET_SELECTED_LEVEL:
            return {
                ...state,
                selectedLevel: payload.selectedLevel,
            };

        case actions.SET_SPORT_LEAGUE_LEVEL:
            let sport = state.player.sports.find( sport => sport._id === payload.selectedSport)

            let leagueIndex;
            sport.leagues.forEach( ( league, index ) => {
                if( league._id === payload.selectedLeague ){
                    leagueIndex = index;
                }
            });

            return {
                ...state,
                selectedSport: payload.selectedSport,
                selectedLeague: leagueIndex,
                selectedLevel: payload.selectedLevel,
            };

        case actions.TOGGLE_DROP_DOWN:
            return {
                ...state,
                displayDropDown: !state.displayDropDown,
            };

        case actions.HIDE_DROP_DOWN:
            return {
                ...state,
                displayDropDown: false,
            };

        case actions.TOGGLE_SELECTED_BADGE:
            if ( !state.selectedBadge || state.selectedBadge._id !== payload.selectedBadge._id ){
                return {
                    ...state,
                    selectedBadge: payload.selectedBadge,
                }
            } else if ( state.selectedBadge._id === payload.selectedBadge._id ) {
                return {
                    ...state,
                    selectedBadge: false
                }
            } else {
                break
            };
        
        case actions.HIDE_SELECTED_BADGE:
            return {
                ...state,
                selectedBadge: false,
            };

        case actions.SET_PLAYER:
            return {
                ...state,
                selectedSport: payload.player.sports[0]._id,
                player: payload.player
            };

        case actions.UPDATE_PLAYER:
            return {
                ...state,
                player: payload.player
            };

        case actions.SET_SEARCHED_PLAYERS:
            return {
                ...state,
                searchedPlayers: payload.searchedPlayers
            };
        
        case actions.CLEAR_SEARCHED_PLAYERS:
            return {
                ...state,
                searchedPlayers: null
            };
        
        default:
            return state;
    }
}

export default mainReducer
