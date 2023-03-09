/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: '123@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maks',
        email: 'max@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alex',
        email: 'alex@123',
        password: '$2b$10$DA3mNUzWA85i58wrwLRPaeYRKk0O8zVdt6gaQfD6qPCT68IVqSAEC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
