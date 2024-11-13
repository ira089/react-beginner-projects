import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [rates, setRates] = useState([]);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [indexFrom, setIndexFrom] = useState(17);
  const [indexTo, setIndexTo] = useState(24);
  console.log(indexFrom);
  // const indexRateFrom = rates.findIndex((obj) => obj.cc === fromCurrency);
  // const indexRateTo = rates.findIndex((obj) => obj.cc === toCurrency);
  // console.log(indexRateFrom);
  // console.log(indexRateTo);

  useEffect(() => {
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
      .then((res) => res.json())
      .then((json) => {
        setRates(json);
        console.log(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("error rates");
      });
    // .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const indexRateFrom = rates.findIndex((obj) => obj.cc === fromCurrency);
    const indexRateTo = rates.findIndex((obj) => obj.cc === toCurrency);
    setIndexFrom(indexRateFrom);
    setIndexTo(indexRateTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    onChangeFromPrice(fromPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCurrency]);

  const onChangeFromPrice = (value) => {
    // const indexRateFrom = rates.findIndex((obj) => obj.cc === fromCurrency);
    // const indexRateTo = rates.findIndex((obj) => obj.cc === toCurrency);
    // console.log(indexRateFrom);
    const price = value * rates[indexFrom].rate; // выбранная валюта в грн
    const result = price / rates[indexTo].rate;
    console.log(price);
    console.log(result);
    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    // const indexRateFrom = rates.findIndex((obj) => obj.cc === fromCurrency);
    // const indexRateTo = rates.findIndex((obj) => obj.cc === toCurrency);
    // console.log(indexRateFrom);
    const result = (value * rates[indexTo].rate) / rates[indexFrom].rate;
    console.log(result);
    setToPrice(value);
    setFromPrice(result);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
