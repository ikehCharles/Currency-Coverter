import Select from "../utilities/select";
import CurrencyFormatter from "../utilities/currencyFormatter";



export default function Wallet({ wallet_props, toggleCurrency, children }) {
  return (
    <>
      <div style={{display:'flex', alignItems:"center"}}>
        <Select wallet_props={wallet_props} toggleCurrency={toggleCurrency} ></Select>
        <div>
          <p>Balance</p>
          <p>₦{CurrencyFormatter(wallet_props.balance, 2)}</p>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
