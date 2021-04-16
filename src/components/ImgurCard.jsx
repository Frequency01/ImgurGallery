import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faEye } from "@fortawesome/free-regular-svg-icons";
import { Card } from "react-bootstrap";

const ImgurCard = ({ item }) => {
  const [like, setLike] = useState(false);

  let handleLike = () => {
    setLike(!like);
  };

  let sadCat404 =
    "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Ffacebook%2F000%2F026%2F489%2Fcrying.jpg";

  let makeImgurMedia = (item) => {
    if (item.mp4) {
      return (
        <video className={"card-img-top"} src={item.mp4} autoPlay muted loop />
      );
    }
    if (item.images) {
      return item.images[0].link.endsWith("mp4") ? (
        <video
          className={"card-img-top"}
          src={item.images[0].link}
          autoPlay
          muted
          loop
        ></video>
      ) : (
        <Card.Img variant="top" src={item.images[0].link} />
      );
    } else if (item.link.endsWith("jpg") || item.link.endsWith("png")) {
      return <Card.Img variant="top" src={item.link} />;
    } else {
      return <Card.Img variant="top" src={sadCat404} />;
    }
  };

  return (
    <Card style={{ width: "18rem", padding: "" }}>
      <Card.Title style={{ padding: "0.5rem" }}>{item.title}</Card.Title>
      {makeImgurMedia(item)}
      <Card.Body className={"custom-body"}>
        <p onClick={(e) => handleLike()}>
          <FontAwesomeIcon icon={like ? faHeartSolid : faHeart} />
          {like ? item.ups + 1 : item.ups}
        </p>
        <p>
          <FontAwesomeIcon icon={faEye} /> {item.views}
        </p>
      </Card.Body>
    </Card>
  );
};

export default ImgurCard;
