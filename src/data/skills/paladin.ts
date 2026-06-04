import type { Skill } from '@/types'

export const PALADIN_SKILLS: Skill[] = [
  {
    id: 'pa_shieldchain',
    name: 'Shield Chain',
    maxLevel: 5,
    type: 'active',
    description: 'Arremessa o escudo 5 vezes em sequência rápida. Dano baseado em ATK e refinamento do escudo.',
    requires: [{ skillId: 'cr_shieldboomerang', level: 5 }],
  },
  {
    id: 'pa_sacrifice',
    name: 'Sacrifice (Martyr\'s Reckoning)',
    maxLevel: 5,
    type: 'active',
    description: 'Sacrifica % do HP próprio para causar dano ignorando DEF. 5 cargas por ativação. Dano = HP sacrificado × multiplicador.',
    requires: [{ skillId: 'cr_devotion', level: 5 }],
  },
  {
    id: 'pa_gospel',
    name: 'Battle Chant (Gospel)',
    maxLevel: 10,
    type: 'active',
    description: 'Hino sagrado aleatório: pode buff aliados (ATK, DEF, HP, res. elemental) ou debuff inimigos (dano, fraqueza). Efeitos aleatórios a cada pulso.',
    requires: [
      { skillId: 'cr_grand_cross', level: 5 },
      { skillId: 'cr_devotion', level: 5 },
    ],
  },
  {
    id: 'pa_pressure',
    name: 'Holy Word (Pressure)',
    maxLevel: 5,
    type: 'active',
    element: 'Sagrado',
    description: 'Invoca pressão divina no alvo. Dano fixo ignorando DEF, MDEF e elemento. Remove buffs do alvo.',
  },
  {
    id: 'pa_magicrod',
    name: 'Magic Rod',
    maxLevel: 5,
    type: 'active',
    description: 'Chance de absorver magia direcionada ao Paladin, convertendo em SP. Nível mais alto = maior chance e SP recuperado.',
  },
  {
    id: 'pa_piety',
    name: 'Piety',
    maxLevel: 5,
    type: 'active',
    element: 'Sagrado',
    description: 'Ativa elemento Sagrado na própria armadura e de aliados próximos por duração escalável.',
    requires: [{ skillId: 'cr_endure', level: 5 }],
  },
]
