import { NextResponse } from "next/server";
import { API_URL } from "@constants";
import { NextURL } from "next/dist/server/web/next-url";
async function GET(req: Request) {
    
    const data = new NextURL(req.url)
    const limit = data.searchParams.get('limit');
    const name = data.searchParams.get('name');
    
    const jsonRes = await fetch(API_URL + 'collections/' + name + '/listings?limit='+limit, {
        method: 'GET',
        cache: 'no-store',
    })
    
    const res = await jsonRes.json();
    return NextResponse.json(res)
}
export {
    GET,
}

export const dynamic = 'force-dynamic'