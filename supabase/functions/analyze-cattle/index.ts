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
              content: `Identify Indian cattle/buffalo breed. Key breeds: Gir (Gujarat, white-brown, 8-12L milk), Sahiwal (Punjab, red-brown, 10-14L), Murrah (black buffalo, 12-15L), Jaffarabadi (large buffalo, 10-12L). JSON: {"breedName":"name","confidence":0-100,"type":"cattle/buffalo","origin":"state","characteristics":["feature1","feature2"],"milkYield":"range","specialty":"advantage","description":"brief"}`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Identify breed from image.'
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
          max_tokens: 300,
          temperature: 0.2
        }),
      });
    };

    let response = await makeRequest();
    if (response.status === 429) {
      console.error('OpenAI API rate limited, retrying with backoff...');
      // Enhanced exponential backoff: 4 total attempts with longer delays
      const delays = [2000, 5000, 10000];
      for (const delay of delays) {
        await new Promise((r) => setTimeout(r, delay + Math.floor(Math.random() * 1000)));
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