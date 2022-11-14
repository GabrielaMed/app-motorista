import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import {
  MdArrowBack,
  MdAssignment,
  MdCameraAlt
} from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { DefaultPalettColors } from "../../assets/colors";
import Footer from "../../components/Footer";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { ListContainer, ListItem, MainContainer } from "./styles";
import ReactLoading from "react-loading";
import Webcam from "react-webcam";

// interface IStateProps {
//   nunota: number;
// }

// interface IImage {
//   img: string;
// }

const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}

export const Photos = () => {

  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)
  // const capture = React.useCallback(() => {
  //   const pictureSrc = webcamRef.current.getScreenshot()
  //   setPicture(pictureSrc)
  // })



  const navigate = useNavigate();
  const [data, setData] = useState([] as IImage[]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  //const { nunota } = location?.state as IStateProps;

  const videoConstraints = {
    facingMode: { exact: 'environment' }
    //facingMode: { exact: "user"},
  }

  //const webcamRef = useRef<Webcam>(null)
  // const [imageFromCamera, setImageFromCamera] = useState('')

  // const capture = useCallback(() => {
  //   if (webcamRef) {
  //     console.log(webcamRef, "cap1")
  //     const imageFromCamera = webcamRef?.current?.getScreenshot({width: 1920, height: 1080})
  //     if (imageFromCamera) {
  //       setShowCamera(false)
  //       setImageFromCamera(imageFromCamera)

  //     }
  //   }
  // }, [webcamRef])

  // const [showCamera, setShowCamera] = useState(false)

  // const fetchData = async () => {
  //   setLoading(true);
  //   const response = await api.get(`/ticket/id?nunota=${nunota}`);
  //   console.log(response.data);
  //   setLoading(false);
  //   if (response?.data) {
  //     setData(response?.data);
  //   }
  // };

  // const verify = () => {
  //   if (!showCamera) {
  //     setShowCamera(true)
  //     console.log("cam true")
  //   } else {
  //     console.log("capture")
  //     capture();

  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "5",
        height: "100%",
      }}
    >
      <Header
        icon={
          <MdAssignment color={DefaultPalettColors.invoice.orange} size={24} />
        }
        label={`Fotos Nota`}
      />
      <Webcam
        audio={false}
        height={400}
        width={400}
        mirrored
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <MainContainer>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReactLoading
              type={"cylon"}
              color={"#ff8000"}
              height={"150px"}
              width={"150px"}
            />
          </div>
        ) : (

          <ListContainer>
            {data?.length > 0 &&
              data?.map((image, idx) => (
                <ListItem key={idx}>
                  <img src={`data:image/jpeg;base64,${image.img}`} alt=""></img>
                </ListItem>
              ))}

          </ListContainer>
        )}
      </MainContainer>

      <Footer>
        <div style={{ fontSize: "1.5rem" }}>
          <Button
            variant="warning"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer", width: "3rem" }}
          >
            <MdArrowBack size={16} color={"black"} />
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="warning"
            style={{ cursor: "pointer", width: "3rem" }}
          >
            <MdCameraAlt size={16} color={"black"} />
          </Button>
        </div>
      </Footer>
    </div>
  );
};
