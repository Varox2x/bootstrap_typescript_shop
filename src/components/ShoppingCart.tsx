import React from 'react'
import { Offcanvas, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'

type ShoppingCartProps = {
    isOpen: boolean
}


const ShoppingCart = ({isOpen}) => {

    const { closeCart } = useShoppingCart()

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placemant="end">
        <OffcanvasHeader closeButton>
            <OffcanvasTitle>
                Cart
            </OffcanvasTitle>
        </OffcanvasHeader>
    </Offcanvas>
  )
}

export default ShoppingCart