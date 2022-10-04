import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middlwares = [thunk]

const initialState = {
    selectedSport: null,
    selectedLeague: 0,
    selectedLevel: 1,
    selectedBadge: false,

    displayDropDown: false,

    searchedPlayers: null,
    player: null,
}

const Store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlwares))
)

export default Store;
