const profile = require("./profile.model");
const jimp = require("jimp");

module.exports = {
  async findById(id) {
    try {
      return await profile.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async findOne(filter) {
    try {
      return await profile.findOne(filter);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async findMany(filter) {
    try {
      return await profile.find(filter);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async add(addData, userInfo) {
    try {
      // amend add user data and date
      const addProfile = new profile({
        ...addData,
        addedBy: userInfo.username,
        addedAt: new Date(),
      });

      return await profile.create(addProfile);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async updateOne(query, updateData, userInfo) {
    try {
      // amend update user data and date
      updateData = {
        ...updateData,
        updatedAt: new Date(),
        updatedBy: userInfo?.username,
      };

      return await profile.findOneAndUpdate(query, updateData, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async softRemoveOneById(id, userInfo) {
    try {
      return await profile.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            deleted: true,
            deletedBy: userInfo.username,
            deletedAt: new Date(),
          },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async removeOne(query) {
    try {
      return await profile.findOneAndDelete(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async validateImage(b64Str) {
    const b64buff = Buffer.from(b64Str, "base64");
    return new Promise(async function (resolve, reject) {
      await jimp
        .read(b64buff)
        .then(async function (image) {
          if (image.bitmap.width > 0 && image.bitmap.height > 0) {
            resolve(true);
          }

          resolve(false);
        })
        .catch((error) => {
          console.log(error);
          resolve(false);
        });
    });
  },
};
