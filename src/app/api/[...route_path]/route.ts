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
      method: "GET",
      cache: 'no-store'
    })
    const respData: ResultAPIType = handleResponse(await resp.json(), API_BASE_URL.replace('/', '\\/'), '');

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

