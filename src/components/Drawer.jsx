
const Drawer = ({ closeCart, onRemove, cartItems = [], percent, totalPrice, clearCart, orderPlaced }) => {

  const confirm = () => {
    if(cartItems.length <= 0){
      closeCart()
    } else{
      clearCart()
    }
  }
  return (
    <div className="overlay" key="drawer-overlay">
      <div className="drawer" key="drawer-content">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            onClick={closeCart}
            alt=""
          />
        </h2>

        {cartItems.length > 0 ? (
          <div className="drawerList" key="drawer-items">
            <div className="items pb-20">
              {cartItems.map((obj) => (
                <div key={obj.id} className=" cartItem d-flex align-center">
                  <div>
                    <img
                      className="mr-15"
                      width={70}
                      height={70}
                      src={obj.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="cartEmpty d-flex align-center justify-center flex-column flex"
            key="drawer-empty"
          >
            <img
              className="mb-20"
              width={120}
              height={120}
              src={orderPlaced ? "/img/success.png" : "/img/empty-cart.jpg"}
              alt="Empty Cart"
            />
            <h2>{orderPlaced ? "Заказ оформлен!" : "Корзина пустая"}</h2>
            <p className="opacity-6">
              {orderPlaced ? "Ваш заказ скоро будет передан курьерской доставке" : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
              
            </p>
          </div>
        )}
        <div className="cartTotalBlock" key="drawer-total-block">
          {cartItems.length > 0 && (
            <ul>
              <li className="d-flex">
                <span>Итого:</span>
                <div></div>
                <b>{totalPrice + Math.ceil(percent)} руб</b>
              </li>
              <li className="d-flex">
                <span>Налог 5%:</span>
                <div></div>
                <b>{Math.ceil(percent)} руб</b>
              </li>
            </ul>
          )}
          <button onClick={confirm} className="confirm">
            {cartItems.length > 0 ? "Оформить заказ" : "Вернутся назад"}{" "}
            <img src="/img/arrow.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
