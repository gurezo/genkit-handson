import { startFlowServer } from '@genkit-ai/express';
import { gemini20Flash, googleAI } from '@genkit-ai/googleai';
import * as cheerio from 'cheerio';
import { genkit, z } from 'genkit';
import { logger } from 'genkit/logging';
logger.setLogLevel('debug');

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

const webLoader = ai.defineTool(
  {
    name: 'webLoader',
    description:
      'When a URL is received, it accesses the URL and retrieves the content inside.',
    inputSchema: z.object({ url: z.string() }),
    outputSchema: z.string(),
  },
  async ({ url }) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    $('script, style, noscript').remove();
    if ($('article')) {
      return $('article').text();
    }
    return $('body').text();
  }
);

const mainFlow = ai.defineFlow(
  {
    name: 'mainFlow',
    inputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({ prompt: input, tools: [webLoader] });
    return text;
  }
);

startFlowServer({ flows: [mainFlow] });
