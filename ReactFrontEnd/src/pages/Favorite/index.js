import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Breadcrumb } from "../../components/BreadCrumb";
import ProductService from "../../api/ProductService";
import { LoadingScreen } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";
import ProductListItem from "../../components/ProductList/ProductListItem";
import { PaginationPage } from "../../components/Pagination";
import { LIMIT_FAVORITE_PAGE } from "../../utils/constant";
import { ProductInfo } from "../../components/Product/ProductInfo";

import styles from "./favorite.module.css";

const FavoritePage = (props) => {
  const { page } = useParams();
  const user = JSON.parse(localStorage.getItem(`user`));
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const getData = (page) => {
    const token = localStorage.getItem(`token`);
    if (user && token) {
      ProductService.getProductFavorite(
        user?.id,
        page,
        LIMIT_FAVORITE_PAGE,
        token
      )
        .then((response) => {
          if (response?.data?.success) {
            setFavorites(response?.data?.result || []);
            setTotal(response?.data?.total);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      window.scrollTo(0, 0);
      navigate(`/login`);
    }
  };

  const onPageNumberChange = (event) => {
    const page = parseInt(event);
    navigate(`/favorite/${page}`);
    setCurrentPage(page);
    setIsLoading(true);
    getData(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (favorites.length === 0) {
      getData(currentPage);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingScreen
          position="fixed"
          heightDiv="100vh"
          width={70}
          height={70}
        />
      )}
      <Header />
      <Breadcrumb list={[{ path: "/", name: "Home" }]} title="Yêu thích" />
      <div className={styles.bodyFavorite}  id="scrollView">
        {favorites.length === 0 ? (
          <NotFound title="Không có sản phẩm nào yêu thích" />
        ) : (
          <>
            <div
              className={`row flex-row flex-wrap justify-content-center ${styles.listFavoriteWrapper}`}
            >
              {favorites.map((item, index) => {
                return (
                  <Fragment key={item.id}>
                    <div
                      className="col col-xs-6 col-md-4 col-lg-3 col-xl-3 "
                      style={{ paddingBottom: 24 }}
                    >
                      <ProductInfo book={item} />
                    </div>
                  </Fragment>
                );
              })}
              <div className="d-flex justify-content-center">
                <PaginationPage count={Math.ceil(total / LIMIT_FAVORITE_PAGE)} onChangePage={onPageNumberChange} currentPage={currentPage}/>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FavoritePage;