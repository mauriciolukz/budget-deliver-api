export const sumOne = async (value: string): Promise<string> => {
  return new Promise((res, rej) => {
    const len = value.length;
    let number = 0;
    let caract = '';
    let carctNumber = 0;

    let maxPosCar = 0;

    for (let i = 0; i <= len - 1; i++) {
      const position = value[i];
      if (!isNumber(position)) {
        maxPosCar = i + 1;
      }
    }

    caract = value.substring(0, maxPosCar);
    number = parseFloat(value.substring(maxPosCar, len));
    carctNumber = value.substring(maxPosCar, len).length;

    number++;
    fill(number, carctNumber, '0').then((newValue) => {
      res(caract.concat(newValue));
    });
  });
};

function isNumber(numero) {
  if (isNaN(numero)) {
    //No es numero
    return false;
  }
  return true;
}

function fill(digitos: number, n: number, carac: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const digi = digitos.toString().length;
    let cadenaDigitos = '';
    for (let i = 0; i < n - digi; i++) {
      cadenaDigitos += carac;
    }
    cadenaDigitos += digitos;

    resolve(cadenaDigitos);
  });
}
