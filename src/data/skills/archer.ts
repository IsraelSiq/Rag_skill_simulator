import type { Skill } from '@/types'

export const ARCHER_SKILLS: Skill[] = [
  {
    id: 'ac_owl_eye',
    name: 'Owl\'s Eye',
    maxLevel: 10,
    type: 'passive',
    description: '+1 DEX por nível.',
  },
  {
    id: 'ac_vulture_eye',
    name: 'Vulture\'s Eye',
    maxLevel: 10,
    type: 'passive',
    description: '+1 de alcance e +1 HIT por nível.',
    requires: [{ skillId: 'ac_owl_eye', level: 3 }],
  },
  {
    id: 'ac_double_strafe',
    name: 'Double Strafe',
    maxLevel: 10,
    type: 'active',
    description: 'Dispara dois projéteis de alta precisão.',
    requires: [{ skillId: 'ac_owl_eye', level: 5 }],
  },
  {
    id: 'ac_arrow_shower',
    name: 'Arrow Shower',
    maxLevel: 10,
    type: 'active',
    description: 'AoE de flechas em área 5x5.',
    requires: [{ skillId: 'ac_double_strafe', level: 5 }],
  },
  {
    id: 'ac_improve_conc',
    name: 'Improve Concentration',
    maxLevel: 10,
    type: 'active',
    description: 'Aumenta DEX e AGI. Revela inimigos ocultos próximos.',
    requires: [{ skillId: 'ac_owl_eye', level: 5 }, { skillId: 'ac_vulture_eye', level: 5 }],
  },
  {
    id: 'ac_arrow_crafting',
    name: 'Arrow Crafting',
    maxLevel: 1,
    type: 'active',
    description: 'Cria flechas a partir de materiais.',
  },
  {
    id: 'ac_charge_arrow',
    name: 'Charge Arrow',
    maxLevel: 1,
    type: 'active',
    description: 'Flecha que empurra o alvo a longa distância.',
    requires: [{ skillId: 'ac_double_strafe', level: 5 }],
  },
]
