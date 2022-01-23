import CurrencyFormatter from '../utilities/currencyFormatter'
import {BoardStyled} from "./Board.styled";



export default function Board({ inputTouched, source_input, destination_input, source_data, destination_data, rate }) {
  return (
    <BoardStyled>
      <div >
        <p>You're converting: {source_data.selected.value === "ngn"? <span>₦</span>: <span>$</span>}{CurrencyFormatter(source_input, 2)}</p>
        {inputTouched && <p>Exchange rate: 1NGN = {CurrencyFormatter(1/rate, 3)}USD</p>}
         <p>You'll get: {source_data.selected.value !== "ngn"? <span>₦</span>: <span>$</span>}{CurrencyFormatter(destination_input, 2)}</p>
        
        <p>Source: {source_data.selected.key} Wallet</p>
        {inputTouched && <p>Destination: {destination_data.selected.key} Wallet</p>}
      </div>
    </BoardStyled>
  );
}