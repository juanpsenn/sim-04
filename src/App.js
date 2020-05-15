import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  FormCheckbox,
  FormGroup,
  FormInput,
  Row
} from "shards-react";
import {calcularFilaPoliticaA, calcularFilaPoliticaB} from "./library/generadorFila";
import Filas from "./components/Filas";


const App = () => {
  const [politica, setPolitica] = useState(true);
  const columns = ["#", "RND", "Dem.", "Stock", "Kc", "Kp", "Gr", "Costo diario", "ACUM", "PROM"];
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    iteraciones: 20,
    kc: 0.80,
    kp: 0.40,
    gr: 0.20,
    stockAnterior: 20,
    ventasPerdidas: 3,
    stock: 23,
    desde: 0,
    hasta: 20
  });


  const handleChange = (event) => {
    const {value, name} = event.target;
    setForm({...form, [name]: value});
  };

  const handleChangeIteraciones = (event) => {
    const {value} = event.target;
    setForm({...form, iteraciones: value, hasta:value});
  };


  const handleClick = () => {
    const {iteraciones, kc, kp, gr, stockAnterior, ventasPerdidas, stock, desde, hasta} = form;
    switch (politica) {
      case true:
        // rnd, demanda, stock, costoCompra, costoPerdida, gananciaReembolso, costoDiario, costoAcum, costoPromedio
        setRows(calcularFilaPoliticaA(Number(iteraciones), Number(kc),
          Number(kp), Number(gr), Number(stockAnterior), Number(ventasPerdidas), Number(desde), Number(hasta)));
        break;
      case false:
        setRows(calcularFilaPoliticaB(Number(iteraciones), Number(kc),
          Number(kp), Number(gr), Number(stock), Number(desde), Number(hasta)));
        break;
      default:
        break;
    }
  };


  return (
    <Container fluid>
      <Row className={"mt-2"}>
        <Col sm={3}>
          <Card>
            <CardHeader>
              <CardTitle>
                Parametros
              </CardTitle>
            </CardHeader>
            <CardBody>
              <form>
                <Row className={"mb-2"}>
                  <Col>
                    <FormCheckbox toggle
                                  checked={politica}
                                  onChange={() => {
                                    setPolitica(!politica)
                                  }}>
                  <span style={{fontWeight: "bold"}}>
                    {(politica && "POLITICA A") || "POLITICA B"}
                  </span>
                    </FormCheckbox>
                  </Col>
                </Row>
                <FormGroup>
                  <label>Costo compra</label>
                  <FormInput name={"kc"} type={"number"} placeholder={"Ej: $ 0.40"} value={form.kc}
                             onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <label>Costo venta perdida</label>
                  <FormInput name={"kp"} type={"number"} placeholder={"Ej: $ 0.40"} value={form.kp}
                             onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <label>Ganancia reembolso</label>
                  <FormInput name={"gr"} type={"number"} placeholder={"Ej: $ 0.40"} value={form.gr}
                             onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                  <label>Iteraciones</label>
                  <FormInput name={"iteraciones"} type={"number"} placeholder={"Ej: $ 0.40"} value={form.iteraciones}
                             onChange={handleChangeIteraciones}/>
                </FormGroup>
                {politica ? (
                    <div>
                      <FormGroup>
                        <label>Stock anterior</label>
                        <FormInput name={"stockAnterior"} type={"number"} placeholder={"Ej: 21"}
                                   value={form.stockAnterior}
                                   onChange={handleChange}/>
                      </FormGroup>
                      <FormGroup>
                        <label>Ventas perdidas anterior</label>
                        <FormInput name={"ventasPerdidas"} type={"number"} placeholder={"Ej: 3"}
                                   value={form.ventasPerdidas}
                                   onChange={handleChange}/>
                      </FormGroup>
                    </div>) :
                  <FormGroup>
                    <label>Stock</label>
                    <FormInput disabled name={"stock"} type={"number"} placeholder={"Ej: 20"} value={form.stock}
                               onChange={handleChange}/>
                  </FormGroup>
                }
                <Button block onClick={() => handleClick()}>
                  SIMULAR
                </Button>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Row className={"mb-2"}>
            <Col sm={4}>
              <Card>
                <CardBody>
                  <FormGroup>
                    <label>
                      Desde
                    </label>
                    <FormInput name={"desde"} type={"number"} placeholder={"Ej: 1"}
                               value={form.desde}
                               onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <label>
                      Hasta
                    </label>
                    <FormInput name={"hasta"} type={"number"} placeholder={"Ej: 20"}
                               value={form.hasta}
                               onChange={handleChange}/>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Filas columns={columns} rows={rows}/>

        </Col>
      </Row>
    </Container>
  );
};

export default App;
