const OrderForm = () => {
  return (
    <div>
      {/* Items form */}
      <form className="w-[300px] ">
        <p>Catergory</p>
        <div className="border border-slate-300">
          <select className="w-full">
            <option value="">Burger</option>
            <option value="">Chicken</option>
          </select>
        </div>
        {/* End of select fxn */}
        <p> Title Name</p>
        <input type="text" />

        {/* end of title */}
        <p>Short Details</p>
        <input type="text" />
        {/* End of short details */}
        <p>Price</p>
        <input type="text" />

        {/* Image picker section */}
      </form>
    </div>
  );
};

export default OrderForm;
