import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BreedAnalysis {
  breedName: string;
  confidence: number;
  type: 'cattle' | 'buffalo';
  origin: string;
  characteristics: string[];
  milkYield: string;
  specialty: string;
  description: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    
    if (!image) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const makeRequest = async () => {
      return await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are an expert in Indian cattle and buffalo breed identification. Analyze the image and identify the breed with the following Indian breeds:

CATTLE BREEDS:
- Gir: Gujarat origin, distinctive hump, long ears, white-brown coat, 8-12 L/day milk, disease resistant
- Sahiwal: Punjab origin, red-brown coat, medium hump, droopy ears, 10-14 L/day milk, heat tolerant
- Red Sindhi: Sindh origin, red coat, compact size, 6-10 L/day milk, drought resistant
- Kankrej: Gujarat origin, large size, silver-grey coat, lyre-shaped horns, 8-12 L/day milk, dual purpose
- Ongole: Andhra Pradesh origin, white coat, large hump, short horns, drought resistant, zebu type
- Hariana: Haryana origin, white-grey coat, medium hump, compact build, 6-8 L/day milk

BUFFALO BREEDS:
- Murrah: Haryana/Punjab origin, curved horns, black coat, 12-15 L/day milk, premium milk producer
- Jaffarabadi: Gujarat origin, large size, curved horns, dark coat, 10-12 L/day milk, largest buffalo breed
- Mehsana: Gujarat origin, medium size, curved horns, dark grey coat, 8-10 L/day milk, good draught animal
- Surti: Gujarat origin, compact size, curved horns, grey-black coat, 6-8 L/day milk, high fat content
- Nagpuri: Maharashtra origin, medium size, straight horns, dark coat, 8-10 L/day milk, heat tolerant

Respond in JSON format with:
{
  "breedName": "exact breed name",
  "confidence": confidence percentage (0-100),
  "type": "cattle" or "buffalo",
  "origin": "state/region of origin",
  "characteristics": ["key physical features"],
  "milkYield": "milk production range",
  "specialty": "primary specialty/advantage",
  "description": "detailed description about the breed"
}`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please analyze this image and identify the cattle or buffalo breed.'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: image
                  }
                }
              ]
            }
          ],
          max_tokens: 400,
          temperature: 0.3
        }),
      });
    };

    let response = await makeRequest();
    if (response.status === 429) {
      console.error('OpenAI API rate limited, retrying with backoff...');
      // Exponential backoff with jitter: 3 total attempts
      const delays = [1200, 2500];
      for (const delay of delays) {
        await new Promise((r) => setTimeout(r, delay + Math.floor(Math.random() * 300)));
        response = await makeRequest();
        if (response.ok) break;
        if (response.status !== 429) break;
      }
    }

    if (!response.ok) {
      const text = await response.text();
      console.error('OpenAI API error:', response.status, response.statusText, text);
      const status = response.status === 429 ? 429 : 500;
      const msg = response.status === 429 ? 'Rate limited by OpenAI. Please try again shortly.' : 'Failed to analyze image';
      return new Response(
        JSON.stringify({ error: msg }),
        { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    
    console.log('OpenAI response:', content);
    
    try {
      let jsonText = content;
      if (typeof jsonText !== 'string') jsonText = String(jsonText ?? '');
      // Attempt to extract JSON object if the model wrapped it
      const start = jsonText.indexOf('{');
      const end = jsonText.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        jsonText = jsonText.slice(start, end + 1);
      }
      const analysis: BreedAnalysis = JSON.parse(jsonText);
      
      return new Response(
        JSON.stringify({ success: true, analysis }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError, 'content:', content);
      return new Response(
        JSON.stringify({ error: 'AI response parsing failed. Please retry.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in analyze-cattle function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});