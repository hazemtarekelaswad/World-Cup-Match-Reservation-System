
import "./cart.css";
// import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons'
import Cart from "./cart";

function CartContainer({cartopened, setcartOpened}) {

    return (
    <div className="cart-info">
        {!cartopened && <div className="cart-icon" onClick={() => setcartOpened(true)}>
            <FontAwesomeIcon className='icon-item' icon={faCartShopping} />
        </div>}
        
        {cartopened && <div className="cart-container">
            
            <div className="cart-container-icon" onClick={() => setcartOpened(false)}>
                <FontAwesomeIcon className='icon-item' icon={faXmark} />
            </div>  

            <div className="cart-container-data">
                <Cart cartopened={cartopened}  />
            </div>

        </div>}

    </div>
  );
}

export default CartContainer;
