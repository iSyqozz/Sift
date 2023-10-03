export const API_URL = 'https://api-mainnet.magiceden.dev/v2/';
export const TOKEN_ADDRESS = '5tY1iB3VV9oFVV84tDwVWYomUdCHTzKtsdAimRZfup4o';

export interface nftEntry {
    name?: string,
    price?: number,
    mintAddress?: string,
    image?: string
    tick?: string
}

export interface collectionEntry {
    symbol: string,
    name: string,
    description: string,
    image: string,
    floorPrice: number,
    volumeAll: number,
    nfts?: nftEntry[],
}

