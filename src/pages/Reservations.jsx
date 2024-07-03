import { Card } from "antd";
const Reservations = () => {
  return (
    <div className=" h-[200px] mt-5 mx-5  border border-slate-200 rounded-md">
      <Card
        className="h-full w-full"
        title=" No reservations avaialable"
        bordered={false}
      ></Card>
    </div>
  );
};

export default Reservations;
