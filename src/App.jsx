import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RouesLayout from "./Layout/RouesLayout";
import Home from "./Components/Home/Home";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RouesLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
