import { NextResponse } from "next/server";
import { API_URL, collectionEntry } from "@constants";
async function GET(req: Request) {
    
    const jsonRes = await fetch(API_URL + 'marketplace/popular_collections', {
        method: 'GET',
        cache: 'no-store',
    })
    
    const res = await jsonRes.json();
    
    const finalRes: collectionEntry[] = res.map((entry: collectionEntry) => {
        entry.image = 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/' + entry.image;
        return entry
    })
    
    return NextResponse.json(finalRes)
}
export {
    GET,
}

export const dynamic = 'force-dynamic'