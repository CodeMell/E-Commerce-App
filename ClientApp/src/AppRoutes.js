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
    path: "/category/:categoryId/:categoryName", // Include the category name as a parameter
    element: <ProductPage />,
  }
];

export default AppRoutes;
