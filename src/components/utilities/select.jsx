import DownArrow from "../../assets/icons/downArrow.svg";



export default function Select({wallet_props: {items, type, selected, },toggleCurrency }) {
  const selectionChange = (event) => {
    toggleCurrency(type, event.target.value);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <span
          style={{
            zIndex: "1",
            position: "absolute",
            top: "30%",
            bottom: "50%",
            right: "5px",
            backgroundImage: `url(${DownArrow})`,
            padding: "6px",
            fontWeight: 800,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></span>
        <select
          style={{
            zIndex: "10",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none" /* Remove default arrow */,
            width: "100%",
            padding: ".5rem",
            paddingRight: "2rem",
          }}
          onChange={selectionChange}
          name="dropdown_select"
          id="dropdown_select"
          defaultValue=""
        >
          {!selected && (
            <option value=""  disabled hidden>
              Convert to
            </option>
          )}
            
          {items.map(({ key, value }) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
