import React from "react";
import "./formComponent.css";

const POWER = {
  vegeta: {
    img: "https://bit.ly/2X6FsfM",
    alt: "Vegeta analisando poder de luta",
    title: "Analisando poder de luta"
  },
  nappa: {
    img: "https://bit.ly/2ZMPKyw",
    alt: "Nappa analisando poder de luta",
    title: "Analisando poder de luta"
  }
};

const WEAK = {
  vegeta: {
    img: "https://bit.ly/2X7VYvS",
    alt: "Vegeta diz, Você é fraco",
    title: "Você é fraco"
  },
  nappa: {
    img: "https://bit.ly/2Yc1I4k",
    alt: "Nappa diz, Você é fraco",
    title: "Você é fraco"
  }
};

const STRONG = {
  vegeta: {
    img: "https://bit.ly/2LlE4Pn",
    alt: "Vegeta diz, O poder de luta dele é mais de 9000",
    title: "O poder de luta dele é mais de 9000"
  },
  nappa: {
    img: "https://bit.ly/2xfO2JL",
    alt: "Nappa diz, O poder de luta dele é mais de 9000",
    title: "O poder de luta dele é mais de 9000"
  }
};

const FormComp = () => {
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [info, setInfo] = React.useState({
    name: "Kakaroto",
    power: 0,
    enemy: "vegeta"
  });
  const [power, setPower] = React.useState(POWER["vegeta"]);

  return (
    <main className="testForm">
      {loading && <div className="loader" />}
      <label htmlFor="enemy">Inimigo</label>
      <select
        id="enemy"
        name="select"
        value={info.enemy}
        onChange={e => {
          setInfo({ ...info, enemy: e.target.value });
          setPower(POWER[e.target.value]);
        }}
      >
        <option value="vegeta">Vegeta</option>
        <option value="nappa">Nappa</option>
      </select>
      <img src={power.img} alt={power.alt} title={power.title} />
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        type="text"
        placeholder="Ex: Kakaroto"
        onChange={e => setInfo({ ...info, name: e.target.value })}
      />
      <label htmlFor="power">Poder</label>
      <input
        id="power"
        type="text"
        placeholder="Ex: 9000"
        onChange={e => setInfo({ ...info, power: e.target.value })}
      />
      <button
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            info.power > 9000
              ? setPower(STRONG[info.enemy])
              : setPower(WEAK[info.enemy]);
            setShow(true);
            setLoading(false);
          }, 1000);
        }}
      >
        Analisar Poder
      </button>
      {show && (
        <span data-testid="test-informations">
          `${info.name} tem ${info.power} de poder de luta!`
        </span>
      )}
    </main>
  );
};

export default FormComp;
