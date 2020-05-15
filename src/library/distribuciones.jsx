class Generador {
  constructor() {
    this.m = 4294967296;
    this.a = 1664525;
    this.c = 1013904223;
    this._last = Date.now();
  }

  getNext() {
    // this._last = (this.a * this._last + this.c) % this.m;
    // return Number(toFixed(this._last / this.m, 4));
    return Math.random();
  }
}


export function uniform(a, b) {
  let generador = new Generador();
  let r;
  let temp;

  temp = (generador.getNext() * (b - a));
  r = (Number(a) + temp);
  return Number(toFixed(r, 4));
}

export function poisson(lambda) {
  let generador = new Generador();

  let p = 1;
  let x = -1;
  let a = Math.exp(-1 * lambda);
  let u = generador.getNext();
  p = p * u;
  x = x + 1;
  while (p >= a) {
    u = generador.getNext();
    p = p * u;
    x = x + 1;
  }
  return x
}


export function boxMuller(media, desv) {
  let generador = new Generador();

  let r1 = generador.getNext();
  let r2 = generador.getNext();

  let n1 = (Math.sqrt(-2 * Math.log(r1)) * Math.cos(2 * Math.PI * r2)) * desv + media;
  let n2 = (Math.sqrt(-2 * Math.log(r1)) * Math.sin(2 * Math.PI * r2)) * desv + media;

  return [n1, n2]
}

export function convolution(media, desv) {
  let generador = new Generador();

  let rnd = 0;
  for (let i = 0; i < 12; i++) {
    rnd += generador.getNext();
  }
  rnd = ((rnd - 6) * desv) + media;
  return Number(toFixed(rnd, 4))
}

export function exponential(media) {
  let generador = new Generador();
  let exponencial;
  let lambda = (1 / Number(media));

  let random = generador.getNext();
  exponencial = -1 * (1 / lambda) * Math.log(1 - random);
  return Number(exponencial);
}


export function arrayMin(arr) {
  let len = arr.length,
    min = Infinity;
  while (len--) {
    if (Number(arr[len]) < min) {
      min = Number(arr[len]);
    }
  }
  return min;
}

export function arrayMax(arr) {
  let len = arr.length,
    max = -Infinity;
  while (len--) {
    if (Number(arr[len]) > max) {
      max = Number(arr[len]);
    }
  }
  return max;
}

export function toFixed(num, fixed) {
  let re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re) ? num.toString().match(re)[0] : num.toString();
}
