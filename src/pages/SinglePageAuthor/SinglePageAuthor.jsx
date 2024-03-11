import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Header } from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { ItemBooks } from "../../components/Item/ItemBook";

export function SinglePageAuthor() {
  const [author, setAuthor] = useState([]);
  const { token } = useContext(UserContext);
  const [book, setBook] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getBook = axios
      .get(`http://localhost:5000/author/books/${id}`, {
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
                className="w-[505px] h-[681px] rounded-[20px]  "
                src={`http://localhost:5000/${author.image}`}
                alt={author.title}
              />
              <div className="flex flex-col">
                <h2 className="text-[#C9AC8C] text-5xl font-normal mb-4 ">
                  {author.first_name + " " + author.last_name}
                </h2>
                <p className="opacity-80 text-white text-base mb-11 ">
                  {author.bio}
                </p>
                <div className="flex ">
                  <ul className="flex gap-4 items-center">
                    <li className="flex flex-col gap-2">
                      <p className="text-white opacity-60 text-xs">
                        Tavallud sanasi
                      </p>
                      <span className="w-[75px] h-[56px] text-[#C9AC8C] text-[39px]  ">
                        {author.date_of_birth}
                      </span>
                      <p className="text-white opacity-60 text-xs  ">
                        {author.country}
                      </p>
                    </li>
                    <li>
                      <span className="minus__span"></span>
                    </li>
                    <li className="flex flex-col gap-2">
                      <p className="text-white opacity-60 text-xs">
                        Vafot etgan sana
                      </p>
                      <span className="w-[75px] h-[56px] text-[#C9AC8C] text-[39px]  ">
                        {author.date_of_death}
                      </span>
                      <p className="text-white opacity-60 text-xs  ">
                        {author.country}
                      </p>
                    </li>
                  </ul>
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
                {book.length === 1 || 0 ? (
                  <ItemBooks
                    id={book[0].id}
                    img={book[0]?.image}
                    title={book[0]?.title}
                    desc={author.first_name + " " + author.last_name}
                  />
                ) : (
                  book.map((item) => (
                    <ItemBooks
                      id={item.id}
                      key={item.id}
                      img={item.image}
                      title={item.title}
                      desc={author.first_name + " " + author.last_name}
                    />
                  ))
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
