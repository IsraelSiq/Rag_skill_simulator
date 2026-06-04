import type { Skill } from '@/types'

export const CREATOR_SKILLS: Skill[] = [
  {
    id: 'cr_aciddemonstration',
    name: 'Acid Demonstration',
    maxLevel: 10,
    type: 'active',
    description: 'Combina ácido e bomba incendiária causando dano mágico massivo que ignora DEF. Dano escala com VIT do alvo e INT do caster. Pode destruir equipamentos.',
    requires: [
      { skillId: 'am_acidterror', level: 5 },
      { skillId: 'am_demonstration', level: 5 },
    ],
  },
  {
    id: 'cr_fullchemicalprotection',
    name: 'Full Chemical Protection',
    maxLevel: 5,
    type: 'active',
    description: 'Aplica proteção química completa em um aliado, tornando seus equipamentos indestruíveis por duração limitada.',
    requires: [{ skillId: 'am_acidterror', level: 3 }],
  },
  {
    id: 'cr_bloodylust',
    name: 'Bloody Lust',
    maxLevel: 5,
    type: 'active',
    description: 'Cria área no chão que coloca aliados em estado de Fúria (Berserk): ATK e ASPD máximos, mas sem controle de movimento.',
    requires: [{ skillId: 'am_spheremine', level: 3 }],
  },
  {
    id: 'cr_slimepit',
    name: 'Slim Potion Pitcher',
    maxLevel: 5,
    type: 'active',
    description: 'Arremessa poção especial que cura aliados em área. Muito mais eficiente que Potion Pitcher em grupo.',
    requires: [{ skillId: 'am_potionpitcher', level: 5 }],
  },
  {
    id: 'cr_cultivation',
    name: 'Cultivation',
    maxLevel: 2,
    type: 'active',
    description: 'Planta semente no chão que cresce em planta aliada atacando inimigos próximos automaticamente.',
    requires: [{ skillId: 'am_biotechnology', level: 3 }],
  },
  {
    id: 'cr_homunculus_s',
    name: 'Homunculus Resurrection',
    maxLevel: 5,
    type: 'active',
    description: 'Versão avançada de Resurrect Homunculus com taxa de HP maior ao ressuscitar.',
    requires: [{ skillId: 'am_resurrecthomun', level: 5 }],
  },
  {
    id: 'cr_bioethics',
    name: 'Bioethics',
    maxLevel: 1,
    type: 'passive',
    description: 'Habilita o uso de Homunculus S (versoões avançadas do Homunculus). Pré-requisito para evoluir o Homunculus.',
  },
  {
    id: 'cr_meteorassault',
    name: 'Meteorite Assault',
    maxLevel: 5,
    type: 'active',
    description: 'Cria chuva de meteoritos em área causando dano físico e aplicando elemento Fogo.',
    requires: [
      { skillId: 'am_demonstration', level: 5 },
      { skillId: 'am_spheremine', level: 5 },
    ],
  },
]
