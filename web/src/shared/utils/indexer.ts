type Tokens = {
  amount: bigint;
  count: bigint;
  name: string;
};

export class Indexer {
  url: string;
  headers: { 'x-hasura-admin-secret': string; 'Content-Type': string };

  constructor(url = process.env.NEXT_PUBLIC_HASURA_URL || 'https://loyalz-envio.majus.org') {
    this.url = `${url}/v1/graphql`;
    this.headers = {
      'x-hasura-admin-secret': 'testing',
      'Content-Type': 'application/json',
    };
  }

  groupByName(data: any) {
    const tokens: Tokens[] = [];
    //@ts-ignore
    data.forEach(({ name, amount }) => {
      tokens[name] = {
        amount: BigInt(tokens[name]?.amount || 0) + BigInt(amount),
        count: BigInt(tokens[name]?.count || 0) + 1n,
        name,
      };
    });
    return tokens;
  }

  evaluateAvgPerToken(data: any) {
    const tokens = this.groupByName(data);
    //@ts-ignore
    return Object.values(tokens).map(({ name, count, amount }) => ({ name, avg: amount / count }));
  }

  async fetch(query: string, method = 'POST') {
    const { url, headers } = this;
    const result = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({
        query,
        variables: {},
      }),
    });
    const { data, errors } = await result.json();
    if (errors) {
      console.error(errors);
    }
    return data;
  }

  async tokenCreatedNumber() {
    const { MultiTokenERC20_TokenCreated_aggregate: data } = await this.fetch(`
      query MyQuery {
        MultiTokenERC20_TokenCreated_aggregate {
          aggregate {
            count
          }
        }
      }
    `);
    return data.aggregate.count;
  }

  async tokenMintedAmount() {
    const { MultiTokenERC20_TokensMinted_aggregate: data } = await this.fetch(`
      query MyQuery {
        MultiTokenERC20_TokensMinted_aggregate {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
    `);
    return data.aggregate.sum.amount;
  }

  async tokenBurnedAmount() {
    const { MultiTokenERC20_TokensBurned_aggregate: data } = await this.fetch(`
      query MyQuery {
        MultiTokenERC20_TokensBurned_aggregate {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
    `);
    return data.aggregate.sum.amount;
  }

  async avgMintedAmountPerToken() {
    const { MultiTokenERC20_TokensMinted: data } = await this.fetch(`
      query MyQuery {
        MultiTokenERC20_TokensMinted {
          name
          amount
        }
      }
    `);
    return this.evaluateAvgPerToken(data);
  }

  async avgBurnedAmountPerToken() {
    const { MultiTokenERC20_TokensBurned: data } = await this.fetch(`
      query MyQuery {
        MultiTokenERC20_TokensBurned {
          name
          amount
        }
      }
    `);
    return this.evaluateAvgPerToken(data);
  }

  async avgMintedBurnedRatioPerToken() {
    const { MultiTokenERC20_TokensMinted: minted } = await this.fetch(`
      query MyQuery {
        MultiTokenERC20_TokensMinted {
          name
          amount
        }
      }
    `);
    const { MultiTokenERC20_TokensBurned: burned } = await this.fetch(`
      query MyQuery {
        MultiTokenERC20_TokensBurned {
          name
          amount
        }
      }
    `);
    const mintedTokens = this.groupByName(minted);
    const burnedTokens = this.groupByName(burned);
    const tokenNames = Array.from(
      new Set([...Object.keys(mintedTokens), ...Object.keys(burnedTokens)]),
    );
    const ratios = tokenNames.reduce((acc, name) => {
      if (burnedTokens[name]?.amount) {
        //@ts-ignore
        return acc + (mintedTokens[name]?.amount || 0n) / burnedTokens[name]?.amount;
      }
      //@ts-ignore
      return acc + (mintedTokens[name]?.amount || 0n);
    }, 0n);
    return ratios / BigInt(tokenNames.length);
  }
}
