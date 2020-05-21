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
  let compra = Number(kc);
  let perdida = Number(kp);
  let reembolso = Number(gr);
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

    costoDiario = ((costoCompra + costoPerdida - gananciaReembolso) > 0 &&
      Number(toFixed(costoCompra + costoPerdida - gananciaReembolso, 4))) || 0;
    costoAcum = Number(toFixed(costoAcum + costoDiario, 4));
    costoPromedio = Number(toFixed(costoAcum / i, 4));
    nuevaFila = [i, rnd, demanda, stock, costoCompra, costoPerdida, gananciaReembolso, costoDiario, costoAcum, costoPromedio];
    i >= desde && i <= hasta && rows.push(nuevaFila)
  }
  return rows.reverse();
}

export function calcularFilaPoliticaA(iteraciones, kc, kp, gr, demandaAnterior, perdidaAnterior, desde, hasta) {
  let nuevaFila = [];
  let costoCompra = 0;
  let costoPerdida = 0;
  let gananciaReembolso = 0;
  let costoDiario = 0;
  let costoAcum = 0;
  let costoPromedio = 0;
  let rnd;
  let demanda = demandaAnterior;
  let stock = demandaAnterior - perdidaAnterior;
  let compra = Number(kc);
  let perdida = Number(kp);
  let reembolso = Number(gr);
  let rows = [[0, "--", demanda, stock, costoCompra, costoPerdida, gananciaReembolso, costoDiario, costoAcum, costoPromedio]];

  for (let i = 1; i <= iteraciones; i++) {
    rnd = uniform(0, 1);
    stock = demanda + perdidaAnterior;
    demanda = obtenerDemanda(rnd);

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

    costoDiario = ((costoCompra + costoPerdida - gananciaReembolso) > 0 &&
      Number(toFixed(costoCompra + costoPerdida - gananciaReembolso, 4))) || 0;
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
