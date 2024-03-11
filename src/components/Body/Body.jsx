import { Outlet } from "react-router-dom";
import { Books } from "../Books/Books";
import { Card } from "../Card/Card";
import { Header } from "../Header/Header";
import { Item } from "../Item/Item";
import { Search } from "../Search/Search";

import { Carousel } from "@material-tailwind/react";
export function Body() {
  return (
    <>
      <div className="">
        <Card></Card>
      </div>
    </>
  );
}
