import { NavLink } from "react-router";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function Header() {
    const { cartCount } = useCart();
    const { favoritesCount } = useFavorites();

    function getNavLinkClass({ isActive }) {
        return isActive ? "nav-link active" : "nav-link";
    }

    return (
        <header className="header">
            <div className="container header-container">
                <NavLink to="/" className="logo">
                    NovaStore
                </NavLink>

                <nav className="navigation" aria-label="Main navigation">
                    <NavLink to="/" className={getNavLinkClass} end>
                        Products
                    </NavLink>

                    <NavLink
    to="/favorites"
    className={getNavLinkClass}
>
    Favorites

    {favoritesCount > 0 && (
        <span className="favorites-count">
            {favoritesCount}
        </span>
    )}
</NavLink>

                    <NavLink to="/cart" className={getNavLinkClass}>
                        Cart

                        {cartCount > 0 && (
                            <span className="cart-count">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
