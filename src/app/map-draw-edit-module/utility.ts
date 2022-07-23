
export class Utility {
   public static toString(value: any): string {
    let valret = '';
    if (value === '' || value === null || value === undefined) {
      return valret;
    }
    valret = value.toString().trim();
    return valret;
  }

  public static toInteger(value: any): number {
    let valret = 0;
    if (!value) {
      return valret;
    }
    const str = value.toString().trim();
    valret = parseInt(str, 10);
    return valret;
  }

  public static toDecimal(value: any, removecomma = true): number {
    let valret = 0;
    if (!value) {
      return valret;
    }
    const str = value.toString().trim();
    if (removecomma === true) {
      valret = parseFloat(str.replace(',', '.'));
    } else {
      valret = parseFloat(str);
    }
    return valret;
  }
}
