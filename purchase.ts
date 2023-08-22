import * as dotenv from "dotenv";
dotenv.config();

import * as NanocurrencyWeb from "nanocurrency-web";
import BigNumber from "bignumber.js";

const rawToRai = (raw: number) => {
  const value = new BigNumber(raw.toString());
  return value.shiftedBy(30 * -1).toNumber();
};

export const getPurchaseTotal = async () => {
  const wallets = await NanocurrencyWeb.wallet.legacyAccounts(
    process.env.DEPOSIT_SEED,
    0,
    10_000
  );

  const accounts = wallets.map(({ address }) => address);

  let balance = 0;
  let receivable = 0;

  try {
    const res = await fetch(`http://68.183.110.185:7076`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "accounts_balances",
        accounts,
      }),
    });

    const { balances, error } = await res.json();

    Object.values(balances).forEach((rawBalance) => {
      if (rawBalance) {
        // @ts-ignore
        const { balance: walletBalance, receivable: walletReceivable } =
          rawBalance;

        if (walletBalance) {
          balance = new BigNumber(balance).plus(walletBalance).toNumber();
        }
        if (walletReceivable) {
          receivable = new BigNumber(receivable)
            .plus(walletReceivable)
            .toNumber();
        }
      }
    });

    console.log("~~~~balance", rawToRai(balance));
    console.log("~~~~receivable", rawToRai(receivable));
  } catch (err) {
    console.log("~~~err", err);
  }
};

getPurchaseTotal();
