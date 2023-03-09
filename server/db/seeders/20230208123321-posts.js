/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const img = await fetch('https://jsonplaceholder.typicode.com/photos');
    const posts = await res.json();
    const photo = await img.json();
    await queryInterface.bulkInsert(
      'Posts',
      posts.map((post) => ({
        img: photo[32].img,
        userId: post.userId,
        title: post.title,
        body: post.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
