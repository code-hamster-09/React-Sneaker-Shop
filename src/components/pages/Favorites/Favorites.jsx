import { NavLink } from "react-router-dom";
import "../../../App.scss";
import Card from "../../Card/Card";

const Like = ({
  onAddToCart,
  onAddToFavorites,
  cartItems,
  searchValue,
  favorites,
}) => {
  return (
    <div className="p-40">
      {favorites.length > 0 ? (
        <div>
          <div className="d-flex align-center">
            <NavLink to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="34"
                  height="34"
                  rx="7.5"
                  fill="white"
                  stroke="#F2F2F2"
                />
                <path
                  d="M19 22L14 17L19 12"
                  stroke="#C8C8C8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>
            <h1 className="ml-20">Мои закладки</h1>
          </div>
          <div className="d-flex sneakers flex-wrap cards">
            {favorites
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((item) => (
                <Card
                  onAddToCart={(obj) => onAddToCart(obj)}
                  onAddToFavorites={(obj) => onAddToFavorites(obj)}
                  favorites={favorites}
                  item={item}
                  key={item.id}
                  cartItems={cartItems}
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-center mt-50 mb-50">
          <img className="mb-30 icon" src="/img/sad.png" alt="" />
          <h2 className="m-5">Закладок нет :(</h2>
          <p className="opacity-5 m-5">Вы ничего не добавляли в закладки</p>
          <div className="mt-40 btnWrapper">
            <NavLink to={"/"}>
              <button className="confirm">
                Вернутся назад
                <img src="/img/arrow.svg" alt="" />
              </button>
            </NavLink>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Like;
