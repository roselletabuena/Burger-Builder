import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {
        purchaseable: false,
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props)
        this.props.onInitIngredients()
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        },0)
        return  sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased()
        this.props.history.push( '/checkout' );
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> :<Spinner/>


        if(this.props.ings) {
            burger = (
            <React.Fragment>
                <h1>{this.props.ingredients}</h1>
                <Burger ingredients={this.props.ings}/>

                <BuildControls 
                    ingredientAdded={this.props.onAddIngredients}
                    ingredientRemoved={this.props.onDeleteIngredients}
                    disabled={disabledInfo}
                    purchaseable={!this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                />
            </React.Fragment>)

            orderSummary =  <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            />;
        }


        return (
            <React.Fragment>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onAddIngredients: (ingName) => dispatch(actions.addIngredient(ingName)),
       onDeleteIngredients: (ingName) => dispatch(actions.removeIngredient(ingName)),
       onInitIngredients: () => dispatch(actions.initIngredients()),
       onInitPurchased: () => dispatch(actions.purchaseInit())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))