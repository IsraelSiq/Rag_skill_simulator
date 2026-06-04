import type { Skill } from '@/types'

export const WHITESMITH_SKILLS: Skill[] = [
  {
    id: 'wh_cartcannon',
    name: 'Cart Cannon',
    maxLevel: 5,
    type: 'active',
    element: 'Neutro',
    description: 'Dispara projétil explosivo do carrinho causando dano físico AoE. Dano aumenta com peso no carrinho e STR.',
    requires: [
      { skillId: 'mc_cartrevolution', level: 1 },
      { skillId: 'bs_hammerfall', level: 3 },
    ],
  },
  {
    id: 'wh_overthrust_max',
    name: 'Maximum Overthrust',
    maxLevel: 5,
    type: 'active',
    description: 'Versão aprimorada de Overthrust. Aumenta ATK em até 100% apenas para o caster. Não beneficia aliados.',
    requires: [{ skillId: 'bs_overthrust', level: 5 }],
  },
  {
    id: 'wh_cartboost',
    name: 'Cart Boost',
    maxLevel: 1,
    type: 'active',
    description: 'Aumenta drasticamente a velocidade de movimento usando o carrinho como propulsor.',
    requires: [{ skillId: 'mc_pushcart', level: 5 }],
  },
  {
    id: 'wh_weaponblast',
    name: 'Weapon Repair',
    maxLevel: 5,
    type: 'active',
    description: 'Repara a arma de um aliado quebrada durante o combate usando materiais no inventário.',
    requires: [{ skillId: 'bs_weaponresearch', level: 5 }],
  },
  {
    id: 'wh_meltdown',
    name: 'Meltdown',
    maxLevel: 5,
    type: 'active',
    element: 'Fogo',
    description: 'Derrete progressivamente a arma e armadura do alvo, reduzindo sua DEF e durabilidade do equipamento.',
    requires: [
      { skillId: 'bs_weaponresearch', level: 5 },
      { skillId: 'bs_steel', level: 3 },
    ],
  },
  {
    id: 'wh_adrenaline2',
    name: 'Adrenaline Rush II',
    maxLevel: 3,
    type: 'active',
    description: 'Versão aprimorada do Adrenaline Rush. Funciona com qualquer tipo de arma, não apenas machados.',
    requires: [{ skillId: 'bs_adrenaline', level: 5 }],
  },
  {
    id: 'wh_mastersmithy',
    name: 'Upgrade Weapon',
    maxLevel: 1,
    type: 'active',
    description: 'Tenta aumentar o refinamento (+) de uma arma. Chance de sucesso depende do tipo e nível da arma.',
    requires: [
      { skillId: 'bs_iron', level: 5 },
      { skillId: 'bs_steel', level: 5 },
    ],
  },
  {
    id: 'wh_piranhaattack',
    name: 'Powerful Throw',
    maxLevel: 5,
    type: 'active',
    description: 'Arremessa item do carrinho no inimigo causando dano físico. Dano baseado no peso do item e STR.',
    requires: [{ skillId: 'wh_cartcannon', level: 3 }],
  },
]
