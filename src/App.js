import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Masonry from "react-masonry-css";

import ImgurCard from "./components/ImgurCard";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("https://api.imgur.com/3/gallery/hot/viral/0.json", {
      headers: {
        Authorization: "Client-ID 372efbdc08ad473",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1060: 2,
    500: 1,
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <div className="welcome-header">
          <h1>Imgur Gallery</h1>
        </div>
        <div
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {items.map((item, index) => (
              <ImgurCard item={item} key={index} />
            ))}
          </Masonry>
        </div>
      </div>
    );
  }
}

export default App;
