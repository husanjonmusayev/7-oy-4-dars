import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const Card = styled.div`
  width: 850px;
  height: 500px;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
`;

const H1 = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 3px;
  text-transform: uppercase;
`;
const H2 = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const Header = styled.header`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const Main = styled.main`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Col = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Item = styled.h1`
  border: 2px solid white;
  padding: 10px 30px;
  font-size: 18px;
  border-radius: 10px;
  color: white;
`;
const Thum = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  const [citiy, setSitiy] = useState();
  const cityRef = useRef();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=56ff80ac3a0c0f5f2e37a0de8ad98800&units=metric`
        )
          .then((res) => res.json())
          .then((data) => setSitiy(data));
      });
    } else {
      console.log("Geolocation is not available.");
    }
  }, []);

  function handlsubmit(event) {
    if (event.charCode == 13) {
      if (cityRef.current.value.length) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current.value}&units=metric&appid=56ff80ac3a0c0f5f2e37a0de8ad98800&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.message != "city not found") {
              setSitiy(data);
            } else {
              alert("shaxar nomi noto'g'ri kiritildi");
            }
          })
          .catch((err) => console.log( err));
      } else {
        alert("Shaxar nomini kiriting");
      }
      cityRef.current.value = "";
    }
  }
  return (
    <Card>
      <Header>
        <Ul>
          <li>
            <H1>Cauntry : {citiy ? citiy.sys.country : " "} </H1>
          </li>
          <li>
            <H2>Name : {citiy ? citiy.name : " "}</H2>
          </li>
        </Ul>
        <div className="search">
          <div class="group">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              ref={cityRef}
              class="input"
              type="search"
              onKeyPress={handlsubmit}
              placeholder="Search"
            />
          </div>
        </div>
      </Header>
      <Main>
        <Thum>
          <img
            src={`https://openweathermap.org/img/wn/${
              citiy ? citiy.weather[0].icon : " "
            }@4x.png`}
            alt=""
          />
          <H2>{citiy ? citiy.weather[0].main : ""}</H2>
        </Thum>
      </Main>
      <section>
        <Col className="col">
          <Item>Temprature : {citiy ? citiy.main.temp : ""} ℃</Item>
          <Item>Max temp : {citiy ? citiy.main.temp_max : ""} ℃</Item>
          <Item>Min temp : {citiy ? citiy.main.temp_min : ""} ℃</Item>
        </Col>
      </section>
    </Card>
  );
}

export default Home;
