
import { Connection, PublicKey, AccountInfo } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { TOKEN_ADDRESS } from "@constants";


const mintList = [
    "5tY1iB3VV9oFVV84tDwVWYomUdCHTzKtsdAimRZfup4o",
    "1ztKNvCC4Aw6k5eW5Pev6kLspZbEKsdnkQwpi6T2c9J",
    "22MMEhhHiUTSN5FPvhkrkBbmtVhjrMzNYWtaewKTshTz",
    "25hJivzrEMuwZsQBm1EkGUuoTsGkyfjDHZjcCjKvYVHZ",
    "2QniQhdW7fFpndufznW7moEaYefudxrRDLStxjYcgrqN",
    "2RT8uWDKRR2d33SxShYDzCyzBY17w9nwvN43c46CZWRc",
    "2d1QBZhUaAtNtu2bLxrQrSt7y6XXdhE9bFcqZwkZQ8B4",
    "2yh9a3NBPJbU2hw5hFRsV39yqxPEqawerSuovVX5CGbn",
    "2z2eo1AqgawoYd1akF2ZnQFcRdfU31Mxm95cgVjgPxc1",
    "3gbFWSsC3o2jTf9f1ru6EaBQqNt8s5DqZHGynPyFHEqc",
    "4FLKKGJTWbBoprMxwWHePar4rLcEeK1ss2bpqW6yEQnH",
    "4WNTLzXdXT2tFdi4hLLGh16CjMzf9TEsSQ4unmqR9i58",
    "5KRoh9uLBZ16i1DFwLHrr95bBCckzUsMAEFV3x1y2Tah",
    "5L9nPzoczRYdGHS2ZpXw8nbVaCkwW4yCyFGqnct4QsAe",
    "5QarZW9nHr9E7Y31r9Ntpubu7QFzszPUFvsHAZzfwRgD",
    "5V7ZCMx9d9SeMSTnj2ndbWrNEfDeeaWfXeXRcZ7YZNWj",
    "5w4QfgDBXxjJaY8KNiV6mLXh6ofWJ69HfM3BFaRgHUSr",
    "65ABk8C9RtREDbsVxP2an6jJuTZiJ9BcowgHE8Mt8uX1",
    "6AVEHpaNW3v6Hma1P5gXsLL9jmQS2GZBa1vAEfW2Sj8d",
    "6D8qoXLos89EWHzYL8zfwNoUjv6ZTzxMkeV14z4Y9TCH",
    "6SyXXrQPruuG5dtajDbPD6qxZTFQ8HHdhuc6po7ZNg48",
    "6WkWAkpXmjduoXJbkVJ4fpMGMPstnTRgTAMAQ8P3ppcA",
    "6f1kwC8xgsd7znEfZNqMFB1zRQLLy7wWRBs6x65JKSQ3",
    "6xoUvbCvJbEfAM2fvTzt1tAxcRPh7V1SWX3eBFvbADnV",
    "6y7VcYD1dE9LQN9B1ZgZrMYFQUmPXsHrfBmXfR9ErQVU",
    "7FJhHhm3ssF6uKJqCYBP5dvNJapuP9Bat2aXmjaBgnGY",
    "7FoHm9d7Qr7nw8mr9k2ke42H5ixZWi9PjJjv6sreCJyU",
    "7WewEXRx1N95k4eVrddZgoRmLk7L5YtSctDj7rckQJZv",
    "7cyf94AKm45JvoiYaq9eK8gb6Bf35pRuqjLE1vUNdNh5",
    "7pNx9XMQh22PPvYYdrFbASPCQNV5FEAZ7hnURHrJZJwj",
    "7sasq9wGko6V1QvUeu5dzfiKb6kSprVeXSA5Wrz2ykRx",
    "877wRMLURV3cBgjd7ysDaALKbxHVnQptUStePQ1d6Rcx",
    "8JQogA9ezc1ZdUYXDcv4WG45gpaMJtMaw4AaafFHMCLP",
    "8KGE8dXuVgSRWSTjpFN3fmAzS2EkPmwY4CpydrrxNg2y",
    "8MQ3oivUyy8KhC2ADL9pSkpW6EKp7Yi4B85ZkaSe6gex",
    "8QSuGVqmpWo64wjbsiqHjVtsUsL9YHaiwBtozAkuSB8y",
    "8VALrw3ZtG9mnQBbjAetoJATWw6MhALW819Pg5oVpWUD",
    "8YMDmRPyfQPYW2No5f7yevPykPBDWMwQr8mbcvMrZBCb",
    "8fGH5L4EnhpnZGMuBoDLKV2dWsR8q19kxBca8TbdwWe8",
    "8g56f2TzEEw5pZ8ViTA7ikuPHfxseKR8SupPqLRBaSNF",
    "8w87kSd347joRqP6aViKdpQMJhrE3fqgQgxxoUXR8qtZ",
    "913HN8WmBSsYeg9cgSHLbCMFoMqBhNuCLZrx4xrsEt36",
    "91tX8vyr5xGhr9wjJCigNs1DQLyWJLHuzxLSR9raXUVn",
    "982BFvU1qT5DKrfz9iYfF9BunKm6C5FcSxU7msjMd7mm",
    "9AtwCZGgNuppxpktoPkkvhB8xmgcBcbWffnm2FPqZrVA",
    "9MiPqZaeGGeyiPF6TV3Vc7T3Unx7KY4AihRSMNuoRNfm",
    "9TrxmGwwkC18htD5QZboE98Nj3QAimPHisYDUjtrQcBz",
    "9pj4QfBkLC5hUYnxVyxSwfawB5QRV8o2xTV1BLfqv6Yi",
    "A1XATxe3CSXXTQDku6da7g5ztMybdT1i4UVYASRcrvXS",
    "A2y5YeNQhTfy4Ncze8joUGkwt83yZEk2VVz5biQPaxBK",
    "A5PpQFgZ58LbwTcJqqyqMKZUqWfDdcPdXXGKKeW1bjGm",
    "A9qMNEmuRQq5UzcLYZKf3aDdDuB35hCDCKC2mKtXfHmA",
    "AExLFikfRn792ifJz4vpuDCNnCBReuhZZbyJK6iQMaxB",
    "Af8CFsLbZ6kSD3AnnpX4gyJ7reYibfFpxbi5mKvn4XVd",
    "AruXq3oUovWV5B9VTsr2yJ1Tmy8YZKU36enTKF1J9wcD",
    "B3uHF2e1BdsXywNjSanMUEzf3ztWZRvWyGZZrPBUWDBC",
    "B4TGcjwWocgWH1L5S7hQptmGzJk9EtZTU926S7uL72yK",
    "BAWHf8XCwN3H4wL5m2JJn4pEP4bwPBkmASVoi38Pjvdh",
    "BGySx2rNWyzvwwZfjFECxEW1oQtfZA43g3rwabUUkL2Y",
    "BK4iFSkE3hJaKk5SbEjXzXAGS48HRjC8WAsEt9q1Az35",
    "BKQjsf1UMqw7knpvH9FJd4jXQsEbQCS4YNuPWZW7htvb",
    "BPCT8YP73FCeuKWBJpG2AsQjpmLuifCcJZDcXYTp15ox",
    "BWVUtcuMHZdSyZ5TKkyR33ebLczxnZ7up9PSjpEy1EJ3",
    "BXpKAiJQvseS3C1qPJeuWKm1MFLwYLPkFsYcKhhVJRnY",
    "BfBST4NYnAfEfBUpp3VyzGDAuWN3GHz34yi8raaoL9xS",
    "BguJbmsEuk5k6FKmnuZ1eKWNL5G9eSuxsayDiiSxsA7D",
    "C5mmVsMjrr547YQEq5AhGgAp9RSZES6UM9mWohWwod7a",
    "C6ne1z3QJ7yDbkCA8DcFcL5dcjBno5p9NQmwovvsgYyU",
    "C7CWN54MMDjXPNzCS1UZwuga5CeUH4JjCBDKtwdjPCDz",
    "C8aYYBcXdtQExaiZ8VLqRQGRKr8Ly3WgqcBfNfJigHym",
    "CAYbfjU2hSsFufGoHq1vke7Lxr2TE3BY1ZdseZSZ3nev",
    "CHZ1hBTyTA7Uk6hsxqJXGw93vPsJ4AZfLHF7m8NtaSUa",
    "CLxBPbx4SmWuad27N8gKR9s8WveLnvP4dVBVQya3xSkf",
    "CYscpqE8DvfYqXdErDj1QNB1mDF8maprNNG99eNsPhvs",
    "CdazsaCGXVGmzR6pPsr5Hs5vrage8mWx5sKmjEVLi3qv",
    "Ce6sJGr2s7WQrUVqaJom9KgFFn7ZFrqnnEZa7iSB2g1S",
    "CiJ3jeWPvDhjqYCujLANKWCBkK4Jr74nocxWYw5X3Ubo",
    "Cke4gfFQYx8dKFnbJjJiLmgsFbHAX2xUqX7u4chvWJmx",
    "CmFyXqP8VEFpn2AWabCd7AvGfUA3CshtCPDEz5cBybAE",
    "Cqv6AYbJmy1idP1faUz4mmGXDrZ2UQkH3YxLv523p8sH",
    "D23uHbNF4pn9gUQpC4bhLMWw8CaZUM17Jm7mHBAZKJbF",
    "D8XgnQ3ouWWqchGQQFYuJy7tppsN3PvufxaCzao4CGUR",
    "DAPcgwzdj5Fa917Y7JjkBWyvgEavx5p1qoYE19KjwpN6",
    "DLXMuMyvBgzZJEmXo13whsddtVgFkV3cTRE9wbwBy2P4",
    "DRyTrMjoQM2ZLNsB85YmQWvobWJUeAH6SDvM3f3ham2",
    "Dyd2Sb9rWHmpKwvaQp8vbsjiw43QL1CYkFr5oDp9DJdG",
    "E3nPAJkC2Jeoue1eZuLZn3RERtkMiscJp2g57fJ1N5UD",
    "EGJF1n53XGFpi2vjBUvXGK8Z1m7NpvfQJXuhCePjViCC",
    "EUR1kMqPuoiXFPPJMUgacV8TRycXn1wZXxJa2UvMUVd5",
    "EenudSpkVvW6KCianJVCLW3uS7HiSD622gpmqBqa68dz",
    "Eetv3oznbEC9HdsEk1ha3Cpq3Srf4ord3twCEPRYmaKc",
    "FETRyeBDYFur7HUpao9oTeTA68Qd9dW3ueGAdorJhSbB",
    "FcwzR3iwncScj1Gk1TGhuqQXi3voPLvttpeXrEr34DH4",
    "Fhc5UFZShNY9UbvdVQxJfWTVH8oBP7xM3bUpP1eXi934",
    "FntmQxovbod3rcUuJef1Wjk89xhjMfuNbz8FnxxJNs63",
    "FpuWqgA2WnAuQuXK4WykV3twwYRXoYvEEGfZYqYh6CaW",
    "FxboWViewAXKsqvXkERSz9EdQ1MxTzmHB6PmduK6e1xm",
    "Fy6eCBTGLQkoFNTZgS6xF6tQMffKVpcUUA2vY69PD5ui",
    "GJUaGvz5tEdcLs8xMQ9sbNAUEFjpkuyMLoUtvR65tA7G",
    "GTWySb5nsgzu8yNtSfM2dq7JwFQEDA4FDvkxAtxuvJ4L",
    "Gn3QLCksAma8Kek6SFDDEUakZMzLzvRwT3amxzzPnJLC",
    "GqHsn3D4EdHRVTm92x7fDApNYQMsGxpcHw4t9PZrr78w",
    "Gqo6Gf5aLCKJTR66CwdM9z6yMb3ZVPecEJeYiRphxeMM",
    "GtB7WGAJRTou9MKjpHjd9SEngJggYDGXTwdEtyzSphjJ",
    "Gv3yKa1BvKpZBUA9sx4iJYgPkcZtFYVdjHpZfc5HDZDK",
    "HAn4NRJEck5yioy1WXroGy3mw6boD3FSgnBZcN7Gzb8a",
    "HD2o7VoDwynWrR36mMZVW2dDAyBymZGC3zxfV1Bk34s",
    "HGECS4JGfY6Umd9zF5Ebzjm63uqP86CL17wkJRZ26bgH",
    "HLJwV7AJ3Li6ug9CbCwhw1gtYoBTEHt7S4BrrAQczhjR",
    "HWXXjBp8o6Kr29Lz5yqGHy5wjJySr5PpgcmHSevXKb3k",
    "J49QAHWMBv8FNQysrkyiDFFPo8KkjmcpYcPBCXzwt92w",
    "JCdgp9mqNyB4h4wwhyoyCK9BbW3MSoE7Y9LsNbLEbszS",
    "RKeeaC91FwjaKDkdfkNi6mHDhorj5aeUZzdG2Fw6SmX",
    "pa91v44ANfmQz57ZB5G4xXY3UrDgxfW2MJq77LncPkn"
]


const mintSet = new Set(mintList);


async function GET(req: Request) {
    try {
        const data = new NextURL(req.url).searchParams.get('address')
        const connection = new Connection(process.env.RPC_URL as string);
        const ownerAddress = new PublicKey(data as string);

        let isValid = false
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerAddress, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });

        for (var cand in tokenAccounts.value) {

            const address = (tokenAccounts.value[cand].account.data.parsed['info'].mint)
            const amount = tokenAccounts.value[cand].account.data.parsed['info'].tokenAmount['amount']

            if (mintSet.has(address) && (amount !== '0')) {
                isValid = true;
                break;
            } else {
                continue;
            }
        }
        return NextResponse.json(isValid)
    } catch (e) {
        console.log(e);
        return NextResponse.json(false);
    }
}
export {
    GET,
}

export const dynamic = 'force-dynamic'
