import "../../../App.scss";
import Card from "../../Card/Card";

const Home = ({
  items,
  searchValue,
  onAddToCart,
  onAddToFavorites,
  onChangeSearchInput,
  setSearchValue,
  cartItems,
  favorites
}) => {
  return (
    <div className="main p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
        </h1>
        <div tabIndex={0} className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clearBtn cu-p"
              src="/img/X.png"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск"
          />
        </div>
      </div>

      <div className="d-flex sneakers flex-wrap cards">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <Card
              onAddToCart={(obj) => onAddToCart(obj)}
              onAddToFavorites={(obj) => onAddToFavorites(obj)}
              favorites={favorites}
              item={item}
              key={item.parentId}
              cartItems={cartItems}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
