import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Like from "./components/pages/Favorites/Favorites";
import Home from "./components/pages/Home/Home";
import Profile from "./components/pages/Profile/Profile";

function App() {
  useEffect(() => {
    getItems();
    getCartItems();
    getFavorites();
  }, []);
  const [cart, setCart] = useState(false);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const getItems = () => {
    axios
      .get("https://56fda1e9f41cbb4c.mokky.dev/items")
      .then((item) => {
        setItems(item.data);
      })
      .catch((error) => console.error(error));
  };
  const getCartItems = () => {
    axios
      .get("https://56fda1e9f41cbb4c.mokky.dev/cartItems")
      .then((item) => setCartItems(item.data))
      .catch((error) => console.error(error));
  };
  const getFavorites = () => {
    axios
      .get("https://56fda1e9f41cbb4c.mokky.dev/favorites")
      .then((item) => setFavorites(item.data))
      .catch((error) => console.error(error));
  };
  const addToCart = (obj) => {
    axios
      .post("https://56fda1e9f41cbb4c.mokky.dev/cartItems", obj)
      .then(() => {
        getCartItems();
      })
      .catch((error) => console.error(error));
  };
  const removeFromCart = (id) => {
    axios
      .delete(`https://56fda1e9f41cbb4c.mokky.dev/cartItems/${id}`)
      .then(() => {
        getCartItems();
      })
      .catch((error) => console.error(error));
  };
  const addToFavorites = (obj) => {
    axios
      .post("https://56fda1e9f41cbb4c.mokky.dev/favorites", obj)
      .then(() => getFavorites())
      .catch((error) => console.error(error));
  };
  const removeFromFavorites = (id) => {
    axios
      .delete(`https://56fda1e9f41cbb4c.mokky.dev/favorites/${id}`)
      .then(() => getFavorites())
      .catch((error) => console.error(error));
  };
  const clearCart = () => {
    axios
      .patch("https://56fda1e9f41cbb4c.mokky.dev/cartItems", [])
      .then(() => {
        getCartItems()
        setOrderPlaced(true)
        setTimeout(() => setOrderPlaced(false), 2000)
      })
      .catch((error) => console.error(error));
  };

  const totalPrice = cartItems.reduce((sum, el) => sum + el.price, 0);
  const percent = totalPrice * 0.05;

  const onAddToCart = async (obj) => {
    try {
      const isInCart = cartItems.some((el) => el.parentId === obj.parentId);
      const item = cartItems.find((el) => el.parentId === obj.parentId);

      if (!isInCart) {
        await addToCart(obj);
      } else {
        await removeFromCart(item.id);
      }

      await getCartItems();
    } catch (error) {
      console.error("Ошибка при изменении корзины:", error);
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      const isInFavorites = favorites.some(
        (el) => el.parentId === obj.parentId
      );
      const item = favorites.find((el) => el.parentId === obj.parentId);
      if (!isInFavorites) {
        await addToFavorites(obj);
      } else {
        await removeFromFavorites(item.id);
      }
      await getFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cart && (
        <Drawer
          orderPlaced={orderPlaced}
          percent={percent}
          totalPrice={totalPrice}
          clearCart={clearCart}
          onRemove={removeFromCart}
          cartItems={cartItems}
          closeCart={() => setCart(false)}
        />
      )}

      <Header
        percent={percent}
        totalPrice={totalPrice}
        openCart={() => setCart(true)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onAddToCart={onAddToCart}
              setSearchValue={setSearchValue}
              onAddToFavorites={onAddToFavorites}
              onChangeSearchInput={onChangeSearchInput}
              cartItems={cartItems}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
              onChangeSearchInput={onChangeSearchInput}
              cartItems={cartItems}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Like
              favorites={favorites}
              items={items}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
              cartItems={cartItems}
              searchValue={searchValue}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              favorites={favorites}
              onAddToCart={onAddToCart}
              onAddToFavorites={onAddToFavorites}
              cartItems={cartItems}
              searchValue={searchValue}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
