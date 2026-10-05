import "./ProductsPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";

const categoryGroups = {
    Electronics: ["smartphones", "laptops", "tablets", "mobile-accessories"],
    Fashion: ["mens-shirts", "mens-shoes", "mens-watches", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "tops", "sunglasses", "sports-accessories"],
    "Home & Living": ["furniture", "home-decoration", "kitchen-accessories"],
    Beauty: ["beauty", "fragrances", "skin-care", "makeup"],
    Groceries: ["groceries"],
    Automotive: ["motorcycle", "vehicle"],
};

export function ProduuctsPage() {
    const [products, setProducts] = useState([]);
    const [draftCategories, setDraftCategories] = useState([]);
    const [draftMaxPrice, setDraftMaxPrice] = useState(null);
    const [draftBrand, setDraftBrand] = useState("");
    const [draftRating, setDraftRating] = useState(0);
    const [appliedFilters, setAppliedFilters] = useState({
        categories: [],
        maxPrice: null,
        brand: "",
        minRating: 0,
    });

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((data) => setProducts(data.products ?? []));
    }, []);

    const maximumPrice = Math.ceil(Math.max(100, ...products.map((product) => product.price)) / 100) * 100;
    const brands = [...new Set(products.map((product) => product.brand).filter(Boolean))]
        .sort((first, second) => first.localeCompare(second));
    const filteredProducts = products.filter((product) => {
        const matchesCategory = appliedFilters.categories.length === 0
            || appliedFilters.categories.some((category) => categoryGroups[category]?.includes(product.category));
        const matchesPrice = appliedFilters.maxPrice === null || product.price <= appliedFilters.maxPrice;
        const matchesBrand = !appliedFilters.brand || product.brand === appliedFilters.brand;
        const matchesRating = appliedFilters.minRating === 0 || (product.rating ?? 0) >= appliedFilters.minRating;
        return matchesCategory && matchesPrice && matchesBrand && matchesRating;
    });

    const toggleCategory = (category) => {
        setDraftCategories((current) => current.includes(category)
            ? current.filter((selected) => selected !== category)
            : [...current, category]);
    };

    const applyFilters = (event) => {
        event.preventDefault();
        setAppliedFilters({
            categories: draftCategories,
            maxPrice: draftMaxPrice,
            brand: draftBrand,
            minRating: draftRating,
        });
    };

    const clearFilters = () => {
        setDraftCategories([]);
        setDraftMaxPrice(null);
        setDraftBrand("");
        setDraftRating(0);
        setAppliedFilters({ categories: [], maxPrice: null, brand: "", minRating: 0 });
    };

    return (
        <div className="Page d-flex justify-content-between">
            <form className="sidebar d-flex flex-column justify-content-around" onSubmit={applyFilters}>
                <div className="CheckBoxes">
                    <span>Category</span>
                    <nav className="d-flex flex-column justify-content-start align-items-start">
                        {Object.keys(categoryGroups).map((category) => {
                            const categoryId = `${category.replace(/[^a-z]/gi, "").toLowerCase()}Input`;
                            return (
                                <div className="d-flex" key={category}>
                                    <input
                                        id={categoryId}
                                        type="checkbox"
                                        checked={draftCategories.includes(category)}
                                        onChange={() => toggleCategory(category)}
                                    />
                                    <label htmlFor={categoryId}>{category}</label>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                <div className="PriceRange d-flex flex-column">
                    <span>Price Range</span>
                    <input
                        type="range"
                        min="0"
                        max={maximumPrice}
                        step="10"
                        value={draftMaxPrice ?? maximumPrice}
                        onChange={(event) => setDraftMaxPrice(Number(event.target.value))}
                        aria-label="Maximum product price"
                    />
                    <div className="prices d-flex justify-content-between">
                        <h6>$0</h6>
                        <h6>${draftMaxPrice ?? maximumPrice}</h6>
                    </div>
                </div>

                <div className="Rating d-flex flex-column">
                    <span>Rating</span>
                    <select value={draftRating} onChange={(event) => setDraftRating(Number(event.target.value))} aria-label="Minimum rating">
                        <option value="0">All ratings</option>
                        <option value="4">4 stars &amp; up</option>
                        <option value="3">3 stars &amp; up</option>
                        <option value="2">2 stars &amp; up</option>
                    </select>
                </div>

                <div className="Brand d-flex flex-column justify-content-between">
                    <select value={draftBrand} onChange={(event) => setDraftBrand(event.target.value)} aria-label="Brand">
                        <option value="">All Brands</option>
                        {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                    <button type="submit" className="btn btn-primary mt-4">Apply Filters</button>
                    <button type="button" className="btn btn-danger mt-3" onClick={clearFilters}>Clear Filters</button>
                </div>
            </form>

            <div className="Products-Area">
                {filteredProducts.map((product) => (
                    <Link to={`/products/${product.id}`} className="product-card-link" key={product.id}>
                        <div className="card">
                            <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                            <div className="card-body d-flex justify-content-between align-items-end">
                                <div>
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">${product.price}</p>
                                </div>
                                <span className="card-cart-icon" aria-hidden="true"><FaCartPlus /></span>
                            </div>
                        </div>
                    </Link>
                ))}
                {products.length > 0 && filteredProducts.length === 0 && (
                    <p className="filter-empty-state">No products match these filters.</p>
                )}
            </div>
        </div>
    );
}
