import type { Skill } from '@/types'

export const NOVICE_SKILLS: Skill[] = [
  {
    id: 'nv_basic',
    name: 'Basic Skill',
    maxLevel: 9,
    type: 'passive',
    description: 'Habilidade básica de sobrevivência. Nível 6 permite trocar de classe. Nível 9 habilita o emote /sit.',
  },
  {
    id: 'nv_firstaid',
    name: 'First Aid',
    maxLevel: 1,
    type: 'active',
    description: 'Recupera 5 HP imediatamente. Custo de 3 SP.',
    requires: [{ skillId: 'nv_basic', level: 3 }],
  },
  {
    id: 'nv_emote',
    name: 'Trick Dead',
    maxLevel: 1,
    type: 'active',
    description: 'Finge estar morto para enganar monstros.',
    requires: [{ skillId: 'nv_basic', level: 5 }],
  },
]
