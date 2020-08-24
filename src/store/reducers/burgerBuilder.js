import * as actionTypes from '../actions/actionTypes'
import { act } from 'react-dom/test-utils'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.43,
    bacon: 0.7
}


const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state, 
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                error: true
            }
        default: 
            return state
    }
    
}

export default reducer