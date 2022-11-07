import { createContext, ReactNode, useContext, useState } from "react";
import React from "react";
import ShoppingCart from '../components/ShoppingCart'
import {useLocalStorage} from '../hooks/useLocalStorage'




type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    // cartItemQuantity: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCard: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps){

    const [ isOpen, setIsOpen] = useState<Boolean>(false)
    const [ cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0)

    const openCart = () => setIsOpen(true)

    const closeCart = () => setIsOpen(false)
    

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id == id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currentItems => {
            if(currentItems.find(item => item.id === id) == null){
                return [...currentItems, {id, quantity: 1}]
            } else {
                return currentItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currentItems => {
          if (currentItems.find(item => item.id === id)?.quantity === 1) {
            return currentItems.filter(item => item.id !== id)
          } else {
            return currentItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
    }

    function removeFromCard(id: number) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }


    return <ShoppingCartContext.Provider 
    value={{
    // cartItemQuantity,
    cartItems,
    openCart,
    closeCart,
    getItemQuantity,
    cartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCard}}>
                {children}
                <ShoppingCart isOpen={isOpen} />
           </ShoppingCartContext.Provider>
}