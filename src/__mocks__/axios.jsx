export default {
  get: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        rocket_name: 'Falcon 9',
        description: 'A two-stage rocket designed and manufactured by SpaceX.',
        image: 'falcon9.jpg',
        reserved: false,
      },
    ],
  }),
};
