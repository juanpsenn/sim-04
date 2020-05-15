// Frecuencias acumuladas
// 20	0,30	0,30
// 21	0,25	0,55
// 22	0,20	0,75
// 23	0,15	0,90
// 24	0,05	0,95
// 25	0,05	1,00

const demandas = [20, 21, 22, 23, 24, 25];
const frecuenciasAcumuladas = [0.30, 0.55, 0.75, 0.90, 0.95, 1.00];
export const randomTest = [0.22, 0.50, 0.13, 0.36, 0.91, 0.10, 0.72, 0.74, 0.76, 0.82, 0.94, 0.56,
  0.67, 0.66, 0.60, 0.50, 0.82, 0.00, 0.79, 0.89];

export function obtenerDemanda(random) {
  let demanda;

  frecuenciasAcumuladas.forEach((frecuencia, index) => {
    if (!demanda && random < frecuencia) {
      demanda = demandas[index]
    }
  });

  return demanda;
}

