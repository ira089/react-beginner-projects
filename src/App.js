import React, { useEffect, useState, useRef } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USD");
  const [ratesLoaded, setRatesLoaded] = useState(false);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef([]);

  useEffect(() => {
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json;
        setRatesLoaded(true);
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("error rates");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ratesLoaded) {
      onChangeFromPrice(fromPrice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, ratesLoaded]);

  useEffect(() => {
    if (ratesLoaded) {
      onChangeToPrice(toPrice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratesLoaded, toCurrency]);

  const getRatesIndices = () => {
    const indexRateFrom = ratesRef.current.findIndex(
      (obj) => obj.cc === fromCurrency
    );
    const indexRateTo = ratesRef.current.findIndex(
      (obj) => obj.cc === toCurrency
    );
    return { indexRateFrom, indexRateTo };
  };

  const onChangeFromPrice = (value) => {
    const { indexRateFrom, indexRateTo } = getRatesIndices();
    if (indexRateFrom !== -1 && indexRateTo !== -1) {
      const price = value * ratesRef.current[indexRateFrom].rate; // выбранная валюта в грн
      const result = price / ratesRef.current[indexRateTo].rate;

      setToPrice(result.toFixed(4));
      setFromPrice(value);
    }
  };

  const onChangeToPrice = (value) => {
    const { indexRateFrom, indexRateTo } = getRatesIndices();
    if (indexRateFrom !== -1 && indexRateTo !== -1) {
      const result =
        (value * ratesRef.current[indexRateTo].rate) /
        ratesRef.current[indexRateFrom].rate;

      setToPrice(value);
      setFromPrice(result.toFixed(4));
    }
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
