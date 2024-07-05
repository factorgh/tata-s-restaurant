/* eslint-disable react/prop-types */
import { DatePicker } from "antd";

const DateRangePicker = ({ setDateRange }) => {
  const handleDateChange = (dates) => {
    console.log("<--------date1------------>");
    console.log("<------------selected dates---------------->", dates);
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange([]);
    }
  };

  return (
    <DatePicker.RangePicker
      placeholder={["startDate", "endDate"]}
      allowEmpty={[false, true]}
      onChange={handleDateChange}
    />
  );
};
export default DateRangePicker;
