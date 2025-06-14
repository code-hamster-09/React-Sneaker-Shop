import { NavLink } from "react-router-dom";

const Header = ({ openCart, totalPrice, percent }) => {
  return (
    <header className="p-40">
      <NavLink to={"/"}>
        <div className="d-flex">
          <img
            className="mr-15"
            width={40}
            height={40}
            src="/img/logo.png"
            alt=""
          />
          <div className="headerInfo m-0">
            <h3 className="text-uppercase ">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </NavLink>
      <ul className="headerRight d-flex align-center">
        <li onClick={openCart} className="align-center d-flex mr-30 cu-p">
          <img className="mr-10" src="/img/cart.svg" alt="" />
          <b style={{ color: "#575757" }}>{totalPrice + Math.ceil(percent)} руб</b>
        </li>
        <li className="mr-30">
          <NavLink className="align-center d-flex" to={"/favorites"}>
            <img className="mr-10" src="/img/heart.svg" alt="" />
            <span style={{ color: "#575757" }}>Закладки</span>
          </NavLink>
        </li>
        <li className="">
          <NavLink className="align-center d-flex" to={"/profile"}>
            <img className="mr-10" src="/img/user.svg" alt="" />
            <span style={{ color: "#575757" }}>Профиль</span>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
