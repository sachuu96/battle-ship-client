// // import { NextRequest, NextResponse } from "next/server";
// // import { saveSessionForGame } from "../../../lib/sessionStore";

// // export async function POST(req: NextRequest) {
// //   const { gameId ,token} = await req.json();
// //   saveSessionForGame(gameId, token);
// //   return NextResponse.json({ success: true });
// // }

// // import { cookies } from "next/headers";
// import HttpClient from "@/lib/HttpClient";

// export async function POST() {
//   const axios = HttpClient.getInstance();
//   const response = await axios.post("/games");

//   console.log('response--',response)
//   // const sessionToken = response.data.gameId;



//   return new Response(JSON.stringify({ players: response.data.players }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }
