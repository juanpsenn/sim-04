import {obtenerDemanda} from "./generarDemanda";
import {toFixed, uniform} from "./distribuciones";

export function calcularFilaPoliticaB(iteraciones, kc, kp, gr, stockInit, desde, hasta) {
  let nuevaFila = [];
  let costoCompra = 0;
  let costoPerdida = 0;
  let gananciaReembolso = 0;
  let costoDiario = 0;
  let costoAcum = 0;
  let costoPromedio = 0;
  let rnd;
  let stock = stockInit;
  let demanda = 0;
  let compra = kc;
  let perdida = kp;
  let reembolso = gr;
  let rows = [];

  for (let i = 1; i <= iteraciones; i++) {
    rnd = uniform(0, 1);
    demanda = obtenerDemanda(rnd);
    stock = 23;
    costoCompra = Number(toFixed(stock * compra, 4));
    if (stock < demanda) {
      costoPerdida = Number(toFixed((demanda - stock) * perdida, 4));
    } else {
      costoPerdida = 0;
    }

    if (stock > demanda) {
      gananciaReembolso = Number(toFixed((stock - demanda) * reembolso, 4))
    } else {
      gananciaReembolso = 0;
    }

    costoDiario = Number(toFixed(costoCompra + costoPerdida - gananciaReembolso, 4));
    costoAcum = Number(toFixed(costoAcum + costoDiario, 4));
    costoPromedio = Number(toFixed(costoAcum / i, 4));
    nuevaFila = [i, rnd, demanda, stock, costoCompra, costoPerdida, gananciaReembolso, costoDiario, costoAcum, costoPromedio];
    i >= desde && i <= hasta && rows.push(nuevaFila)
  }
  return rows.reverse();
}

export function calcularFilaPoliticaA(iteraciones, kc, kp, gr, stockAnterior, perdidaAnterior, desde, hasta) {
  let nuevaFila = [];
  let costoCompra = 0;
  let costoPerdida = 0;
  let gananciaReembolso = 0;
  let costoDiario = 0;
  let costoAcum = 0;
  let costoPromedio = 0;
  let rnd;
  let demanda = 0;
  let stock = stockAnterior;
  let compra = kc;
  let perdida = kp;
  let reembolso = gr;
  let rows = [];

  for (let i = 1; i <= iteraciones; i++) {
    rnd = uniform(0, 1);
    demanda = obtenerDemanda(rnd);
    stock += perdidaAnterior;
    costoCompra = Number(toFixed(stock * compra, 4));
    if (stock < demanda) {
      costoPerdida = Number(toFixed((demanda - stock) * perdida, 4));
    } else {
      costoPerdida = 0;
    }

    if (stock > demanda) {
      gananciaReembolso = Number(toFixed((stock - demanda) * reembolso, 4))
    } else {
      gananciaReembolso = 0;
    }

    costoDiario = Number(toFixed(costoCompra + costoPerdida - gananciaReembolso, 4));
    costoAcum = Number(toFixed(costoAcum + costoDiario, 4));
    costoPromedio = Number(toFixed(costoAcum / i, 4));

    nuevaFila = [i, rnd, demanda, stock, costoCompra, costoPerdida, gananciaReembolso, costoDiario, costoAcum, costoPromedio];

    if (demanda > stock) {
      perdidaAnterior = (demanda - stock);
    } else {
      perdidaAnterior = 0
    }
    i >= desde && i <= hasta && rows.push(nuevaFila)
  }
  return rows.reverse();
}
