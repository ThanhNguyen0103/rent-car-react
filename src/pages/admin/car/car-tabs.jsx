import { Tabs } from "antd";
import CarPage from "./car-page";
import CarModelPage from "./car-model-page";
import CarBrandPage from "./car-brand-page";

const CarTabs = () => {
  const items = [
    {
      key: "1",
      label: "Manage Cars",
      children: <CarPage />,
    },
    {
      key: "2",
      label: "Manage Car Model",
      children: <CarModelPage />,
    },
    {
      key: "3",
      label: "Manage Car Brands",
      children: <CarBrandPage />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};
export default CarTabs;
