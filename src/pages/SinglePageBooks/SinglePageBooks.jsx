import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "../../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ItemBooks } from "../../components/Item/ItemBook";

export function SinglePageBooks() {
  const [author, setAuthor] = useState([]);
  const { token } = useContext(UserContext);
  const [book, setBook] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getBook = axios
      .get(`http://localhost:5000/book/bookId/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => setBook(res.data));
  }, [id]);
  console.log(book);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
  };

  useEffect(() => {
    const getAuthor = axios
      .get(`http://localhost:5000/author/authorId/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => setAuthor(res.data));
  }, [id]);
  console.log(author);
  return (
    <>
      <Header />
      <div className="bg__body">
        <div className="container__header">
          <div className="pb-[120px] ">
            <div className="flex items-center gap-[64px] mb-[100px] ">
              <img
                className="w-[505px] h-[681px] rounded-[20px] "
                src={`http://localhost:5000/${book?.image}`}
                alt={book?.title}
              />
              <div className="flex flex-col w-[671px]">
                <h2 className="text-[#C9AC8C] text-5xl font-normal mb-4 ">
                  {book?.title}
                </h2>
                <ul className="flex flex-col gap-4 mb-10">
                  <li className="flex items-center justify-between">
                    <p className="text-white opacity-60 text-xl ">
                      Sahifalar soni:
                    </p>
                    <p className="text-white text-xl ">{book?.page} page</p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className="text-white opacity-60 text-xl ">
                      Chop etilgan:
                    </p>
                    <p className="text-white text-xl ">{book?.year} years</p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className="text-white opacity-60 text-xl ">
                      Kitob narxi:
                    </p>
                    <p className="text-white text-xl ">${book?.price}</p>
                  </li>
                </ul>

                <div className="flex flex-col gap-3">
                  <div className="flex gap-5 items-center">
                    <p className="text-[#C9AC8C] text-base before__desc flex items-center w-1/4 ">
                      To’liq ma’lumot
                    </p>
                    <span className="w-3/4 h-[1px] block bg-[#C9AC8C99] opacity-60 "></span>
                  </div>
                  <p className="opacity-80 text-white text-base mb-11 ">
                    {book?.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-[30px] ">
                <h2 className="text-[#C9AC8C] text-3xl font-normal leading-[47px] ">
                  Asarlari
                </h2>
                <button className="text-base text-white font-normal  ">
                  Barchasini kurish
                </button>
              </div>

              {/* <Slider {...settings}> */}
              <ul className="flex gap-y-6 gap-x-5 mb-[138px] flex-wrap overflow-x-auto">
                {book.length > 0 ? (
                  book.map((item) => (
                    <ItemBooks
                      id={item.id}
                      key={item.id}
                      img={item.image}
                      title={item.title}
                      desc={author.first_name + " " + author.last_name}
                    />
                  ))
                ) : (
                  <p>No books found</p>
                )}
              </ul>
              {/* </Slider> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
