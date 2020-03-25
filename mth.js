'use strict'
//Reinan_Br 20/03/20 18:04


//constantes

const e = Math.e;

//


//CALCULO DIFERENCIAL

//limite aproximado
function lim(fun, x) {
  let xAprox = Math.abs(x) - x * 1.0e-10
  return fun(xAprox)
}

//derivida aproximada
const diff = (fun, x) => {
  let dx = 1.0e-10
  let x1 = x - dx
  let x2 = x + dx
  return (fun(x2) - fun(x1)) / (x2 - x1)
}

//


//TRIGNOMETRICOS

const sin = (a, mod = 'angle') => {
  if (mod === 'angle') {
    let res = a * 2 * Math.PI / 360
    res = Math.sin(res)
    return (res)
  }
  else if (mod === 'radian') {
    return Math.sin(a)
  }
}

const cos = (a, mod = 'angle') => {
  if (mod === 'angle') {
    let res = a * 2 * Math.PI / 360
    res = Math.cos(res)
    return res
  }
  else if (mod === 'radian') {
    return Math.cos(a)
  }
}
const tan = (a) => {
  return sen(a) / cos(a)
}

//


//FUNÇÕES ESPECIAIS

const sigmoid = (x, b = 1) => {
  let sum = 1 + Math.exp(-x * b)
  return 1 / sum;
}

//


/***   MATRIZES   ***/



class Matriz {
  constructor(array) {
    this._array = array;
    for (let i in array) {
      this.lines += i;
      if (array[i][0]) {
        for (let c in array[i]) {
          this.colunes += c;
        }
      }
    }
    //Tesão do python sendo aplicado
    /* if(this._array[0][0]){
       this.T = this._array
       let lim = 0
       for(let i in this._array){
         for(let c in this._array[i]){
           let lenArray = this._array.length;
           lim = (lim<=i)?i:i+1;
           let top = this.T[i][lenArray];
           let ini = this.T[lim][0];
           this.T[i][lenArray] = ini;
           this.T[lim][0] = top;
         }
       }
     }*/
    this.get = this._array
    this.M = true
  }
  callbackMap(callback) {
    let matriz = this._array
    for (let i in this._array) {
      if (this._array[i][0]) {
        for (let c in this._array[i]) {
          matriz[i][c] = callback(matriz[i][c]);
        }
      }
      else {
        matriz[i] = callback(matriz[i]);
      }
    }
    return matriz
  }
  pot(p) {
    let call = (array) => {
      return array ** p
    }
    return this.callbackMap(call);
  }
  exp() {
    let call = (array) => {
      return Math.exp(array)
    }
    return this.callbackMap(call)
  }

}

//criação de um espaço linear
const linspace = (init, end, space = 20) => {
  let dif = end - init
  let add = dif / space;
  let res = [init]
  for (let i = 1; i <= space; i++) {
    init += add
    res[i] = init;
  }
  res[res.length] = end
  return res;
}


//Criação de matriz
class MakerMatriz {
  constructor(lines, colunes = 0) {
    this._lines = lines - 1;
    this._colunes = (colunes > 0) ? colunes - 1 : 0
    this._matriz = [];
    for (let i = 0; i <= this._lines; i++) {
      this._matriz[i] = [];
      for (let c = 0; c <= this._colunes; c++) {
        this._matriz[i][c] = 0
      }
    }
  }
  zero() {
    let res = this._matriz
    return res
  }
  random() {
    this._matriz = [];
    for (let i = 0; i <= this._lines; i++) {
      this._matriz[i] = [];
      for (let c = 0; c <= this._colunes; c++) {
        this._matriz[i][c] = Math.random()
      }
    }
    return this._matriz
  }
}


//multiplicação entre matrizes
const dot = (array_1, array_2) => {
  let array1 = (array_1.M) ? array_1.get : array_1
  let array2 = (array_2.M) ? array_2.get : array_2
  console.log(array1)
  //let lenghtColunesArray1 = array1[0].length
  // let lengthLinesArray2 = array2.length

  //verifica como lista booleana se o numero das linhas da array1 são iguais ao numero de colunas da array2 em cada caso
  let listArguments = [];
  for (let i in array1) {
    listArguments[i] = (array1[i].length == array2.length)
  }
  // reduz todas as condições da lista booleana em unica condição 
  let argumentValid = listArguments.reduce((a, b) => {
    let res = (a && b)
    return res
  })
  //caso for permitido a conta 
  if (argumentValid) {
    //cria a array resposta com base inicial 0 para a conta de acordo com o numero de linhas da array1
    let res = []
    for (let r in array1) {
      res[r] = 0;
    }
    //conta sendo realizada
    for (let i in array1) {
      for (let c in array1[i]) {
        res[i] += array1[i][c] * array2[c];
      }
    }
    return res;
  }
  else {
    console.error('"dot error": operação matemática não permitida, respeite a linha e colunas entre matrizes para ocorrer a multiplicação.')
    return null;
  }
  //console.log('c
}


//mulitiplicação de vetores
const multi = (array1, array2) => {
  let res = [];
  if (array1.length == array2.length) {
    for (let i in array1) {
      res[i] = array1[i] * array2[i];
    }
    return res
  }
  else {
    console.error('"muliVector Error:" o numero de vetores devem ser iguais.')
  }
}

//divisão entre vetores
const div = (array1, array2) => {
  let res = [];
  if (array1.length == array2.length) {
    for (let i in array1) {
      res[i] = array1[i] / array2[i]
    }
    return res;
  }
  else {
    console.error('"divVector Error:" o numeros de vetores devem ser iguais.')
  }
}


//hipotenusa de termos
const hipotenusa = (array) => {
  let res = array.reduce((a, b) => {
    let res = a ** 2 + b ** 2
    return res
  })
  return res ** (1 / 2)
}

//p5js test

//exportação
const math = { linspace, MakerMatriz, dot, div, hipotenusa, multi, Matriz }