import { useState } from "react";
import { useEffect } from "react";

function App() {

  // Frontend Driven

  /*
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=50");
    const data = await res.json();

    // console.log(data.products);
    // console.log(data.total);

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  // console.log("Products: "+ products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      <div className="title">Pagination</div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => (
            <span key={product.id} className="products__single">
              <img src={product.thumbnail} alt={product.title} />
              <span style={{ color: "black" }}>{product.title}</span>
            </span>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "page_disabled"}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              key={i}
              onClick={() => selectPageHandler(i + 1)}
              className={page === i + 1 ? "page__selected" : ""}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "page_disabled"}
          >
            ▶️
          </span>
        </div>
      )}
    </>
  );
  */


  // Backend Driven

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();

    // console.log(data.products);
    // console.log(data.total);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  // console.log("Products: "+ products);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      <div className="title">Pagination</div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => (
            <span key={product.id} className="products__single">
              <img src={product.thumbnail} alt={product.title} />
              <span style={{ color: "black" }}>{product.title}</span>
            </span>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "page_disabled"}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              onClick={() => selectPageHandler(i + 1)}
              className={page === i + 1 ? "page__selected" : ""}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "page_disabled"}
          >
            ▶️
          </span>
        </div>
      )}
    </>
  );
}

export default App;
