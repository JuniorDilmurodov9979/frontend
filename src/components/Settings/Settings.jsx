import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function Settings() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState(null); // Initialize lang state to null
  const navigate = useNavigate();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    if (lang !== null) {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const handleLangChange = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  function hangleSubmit() {
    navigate("/");
  }
  return (
    <>
      <form
        onSubmit={hangleSubmit}
        className="container max-w-[993px] mx-auto flex gap-[108px] mt-[83px] justify-center "
      >
        <div className="flex flex-col mt-[43px] w-[712px] ">
          <h2 className="mb-8 font-medium text-[#DEDEDE] text-lg ">Settings</h2>
          <div className="flex w-full gap-7 flex-col">
            {lang !== null && ( // Render select input only when lang is not null
              <div className="">
                <label
                  className="text-[#F3F6F9] text-[13px] mb-2 block leading-5 "
                  htmlFor="select"
                >
                  language
                </label>
                <select
                  defaultValue={lang}
                  onChange={handleLangChange}
                  className="bg-[#F3F6F9] w-full rounded text-[#000] px-5 py-3 block"
                  id="select"
                  placeholder="Please choose language."
                >
                  <option value="en">English</option>
                  <option value="uz">Uzbek</option>
                </select>
              </div>
            )}
            <div className="">
              <label
                className="text-[#F3F6F9] mb-2 block text-[13px] leading-5 "
                htmlFor="new_password"
              >
                Theme
              </label>
              <label className="wrapper__switch">
                <input
                  checked={theme === "dark"}
                  onChange={handleThemeChange}
                  className="switch-input"
                  type="checkbox"
                />
                <span className="switch-controller"></span>
              </label>
            </div>
          </div>
          <button
            className="text-[#0D0D0D] p-3 text-center bg-[#F1F6FF] rounded font-semibold text-[13px] leading-5 mt-[89px] block w-[142px] self-end "
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
}
