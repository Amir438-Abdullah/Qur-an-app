import React, { useEffect, useState } from "react";
import all from "./number";

function Header() {
  const [surah, setSurah] = useState([]);
  const [number, setNumber] = useState("");

  console.log(all);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://api.alquran.cloud/v1/surah/${!number ? 1 : number}`)
        .then((response) => response.json())
        .then((data) => setSurah(data));
    };

    fetchData();
    console.log(surah.data);
  }, [number]);

  const handleNumber = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
    console.log(number);
  };

  return (
    <div>
      <div className="flex justify-evenly items-center md:h-20">
        <img
          className="w-40 object-contain"
          src="http://www.pngall.com/wp-content/uploads/2018/06/Allah-PNG-Images.png"
          alt=""
        />
        <select
          onClick={handleNumber}
          name=""
          id=""
          className="px-4 py-2 outline-none text-gray-50 font-semibold focus:bg-indigo-600  bg-indigo-400  "
        >
          <option
            value=""
            className="px-4 py-2 bg-indigo-300 hover:bg-indigo-400"
          >
            1
          </option>
          {all.map((i) => (
            <option value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div className="transition-all duration-500   flex justify-center flex-col items-center">
        <h3 className="font-semibold  text-3xl text-indigo-300 items-center  flex ">
          {surah.data?.englishName}{" "} <span className="arabicName font-normal">({surah.data?.name})</span>{" "}
          <span className="rounded-full text-indigo-500  bg-indigo-300 flex justify-center items-center h-12 w-12">
            {surah.data?.numberOfAyahs}
          </span>
        </h3>
        <ol>
          {surah.data?.ayahs.map(({ text, number }) => (
            <li className="text-4xl font-semibold rounded-md m-4 text-indigo-900 py-2 px-3 bg-indigo-300">
              {text}({number})
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Header;
