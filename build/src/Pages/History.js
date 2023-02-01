import { useTheme } from '../Context/ColorMode'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ProductCard from './ProductCard'
import server from '../variable'

export default function History({ user }) {
    const [History, setHistory] = useState()

    const darkTheme = useTheme()
    const themeStyle = {
        backgroundColor: darkTheme ? '#333 ' : '#f6f6f6',
        color: darkTheme ? '#f6f6f6' : '#333',
    }

    useEffect(() => {
        const History = async () => {
            await fetch(`${server}/purchase_history`, {

                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": user

                })
            })
                .then(res => res.json())
                .then(result => setHistory(result))

        }
        History()
    }, [])

    return (
        <Container fluid className='mainContainer' style={themeStyle}>

            
            <Row>
                {/* {console.log(History)}  */}
                {History !== undefined ? History.result.length > 0 ? History.result.map((Product, index) =>
                    <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2}>
                        <div className=''><ProductCard Product={Product.products[1]} key={index} />
                            <div>
                                <ul>
                                    <li>Quantity:{Product.products[0]}</li>
                                    <li> Date of Purchase: {new Date(Product.verifiedBuyAt).toLocaleString('nl-BE', { day: '2-digit', month: 'long', year: 'numeric' })}</li>
                                    <li>Total Price:{Product.products[0] * Product.products[1].Price} €</li>
                                </ul>
                            </div>
                        </div></Col>)
                    : <div>You haven't bought anything</div> : <div>You haven't bought anything</div>}
            </Row>
        </Container>
    )
}
