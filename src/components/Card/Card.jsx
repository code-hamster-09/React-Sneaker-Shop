import module from './Card.module.scss';

const Card = ({ cartItems, item, imageUrl, title, price, onAddToCart, onAddToFavorites, favorites }) => {

  const isLiked = favorites.some(el => el.parentId === item.parentId)
  const isAdded = cartItems.some(el => el.parentId === item.parentId)

  const onClickAdd = () => {
    onAddToCart(item)
    console.log(cartItems)
  };

  const onClickLike = () => {
    onAddToFavorites(item)
    console.log(favorites)
  };

  return (
    <div  className={module.card}>
      <div className={module.favorite}>
        <img onClick={onClickLike} src={isLiked ? "/img/liked.svg" : "/img/unliked.svg"} alt="" />
      </div>
      <img src={imageUrl} width={133} height={112} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img onClick={onClickAdd} className={module.plus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="" />
      </div>
    </div>
  );
};

export default Card;
