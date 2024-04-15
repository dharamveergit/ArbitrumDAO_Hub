import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import abbreviate from "@pqt/abbreviate";

export const stringToBigNumber = (tokenValue: string): BigNumber => {
  try {
    return BigNumber.from(tokenValue);
  } catch {
    return BigNumber.from(0);
  }
};

export const bigNumberToNumber = (
  bigNumber: BigNumber,
  decimals: number,
): number => {
  const isNftGovernance = (decimals: number) => decimals === 0;

  const number = isNftGovernance(decimals)
    ? bigNumber.toNumber()
    : Number(formatUnits(bigNumber, decimals));

  return number;
};

export const limitNumberDecimals = (number: number, precision = 2): number => {
  if (number < 0.0001) {
    return 0;
  }

  const [integer, decimals] = String(number).split(".");

  if (!decimals) return Number(integer);

  const decimalsToUse = decimals.slice(0, precision);

  return Number(integer + "." + decimalsToUse);
};

export const getWeightLabel = (
  _weight: BigNumber | string,
  decimals: number,
  isAbbreviated = true,
  decimalPlaces = 2,
): string => {
  try {
    const weight =
      typeof _weight === "string" ? stringToBigNumber(_weight) : _weight;
    // https://linear.app/withtally/issue/TALLY-2739/contract-parameters-section-doesnt-load-in-metastonez-dao

    const number = bigNumberToNumber(weight, decimals);

    if (number > 1000) {
      return isAbbreviated
        ? abbreviate(number, decimalPlaces)
        : String(limitNumberDecimals(number, 0));
    }

    if (number === 0) return String(0);
    if (number > 0.01) return String(limitNumberDecimals(number));

    return "< 0.01";
  } catch (err) {
    // If there is any issue (i.e. overflow), then it returns "?" label
    return "?";
  }
};

export const getTotalWeight = (_weights: (string | BigNumber)[]): BigNumber => {
  const weights = _weights.map((weight) =>
    typeof weight === "string" ? stringToBigNumber(weight) : weight,
  );

  const totalWeight = weights.reduce((currentTotal, weight) => {
    return currentTotal.add(weight);
  }, BigNumber.from(0));

  return totalWeight;
};
