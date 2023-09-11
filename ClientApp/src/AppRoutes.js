import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { ProductPage } from "./components/ProductPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: "/category/:categoryId", // Define a route parameter for the category ID
    element: <ProductPage />,
  }
];

export default AppRoutes;
