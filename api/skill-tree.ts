import type { VercelRequest, VercelResponse } from '@vercel/node';

// ─── TrueMmo overrides ───────────────────────────────────────────────────────
// Add custom skill changes specific to the TrueMmo private server here.
// Format: { [skillId: number]: Partial<SkillOverride> }
const TRUEMMO_OVERRIDES: Record<number, {
  maxLevel?: number;
  description?: string;
  truemmoNote?: string;
}> = {
  // Example:
  // 8001: { maxLevel: 5, truemmoNote: 'Reduced max level on TrueMmo.' },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { jobId } = req.query;

  if (!jobId || typeof jobId !== 'string') {
    return res.status(400).json({ error: 'Missing jobId query parameter.' });
  }

  const apiKey = process.env.DIVINE_PRIDE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'DIVINE_PRIDE_API_KEY not configured.' });
  }

  try {
    const url = `https://www.divine-pride.net/api/database/Job/${jobId}?apiKey=${apiKey}`;
    const upstream = await fetch(url);

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: `Divine Pride responded with ${upstream.status}`,
      });
    }

    const data = await upstream.json() as {
      skills?: Array<{ id: number; [key: string]: unknown }>;
      [key: string]: unknown;
    };

    // Merge TrueMmo overrides into each skill
    if (Array.isArray(data.skills)) {
      data.skills = data.skills.map((skill) => {
        const override = TRUEMMO_OVERRIDES[skill.id];
        if (!override) return skill;
        return {
          ...skill,
          ...override,
          isTruemmoModified: true,
        };
      });
    }

    // Cache for 10 minutes on Vercel edge
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    return res.status(200).json(data);
  } catch (err) {
    console.error('[skill-tree] fetch error', err);
    return res.status(500).json({ error: 'Failed to fetch from Divine Pride.' });
  }
}
