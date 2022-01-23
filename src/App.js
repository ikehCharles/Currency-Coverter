// import "./App.css";
import { useState, useEffect, useRef } from "react";
import Wallet from "./components/lib/wallet";
import CurrencyFormatter from './components/utilities/currencyFormatter'
import Board from './components/lib/board';
function App() {
  const MAX_BALANCE = 699995;
  const items = [
    {
      key: "NGN",
      value: "ngn",
    },
    {
      key: "USD",
      value: "usd",
    },
  ];

  const wallet_props = {
    value: 0,
    items: items,
    type: null,
    selected: null,
    balance: MAX_BALANCE,
  };

  const source_wallet = JSON.parse(JSON.stringify(wallet_props));
  source_wallet.type = "source_wallet";
  source_wallet.selected = items[0];

  const destination_wallet = JSON.parse(JSON.stringify(wallet_props));
  destination_wallet.items = destination_wallet.items.slice(1, items.length);
  destination_wallet.balance = 0;
  destination_wallet.type = "destination_wallet";

  const [source_wallet$, setItem1] = useState(source_wallet);
  const [destination_wallet$, setItem2] = useState(destination_wallet);

  const [source_wallet_input$, setSource_wallet_input] = useState(0);
  const [destination_wallet_input$, setDestination_wallet_input] = useState(0);

  const toggleCurrency = (type, val) => {
    const filteredItems = items.filter((item) => item.value !== val);
    const selected = items.find((item) => item.value === val);
    if (type === "source_wallet") {
      setItem1((sou_wall) => ({ ...sou_wall, selected }));
      setItem2((des_wall) => ({ ...des_wall, items: filteredItems }));
      return;
    }
    setItem2((des_wall) => ({ ...des_wall, selected }));
    setItem1((sou_wall) => ({ ...sou_wall, items: filteredItems }));
  };

  const convertCurrency = (type, value)=>{
    console.log(type, value);
    const exchange = Number(CurrencyFormatter(exchangeRate), 2)
    if(!type) return 0
    if(type === "ngn"){
      return value * exchange
    }
    if(type === "usd"){
      return value / exchange
    }
   return 0
  }

  const [inputTouched, setInputTouched] = useState(false)

  const convert = (e, wallet_type) => {
    console.log(e.target.value, destination_wallet$, destination_wallet$.value);
    if(!destination_wallet$.selected) {
      alert("Kindly select destination value")
      return
    }
    if(e.target.value > MAX_BALANCE && wallet_type === "source_wallet") {
      alert("Amount exceeds MAX BALANCE")
      return
    }
    if(!inputTouched){
      setInputTouched(true)
    }
    if (wallet_type === "source_wallet") {
      setSource_wallet_input(e.target.value);
      const value = convertCurrency(destination_wallet$.selected.value, e.target.value)
      setDestination_wallet_input(value);
      return;
    }
    setDestination_wallet_input(e.target.value);
    const value = convertCurrency(source_wallet$.selected.value, e.target.value)
    setSource_wallet_input(value);
  };

  const [exchangeRate, setExchangeRate] = useState(0);

  const getCurrencyExchange = async () => {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await res.json();
    
    setExchangeRate(data.rates.NGN);
  };

  const counter = useRef(0)

  useEffect(() => {
    getCurrencyExchange();
    let counterInterval = setInterval(d=>{
      if(counter.current > 180){
        counter.current = 0;
        getCurrencyExchange()
      }else {
        counter.current++
      }
      console.log(counter.current)
    }, 1000)
    return ()=>{
      clearInterval(counterInterval);
    }
  }, []);

  return (
    <>
    <div className="App">
      <Wallet toggleCurrency={toggleCurrency} wallet_props={source_wallet$}>
        <input
          type="number"
          onChange={(e) => convert(e, "source_wallet")}
          value={source_wallet_input$}
          name=""
          id=""
        />
      </Wallet>
        {inputTouched && <div>
          <p>
            1NGN = {CurrencyFormatter(1 / exchangeRate, 3)}USD
          </p>
          <p>Guaranteed Rate (3 minutes)</p>

          </div>}
      <Wallet
        toggleCurrency={toggleCurrency}
        wallet_props={destination_wallet$}
      >
        <input
          type="number"
          onChange={(e) => convert(e, "destination_wallet")}
          value={destination_wallet_input$}
          name=""
          id=""
        />
      </Wallet>
    </div>
    <div>
         <Board inputTouched={inputTouched} source_input={source_wallet_input$} destination_input={destination_wallet_input$} source_data={source_wallet$} destination_data={destination_wallet$} rate={exchangeRate} ></Board> 
    </div>
    </>
  );
}

export default App;
