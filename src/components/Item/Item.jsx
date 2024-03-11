import { Link } from "react-router-dom";

export function Item({ id, title, img, birth_date, death_date }) {
  // const {getMe}
  return (
    <>
      <li className="w-[295px] ">
        <Link to={`/author/${id}`}>
          <img
            className="w-[295px] h-[224px] rounded-tl-3xl rounded-tr-3xl "
            src={`http://localhost:5000/${img}`}
            alt={title}
          />
        </Link>
        <div className="rounded-bl-3xl rounded-br-3xl item__bg flex flex-col pt-3 px-4 gap-2 pb-[63px]">
          <h3 className="text-[#C9AC8C] text-2xl font-medium">{title}</h3>
          <p className="text-base opacity-60 text-white">
            {birth_date} - {death_date}
          </p>
        </div>
      </li>
    </>
  );
}
