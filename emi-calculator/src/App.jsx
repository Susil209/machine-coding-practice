import { useEffect, useState } from "react";
import { tenures } from "./utils/constants";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/textinput";
import SliderInput from "./components/sliderinput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setdownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (!(cost > 0)) {
      setdownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalLoanAmount = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  const calculateEmi = (downPayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const noOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** noOfYears) /
      ((1 + rateOfInterest) ** noOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculatedownPayment = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const updateDownPaymet = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    // Calculate the downPayment and update
    const dp = calculatedownPayment(emi);
    setdownPayment(dp);
  };
  const updateEMI = (e) => {
    if (!cost) return;

    const payment = Number(e.target.value);
    setdownPayment(payment.toFixed(0));

    // Calculate the EMI and update
    const emi = calculateEmi(payment);
    setEmi(emi);
  };

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      <TextInput
        title={"Total Cost Of Asset"}
        state={cost}
        setState={setCost}
        isTotalCost={true}
      />
      <TextInput
        title={"Interest Rate (in %)"}
        state={interest}
        setState={setInterest}
        isTotalCost={false}
      />
      <TextInput
        title={"Processing Fee (in %)"}
        state={fee}
        setState={setFee}
        isTotalCost={false}
      />

      <SliderInput
        title={"Down Payment"}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
        onChange={updateEMI}
        underlyingTitle={`Total Down Payment - ${totalDownPayment()}`}
      />

      <SliderInput
        title={"Loan Per Month"}
        state={emi}
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
        onChange={updateDownPaymet}
        underlyingTitle={`Total Loan Amount - ${totalLoanAmount()}`}
      />

      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenures.map((ten, i) => (
          <button
            key={i}
            className={`tenure ${ten === tenure ? "selected" : ""}`}
            onClick={() => setTenure(ten)}
          >
            {ten}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
