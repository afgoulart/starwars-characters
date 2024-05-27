import HttpStatusCodes from 'http-status-codes'
import { NextResponse } from "next/server";
import { handleResponse } from "../../utils";
import { API_BASE_URL } from '../../../config';
import { ResultAPIType } from '../../../types';

type CtxParams = {
  params: {
    route_path: string[]
  }
}

export async function GET(req: Request, ctx: CtxParams) {
  const { route_path } = ctx.params

  try {
    const resp = await fetch(`${API_BASE_URL}/${route_path.join('/')}`, {
      method: "GET"
    })
    const respData: ResultAPIType = handleResponse(await resp.json(), API_BASE_URL.replace('/', '\\/'), '');
    console.log(JSON.stringify({ count: respData.count, next: respData.next, previous: respData.previous }));

    return new Response(JSON.stringify(respData), {
      status: HttpStatusCodes.OK,
      statusText: 'OK'
    })

  } catch (e: any) {
    return new Response(e.message, {
      status: HttpStatusCodes.BAD_REQUEST
    })
  }



}

// POST  http://localhost:3001/auth
export async function POST(req: NextResponse) {

  const userInfo = await req.json()

  console.log("=======", userInfo)
  const resp = await fetch(`${API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  const respData: any = await resp.json()
  if (respData.errors) {
    return new Response(resp.statusText, {
      status: HttpStatusCodes.BAD_REQUEST
    })
  }

  return new Response('Request successful', {
    status: HttpStatusCodes.OK,
    headers: {
      'Set-Cookie': `user-token=${respData.token}`
    }
  })
}