import { Tabs } from "antd";
import CarPage from "./car-page";

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
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Manage Car Brands",
      children: "Content of Manage Car Brands",
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};
export default CarTabs;
