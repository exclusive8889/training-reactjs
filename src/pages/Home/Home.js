import Header from "../../layouts/Header/Header";
import Category from "../../component/Category/Category";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ApiClient } from "../../request/request";
import { useSelector, useDispatch } from "react-redux";
import cateSlice from "../../stores/slice/categoriesSlice";

import styles from "./Home.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Home() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [idfilter, setIdfilter] = useState("");
  const [find, setFind] = useState(false);
  const [datacate, setDatacate] = useState([]);

  const pagesss = useSelector((state) => state.categories?.meta?.totalItems);
  const totalPage = Math.ceil(pagesss / 3);
  useEffect(() => {
    ApiClient.get("/api/categories", {
      params: {
        limit: 3,
        page: currentPage,
        search: idfilter,
      },
    })
      .then((res) => {
        dispatch(cateSlice.actions.totalCate(res.data.meta));
        setDatacate(res.data.items);
      })
      .catch((err) => console.log(err));
  }, [find]);

  const handlefilter = (id) => {
    setIdfilter(id);
    setFind(!find);
    setCurrentPage(1);
  };
  // pagination
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  const listPages = pages.map((page) => (
    <li
      key={page}
      className={cx("page-item")}
      onClick={() => {
        setCurrentPage(page);
        setFind(!find);
      }}
    >
      <a className={cx("page-link", currentPage == page ? "active" : null)}>
        {page}
      </a>
    </li>
  ));
  return (
    <>
      <Header filter={handlefilter} />
      <div className={cx("container")}>
        <div className={cx("wrap-categories")}>
          {datacate.map((item, index) => (
            <Category data={item} key={index}></Category>
          ))}
        </div>
      </div>
      <div className={cx("pagi")}>
        <ul className={cx("pagination")}>
          {currentPage > 1 && (
            <li className={cx("page-pre")}>
              <button
                className={cx("page-link")}
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((pre) => pre - 1);
                  setFind(!find);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </li>
          )}
          {listPages}
          {currentPage < totalPage && (
            <li className={cx("page-next")}>
              <button
                clbuttonssName={cx("page-link")}
                onClick={() => {
                  setCurrentPage((pre) => pre + 1);
                  setFind(!find);
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Home;
