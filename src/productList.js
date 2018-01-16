import React from 'react'
import Card from './card'
import {browserHistory} from 'react-router'
import axios from 'axios'

export default class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        axios.get('/products')
        .then((r) => {
            this.setState({
                products: r.data.products
            })
        })
    }

    cardPressed(productId){
        return () => {
            console.log('we see cardPressed', productId);
                browserHistory.push('/products/' + productId)
        }
    }

    render(){
        if(!this.state.products){
            return null
        }
        else{
            return(
                <div className='cards_container'>
                    {this.state.products.map(prod => {
                        return (
                                <div  className='card_container' key={prod.id} >
                                    <div onClick={this.cardPressed(prod.id)} >
                                        <img src={prod.image} />
                                        <div className='pinfo'>
                                        <h1 className='card-user'>{prod.first} {prod.last}</h1>
                                        <h3>{prod.brand}</h3>
                                        <p>{prod.price} € per day</p>
                                        </div>
                                    </div>
                            </div>
                        )
                    })}
                </div>
            )
        }

    }
}
