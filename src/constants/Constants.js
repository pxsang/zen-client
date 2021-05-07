export const MASSAGE_TYPE_LIST = [
  {
    id: 1,
    name: 'Thai or Swedish',
    childs: [
      {
        id: 1,
        time: 60,
        price: 380000,
      },
      {
        id: 2,
        time: 90,
        price: 500000,
      },
      {
        id: 3,
        time: 120,
        price: 700000,
      },
    ],
  },
  {
    id: 2,
    name: 'Soothing Aroma Massage',
    childs: [
      {
        id: 4,
        time: 60,
        price: 480000,
      },
      {
        id: 5,
        time: 90,
        price: 600000,
      },
      {
        id: 6,
        time: 120,
        price: 800000,
      },
    ],
  },
  {
    id: 3,
    name: 'Hot Stone Massage',
    childs: [
      {
        id: 7,
        time: 60,
        price: 430000,
      },
      {
        id: 8,
        time: 90,
        price: 550000,
      },
      {
        id: 9,
        time: 120,
        price: 750000,
      },
    ],
  },
  {
    id: 4,
    name: 'Full Body Coconut Oil Massage',
    childs: [
      {
        id: 10,
        time: 60,
        price: 500000,
      },
      {
        id: 11,
        time: 90,
        price: 620000,
      },
    ],
  },
  {
    id: 5,
    name: 'Foot Massage',
    childs: [
      {
        id: 12,
        name: 'Foot Relax',
        time: 30,
        price: 200000,
      },
      {
        id: 13,
        name: 'Foot Relax',
        time: 60,
        price: 360000,
      },
      {
        id: 14,
        name: 'Foot/Back/Shoulder',
        time: 30,
        price: 380000,
      },
      {
        id: 15,
        name: 'Foot/Back/Shoulder',
        time: 60,
        price: 500000,
      },
    ],
  },
];

export const STATUS = {
  PREPARE_DATA: 0,
  WAITING_FOR_ACCEPT: 1,
  ACCEPTED: 2,
  ARRIVED: 3,
  STARTED: 4,
  COMPLETED: 5,
};