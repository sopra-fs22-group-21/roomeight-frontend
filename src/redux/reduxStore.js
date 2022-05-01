import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

/**
 * Creates a redux store with devtools and thunk middleware
 * @returns {store} redux store
 * @see {@link createStore}
 */
const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
};
const reduxStore = configureStore();

export default reduxStore;
