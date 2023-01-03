/* eslint-disable import/no-webpack-loader-syntax */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import ReactMapGl, {
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { queryAllLocations } from "../../services/storeApi";

import "./index.css";
import Autocomplete from "../Autocomplete";
import CustomMarker from "../CustomMarker"
import { sleep } from "../../utils";

mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const TOKEN = process.env.REACT_APP_MAP_GL_TOKEN;




const Map = () => {
  const [showPopup, setShowPopup] = useState(null);
  const [etablissements, setEtablissements] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const timeOutId = useRef(null);
  const [loading, setLoading] = useState(true);

  const getEtablissements = useCallback(async () => {
    setLoading(true);
    const filers = { name: inputSearch, category: inputCategory };
    const data = await queryAllLocations(filers);

    await sleep(800, () => {
      setEtablissements(data);
      setLoading(false);
    });

    console.log(etablissements)
  }, [inputSearch, inputCategory]);



  useEffect(() => {
    clearTimeout(timeOutId.current);
    timeOutId.current = setTimeout(() => {
      getEtablissements();
    }, 500);
  }, [getEtablissements]);


  return (
    <div>
      {loading && <div className="loader-line"></div>}

      <ReactMapGl
        mapboxAccessToken={TOKEN}
        style={{
          width: "100%",
          height: "100vh",
        }}
        initialViewState={{
          longitude: -1.6777926,
          latitude: 48.117266,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Container className="contanier">
          <Row>
            <Col md={1} className="col imageContainer">
              <img src="/images/logo.png" alt="logo" className="logo" />
            </Col>

            <Col xs={12} md={4} className="col">
              <Autocomplete
                etablissements={etablissements}
                setInputSearch={setInputSearch}
              />
            </Col>

            <Col
              xs={4}
              md={2}
              className="col"
              onClick={() => {
                inputCategory === "ecole"
                  ? setInputCategory("")
                  : setInputCategory("ecole");
              }}
            >
              <div
                className="chips"
                style={{
                  border:
                    inputCategory === "ecole"
                      ? "2px solid rgb(255, 0, 255)"
                      : null,
                }}
              >
                École
              </div>
            </Col>
            <Col
              xs={4}
              md={2}
              className="col"
              onClick={() => {
                inputCategory === "college"
                  ? setInputCategory("")
                  : setInputCategory("college");
              }}
            >
              <div
                className="chips"
                style={{
                  border:
                    inputCategory === "college" ? "2px solid yellow" : null,
                }}
              >
                Collège
              </div>
            </Col>
            <Col
              xs={4}
              md={2}
              className="col"
              onClick={() => {
                inputCategory === "lycee"
                  ? setInputCategory("")
                  : setInputCategory("lycee");
              }}
            >
              <div
                className="chips"
                style={{
                  border: inputCategory === "lycee" ? "2px solid blue" : null,
                }}
              >
                Lycée
              </div>
            </Col>
          </Row>
        </Container>

        <NavigationControl position="bottom-right" />
        <ScaleControl />
        <GeolocateControl position="bottom-left" />
        <FullscreenControl position="bottom-left" />
        {!loading && etablissements.map((city) => <CustomMarker city={city} key={city.id} setShowPopup={setShowPopup} inputCategory={inputCategory} />)}

        {showPopup && (
          <Popup
            longitude={+showPopup.lng}
            latitude={+showPopup.lat}
            anchor="bottom-right"
            onClose={() => setShowPopup(null)}
            maxWidth="300px"
          >
            <div className="details">
              <h3>{showPopup.name}</h3>
              <div className="description">
                <p>
                  <span>Adresse : </span>
                  {showPopup.adress}
                </p>
                <p>
                  <span>Email : </span>
                  {showPopup.email}
                </p>
                <p>
                  <span>Site Web : </span>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={showPopup.webSite}
                  >
                    Visitez le site Web
                  </a>
                </p>
                <p>
                  <span>N° Téléphone : </span>
                  {showPopup.phone}
                </p>
              </div>
            </div>
          </Popup>
        )}
      </ReactMapGl>
    </div>
  );
};

export default Map;
