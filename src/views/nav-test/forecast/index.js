export let responseData = {
  columns: [
    { label: '游戏ID', prop: 'gameId' },
    { label: '游戏名称', prop: 'gameName' },
    { label: '新增人数', prop: 'peopleNumbers' },
    {
      label: 'LTV',
      prop: '',
      children: [
        { label: '日均APPU', prop: 'APPU' },
        { label: 'LTV30', prop: 'LTV30' },
        { label: 'LTV60', prop: 'LTV60' },
        { label: 'LTV90', prop: 'LTV90' },
        { label: 'LTV180', prop: 'LTV180' },
        { label: 'LTV365', prop: 'LTV365' }
      ]
    },
    {
      label: 'LT',
      prop: '',
      children: [
        { label: 'LT30', prop: 'LT30' },
        { label: 'LT60', prop: 'LT60' },
        { label: 'LT90', prop: 'LT90' },
        { label: 'LT180', prop: 'LT180' },
        { label: 'LT365', prop: 'LT365' }
      ]
    },
    {
      label: 'RR',
      prop: '',
      children: [
        { label: '次留', prop: '次留' },
        { label: '3留', prop: '3留' },
        { label: '4留', prop: '4留' },
        { label: '5留', prop: '5留' },
        { label: '6留', prop: '6留' },
        { label: '7留', prop: '7留' },
        { label: '8留', prop: '8留' },
        { label: '9留', prop: '9留' },
        { label: '10留', prop: '10留' },
        { label: '11留', prop: '11留' },
        { label: '12留', prop: '12留' },
        { label: '13留', prop: '13留' },
        { label: '14留', prop: '14留' },
        { label: '15留', prop: '15留' },
        { label: '16留', prop: '16留' },
        { label: '17留', prop: '17留' },
        { label: '18留', prop: '18留' },
        { label: '19留', prop: '19留' },
        { label: '20留', prop: '20留' },
        { label: '21留', prop: '21留' },
        { label: '22留', prop: '22留' },
        { label: '23留', prop: '23留' },
        { label: '24留', prop: '24留' },
        { label: '25留', prop: '25留' },
        { label: '26留', prop: '26留' },
        { label: '27留', prop: '27留' },
        { label: '28留', prop: '28留' },
        { label: '29留', prop: '29留' },
        { label: '30留', prop: '30留' },
        { label: '60留', prop: '60留' },
        { label: '90留', prop: '90留' },
        { label: '120留', prop: '120留' },
        { label: '150留', prop: '150留' },
        { label: '180留', prop: '180留' },
        { label: '365留', prop: '365留' }
      ]
    }
  ],
  notReal: ['APPU', 'LTV60'],
  tableList: [
    {
      gameId: 1,
      gameName: '元神',
      peopleNumbers: 11,
      APPU: 12,
      LTV30: 13,
      LTV60: 14,
      LTV90: 15,
      LTV180: 16,
      LTV365: 17
    },
    {
      gameId: 2,
      gameName: '坎公',
      peopleNumbers: 21,
      APPU: 22,
      LTV30: 23,
      LTV60: 24,
      LTV90: 25,
      LTV180: 26,
      LTV365: 27
    },
    {
      gameId: 3,
      gameName: '二次元',
      peopleNumbers: 31,
      APPU: 32,
      LTV30: 33,
      LTV60: 34,
      LTV90: 35,
      LTV180: 36,
      LTV365: 37
    }
  ]
}
