// AI crawlers, AI search bots and AI assistants that fetch pages on a user's
// behalf. One list feeds both robots.txt (the polite ask) and the middleware
// (the 403 for bots that ignore it). Regular search engines (Googlebot,
// Bingbot, Applebot) and link-preview bots (Twitterbot, LinkedInBot,
// facebookexternalhit, Slackbot, Discordbot) are deliberately not listed.
export const AI_BOTS = [
  // OpenAI
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Claude-Web',
  'anthropic-ai',
  // Google AI (training/grounding opt-out; Googlebot search stays allowed)
  'Google-Extended',
  'GoogleOther',
  'Google-CloudVertexBot',
  'Gemini-Deep-Research',
  // Apple AI (Applebot search stays allowed)
  'Applebot-Extended',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Meta
  'meta-externalagent',
  'meta-externalfetcher',
  'FacebookBot',
  // Others
  'CCBot',
  'Bytespider',
  'TikTokSpider',
  'Amazonbot',
  'cohere-ai',
  'cohere-training-data-crawler',
  'MistralAI-User',
  'DuckAssistBot',
  'YouBot',
  'PhindBot',
  'AI2Bot',
  'Ai2Bot-Dolma',
  'Diffbot',
  'Timpibot',
  'ImagesiftBot',
  'Omgilibot',
  'omgili',
  'PanguBot',
  'Kangaroo Bot',
  'Webzio-Extended',
  'iaskspider',
  'Brightbot',
  'Crawlspace',
  'NovaAct',
  'Manus-User',
  'Andibot',
  'bigsur.ai',
  'FirecrawlAgent',
  'img2dataset',
  'Scrapy',
] as const;

/** Case-insensitive match against a User-Agent header. */
export const AI_BOT_PATTERN = new RegExp(
  AI_BOTS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'i',
);
