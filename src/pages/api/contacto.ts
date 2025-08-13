import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabaseClient";


export const POST: APIRoute = async ({ request }) => {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded ? forwarded.split(",")[0].trim() : realIp || "unknown";

    
    const fechaActual=Date.now();
    const limit=7;
    const windowsMS=60*60*1000;
    
    const{data,error:IPError}=await supabase
    .from('ip_logs')
    .select('*',{count:'exact'})
    .gte('created_at',new Date(fechaActual-windowsMS).toISOString())
    .eq('ip_address',ip);

    if(data&&data.length>=limit){
      return new Response(JSON.stringify({error:"Limite alcanzado por IP"}),{
        status:429,
      });
    }

    const { nombre, correo, mensaje } = await request.json();
    const { error } = await supabase
      .from("mail")
      .insert([{ nombre, correo, mensaje }]);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    await supabase.from('ip_logs').insert({ip_address:ip});
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error en el servidor" }), {
      status: 500,
    });
  }
};
