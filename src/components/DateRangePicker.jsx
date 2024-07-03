/* eslint-disable react/prop-types */
import { DatePicker } from "antd";

import moment from "moment";

const DateRangePicker = ({ setDateRange }) => {
  const handleDateChange = (dates) => {
    console.log("<------------selected dates---------------->", moment(dates));
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange([]);
    }
  };

  return (
    <DatePicker.RangePicker
      placeholder={["startDate", "EndDate"]}
      allowEmpty={[false, true]}
      onChange={handleDateChange}
    />
  );
};
export default DateRangePicker;
