import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "react-bootstrap";
import { MdArrowBack, MdAssignment, MdCameraAlt } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { DefaultPalettColors } from "../../assets/colors";
import Footer from "../../components/Footer";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { ListContainer, ListItem, MainContainer } from "./styles";
import ReactLoading from "react-loading";
import Webcam from "react-webcam";
import { dataURLtoFile } from "../../utils/base64";

interface IStateProps {
  nunota: number;
}

interface IImage {
  img: string;
}

export const Photos = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([] as IImage[]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { nunota } = location?.state as IStateProps;
  const [showCamera, setShowCamera] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await api.get(`/ticket/id?nunota=${nunota}`);
    console.log(response.data);
    setLoading(false);
    if (response?.data) {
      setData(response?.data);
    }
  };

  const postPhoto = async (imageFromCamera: string) => {
    const file = dataURLtoFile(imageFromCamera, "photo.png");
    console.log(file);
    const data = new FormData();
    data.append("file", file, file.name);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const response = await api
      .post(`/takePhoto?nunota=${nunota}`, data, config)
      .then((response) => {
        console.log(response.data);
      });
    console.log("response-post:", response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const videoConstraints = {
    // facingMode: { exact: "environment" },
    //facingMode: "user",
  };

  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(async () => {
    if (webcamRef) {
      const imageFromCamera = webcamRef?.current?.getScreenshot();
      if (imageFromCamera) {
        setShowCamera(false);
        await postPhoto(imageFromCamera);
        await fetchData();
      }
    }
  }, [webcamRef]);

  const takePhoto = async () => {
    setLoading(true);
    if (showCamera) {
      await capture();
    } else {
      setShowCamera(true);
    }
    setLoading(false);
  };

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
      {showCamera && (
        <div
          style={{
            maxWidth: "90%",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            margin: "auto",
            border: "3px solid orange",
          }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            width={350}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />

          {/* <Button onClick={capture}>
            <MdCameraAlt size={24} color={"white"} />
          </Button> */}
        </div>
      )}
      <MainContainer>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
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
            onClick={takePhoto}
            style={{ cursor: "pointer", width: "3rem" }}
          >
            <MdCameraAlt size={16} color={"black"} />
          </Button>
        </div>
      </Footer>
    </div>
  );
};
