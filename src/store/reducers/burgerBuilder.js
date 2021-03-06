import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.43,
    bacon: 0.7
}

const addIngredient = (state, action) => {

    const updatedIngredient = { [action.ingName]: state.ingredients[action.ingName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
        building: true
    }

    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const removeIngredient = { [action.ingName]: state.ingredients[action.ingName] - 1}
    const updatedRemoveIng = updateObject(state.ingredients, removeIngredient)
    const updatedRemoveState = {
        ingredients: updatedRemoveIng,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
        building: true
    }

    return updateObject(state, updatedRemoveState)
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        building: false,
        error: false
    })
}



const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:  return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true})
        default: return state
    }
    
}

export default reducer