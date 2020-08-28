import axios from '../../axios-orders'
import * as actionTypes from '../actions/actionTypes'

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingName: name
    }
}

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingName: name
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-a73bf.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed(error))
        })
    }
}