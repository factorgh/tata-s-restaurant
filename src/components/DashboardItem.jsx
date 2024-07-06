/* eslint-disable react/prop-types */

const DashboardItem = ({ icon, title, totalCount, bgColor }) => {
  let cssClasses = `2xl:w-[300px]  md:w-[200px] xl:w-[250px] h-[100px] flex p-3 justify-center  items-center  rounded-lg shadow-md gap-5 mx-1 `;
  cssClasses += " " + bgColor;
  return (
    <div className={cssClasses}>
      <div className="w-[100px] h-[50px] bg-orange-600  flex items-center justify-center rounded-md">
        {icon}
      </div>
      <div className="flex flex-col gap-2 ">
        <p className="font-bold"> {totalCount}</p>
        <p className="font-mono text-sm">{title}</p>
      </div>
    </div>
  );
};

export default DashboardItem;
