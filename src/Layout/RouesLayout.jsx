import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  height: 100vh;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 100vh;
  background-image: url(/img.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function RouesLayout() {
 
  return (
    <Container>
      <header></header>
      <main>
        <Outlet></Outlet>
      </main>
    </Container>
  );
}

export default RouesLayout;
