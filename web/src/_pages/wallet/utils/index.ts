import { TokenEvent } from '@/shared/types';

export const calculateWalletBalance = (mints: TokenEvent[], burns: TokenEvent[]) => {
  const mintBalance = mints
    .map((m) => {
      const burnsAmount = burns
        .filter((b) => b.token === m.token)
        .map((b) => b.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      return { ...m, amount: m.amount - burnsAmount };
    })
    .reduce((acc: TokenEvent[], currentValue) => {
      // Find if the acc already has an object with the same type
      const existing = acc.find((item) => item.token === currentValue.token);

      if (existing) {
        existing.amount += currentValue.amount;
      } else {
        acc.push({ ...currentValue });
      }

      return acc;
    }, []);

  // //@ts-ignore
  // const burnsFiltered: TokenEvent[] = burns
  //   .map((bb) => {
  //     //if true, token was already taken into account in mintBalance
  //     if (mints.some((m) => m.token === bb.token)) return;

  //     return bb;
  //   })
  //   .filter((b) => !!b);

  // const burnBalance = burnsFiltered.reduce((acc: TokenEvent[], currentValue) => {
  //   // Find if the acc already has an object with the same type
  //   const existing = acc.find((item) => item.token === currentValue.token);

  //   if (existing) {
  //     existing.amount += currentValue.amount;
  //   } else {
  //     acc.push({ ...currentValue });
  //   }

  //   return acc;
  // }, []);

  const walletBalance = [...mintBalance].filter((item: TokenEvent) => item.amount);
  return walletBalance;
};
