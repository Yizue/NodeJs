// One off exports
export const name = "square";

export function multiply(a : number, b: number) {
  return a*b;
}

const name2 = "triangle";

function multiply2(a : number, b: number) {
  return a*b;
}

// Group exporting - can rename exported things with new names
export { name2, multiply2 as newMultiply};

export class Square {
    height : number;
    width : number;

    constructor(h : number, w : number) {
        this.height = h;
        this.width = w;
    }

    getArea() {
        return multiply(this.height, this.width); // scoped here to access functions in same file
    }
}