'use strict';

const photoCategoryServices = require('../services/photoCategoryServices')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('property_photo_categories', [
    //   { name: "Thumbnail", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Facade/Exterior", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Entrance/Porch", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Living Room", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Drawing Room", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Dining Area", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Kitchen", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Modular Kitchen", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Traditional Kitchen", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Pantry", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Bedroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Master Bedroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Kids Bedroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Guest Bedroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Other Bedroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Bathroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Common Bathroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Attached Bathroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Powder Room", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Balcony/Terrace", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Balcony", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Terrace", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Rooftop Space", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Utility Area", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Storage Room", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Puja/Prayer Room", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Home Office/Study", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Kids Playroom", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Entertainment Room", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Gym", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Swimming Pool", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Garden/Lawn", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Parking/Garage", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Staircase/Passage", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Servant Room", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Storage Space", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Basement", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Roof Access", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Windows/Views", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Lighting/Decor", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Ceiling", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Walls/Textures", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Floors", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Doors", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Security Features", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Shared Amenities", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Clubhouse", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Gym (Community)", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Swimming Pool (Community)", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Garden (Community)", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Party Hall", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Backyard/Outdoor Spaces", createdAt: new Date(), updatedAt: new Date() },
    //   { name: "Water Features", createdAt: new Date(), updatedAt: new Date() },
    // ], {});



    const data = [
      { name: "Thumbnail", createdAt: new Date(), updatedAt: new Date() },
      { name: "Facade/Exterior", createdAt: new Date(), updatedAt: new Date() },
      { name: "Entrance/Porch", createdAt: new Date(), updatedAt: new Date() },
      { name: "Living Room", createdAt: new Date(), updatedAt: new Date() },
      { name: "Drawing Room", createdAt: new Date(), updatedAt: new Date() },
      { name: "Dining Area", createdAt: new Date(), updatedAt: new Date() },
      { name: "Kitchen", createdAt: new Date(), updatedAt: new Date() },
      { name: "Modular Kitchen", createdAt: new Date(), updatedAt: new Date() },
      { name: "Traditional Kitchen", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pantry", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bedroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Master Bedroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Kids Bedroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Guest Bedroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Other Bedroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bathroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Common Bathroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Attached Bathroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Powder Room", createdAt: new Date(), updatedAt: new Date() },
      { name: "Balcony/Terrace", createdAt: new Date(), updatedAt: new Date() },
      { name: "Balcony", createdAt: new Date(), updatedAt: new Date() },
      { name: "Terrace", createdAt: new Date(), updatedAt: new Date() },
      { name: "Rooftop Space", createdAt: new Date(), updatedAt: new Date() },
      { name: "Utility Area", createdAt: new Date(), updatedAt: new Date() },
      { name: "Storage Room", createdAt: new Date(), updatedAt: new Date() },
      { name: "Puja/Prayer Room", createdAt: new Date(), updatedAt: new Date() },
      { name: "Home Office/Study", createdAt: new Date(), updatedAt: new Date() },
      { name: "Kids Playroom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Entertainment Room", createdAt: new Date(), updatedAt: new Date() },
      { name: "Gym", createdAt: new Date(), updatedAt: new Date() },
      { name: "Swimming Pool", createdAt: new Date(), updatedAt: new Date() },
      { name: "Garden/Lawn", createdAt: new Date(), updatedAt: new Date() },
      { name: "Parking/Garage", createdAt: new Date(), updatedAt: new Date() },
      { name: "Staircase/Passage", createdAt: new Date(), updatedAt: new Date() },
      { name: "Servant Room", createdAt: new Date(), updatedAt: new Date() },
      { name: "Storage Space", createdAt: new Date(), updatedAt: new Date() },
      { name: "Basement", createdAt: new Date(), updatedAt: new Date() },
      { name: "Roof Access", createdAt: new Date(), updatedAt: new Date() },
      { name: "Windows/Views", createdAt: new Date(), updatedAt: new Date() },
      { name: "Lighting/Decor", createdAt: new Date(), updatedAt: new Date() },
      { name: "Ceiling", createdAt: new Date(), updatedAt: new Date() },
      { name: "Walls/Textures", createdAt: new Date(), updatedAt: new Date() },
      { name: "Floors", createdAt: new Date(), updatedAt: new Date() },
      { name: "Doors", createdAt: new Date(), updatedAt: new Date() },
      { name: "Security Features", createdAt: new Date(), updatedAt: new Date() },
      { name: "Shared Amenities", createdAt: new Date(), updatedAt: new Date() },
      { name: "Clubhouse", createdAt: new Date(), updatedAt: new Date() },
      { name: "Gym (Community)", createdAt: new Date(), updatedAt: new Date() },
      { name: "Swimming Pool (Community)", createdAt: new Date(), updatedAt: new Date() },
      { name: "Garden (Community)", createdAt: new Date(), updatedAt: new Date() },
      { name: "Party Hall", createdAt: new Date(), updatedAt: new Date() },
      { name: "Backyard/Outdoor Spaces", createdAt: new Date(), updatedAt: new Date() },
      { name: "Water Features", createdAt: new Date(), updatedAt: new Date() },
    ]

    try {
      for (const item of data) {
        const exists = await photoCategoryServices.findOne({ where: { name: item.name } });
        if (!exists) {
          await photoCategoryServices.create(item);
        }
      }
    } catch (e) {
      console.error(e);
    }




  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property_photo_categories', null, {});
  }
};
