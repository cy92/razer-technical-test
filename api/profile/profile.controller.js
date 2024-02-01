const express = require("express");
const profileService = require("./profile.service");
const messageFormat = require("../../util/messageFormat");
const objId = require("mongoose").Types.ObjectId;
const {
  addProfileRule,
  editProfileRule,
} = require("./validation/profile.request");
const { validationResult, matchedData } = require("express-validator");
const crypto = require("../../util/crypto");

const router = express.Router();

// Validate jwt and retreive user information from jwt token
router.use("/", async function (req, res, next) {
  // Check if authorization header exist
  if (!req.headers?.authorization)
    return res.status(401).send(messageFormat.onError("Invalid token"));

  // Verify jwt token in header
  const verify = crypto.verifyJwt(req.headers?.authorization);
  if (!verify)
    return res.status(401).send(messageFormat.onError("Invalid token"));

  //update header with user information
  req.headers.userInfo = verify;
  next();
});

// Find profile by id
router.get("/:id", async function (req, res) {
  const { id } = req?.params;
  // check validity for object id
  if (!objId.isValid(id))
    return res.status(400).send(messageFormat.onError("Invalid id"));

  const profile = await profileService.findById(id);
  if (!profile) return res.send(messageFormat.onSuccess({}));

  return res.send(messageFormat.onSuccess(profile));
});

// Search profile by filtering
router.post("/search", async function (req, res) {
  const query = {
    ...(req?.body?.firstName && { firstName: req?.body?.firstName }),
    ...(req?.body?.lastName && { lastName: req?.body?.lastName }),
    ...(req?.body?.race && { race: req?.body?.race }),
    ...(req?.body?.religion && { religion: req?.body?.religion }),
    ...(req?.body?.email && { email: req?.body?.email }),
    deleted: { $ne: true },
  };
  const filter = await profileService.findMany(query);

  return res.send(messageFormat.onSuccess(filter));
});

// Add profile
router.post("/", addProfileRule, async function (req, res) {
  try {
    // Validate add request base on the add rule
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(messageFormat.onError(errors));
    }

    // Find if profile is exist
    const findProfile = await profileService.findOne({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      deleted: { $ne: true },
    });

    if (findProfile)
      return res.send(
        messageFormat.onError("Profile already exist, add failed")
      );

    // Check image is in base64 format
    if (req?.body?.image) {
      // To remove base64 prefix if exist
      const filterImage = req?.body?.image.includes("base64,")
        ? req?.body?.image.split("base64,")[1]
        : req?.body?.image;
      const checkImage = await profileService.validateImage(filterImage);
      if (!checkImage)
        return res.status(400).send(messageFormat.onError("Invalid image"));
    }

    const addProfile = await profileService.add(
      req?.body,
      req?.headers?.userInfo
    );
    if (!addProfile)
      return res.send(messageFormat.onError("Add profile failed"));

    return res.send(messageFormat.onSuccess(addProfile));
  } catch (error) {
    return res
      .status(400)
      .send(messageFormat.onError(error?.message || "Failed to add profile"));
  }
});

// Update profile by id
router.put("/:id", editProfileRule, async function (req, res) {
  try {
    const { id } = req?.params;
    // check id validity
    if (!objId.isValid(id))
      return res.status(400).send(messageFormat.onError("Invalid id"));

    // Check if profile is exist
    const findOne = await profileService.findOne({
      _id: id,
      deleted: { $ne: true },
    });

    if (!findOne)
      return res.send(messageFormat.onError("No record found, update failed"));

    // Validate request field for update
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(messageFormat.onError(errors));
    }

    // Sanitize data base on accepted field only
    const sanitizeData = matchedData(req);

    // Check image if is base64 format
    if (sanitizeData?.image) {
      const filterImage = req?.body?.image.includes("base64,")
        ? req?.body?.image.split("base64,")[1]
        : req?.body?.image;
      const checkImage = await profileService.validateImage(filterImage);

      if (!checkImage)
        return res.status(400).send(messageFormat.onError("Invalid image"));
    }

    // Check if have data to update after sanitize
    if (Object.keys(sanitizeData).length === 0)
      return res.status(404).send(messageFormat.onError("No update required"));

    const updateData = await profileService.updateOne(
      { _id: id },
      sanitizeData
    );

    if (!updateData) res.send(messageFormat.onError("Update profile failed"));

    return res.send(messageFormat.onSuccess(updateData));
  } catch (error) {
    return res
      .status(400)
      .send(
        messageFormat.onError(error?.message || "Failed to update profile")
      );
  }
});

// Remove profile by id
router.delete("/:id", async function (req, res) {
  try {
    const { id } = req?.params;

    // check id validity
    if (!objId.isValid(id))
      return res.status(400).send(messageFormat.onError("Invalid id"));

    // check profile exist
    const findOne = await profileService.findOne({
      _id: id,
      deleted: { $ne: true },
    });

    if (!findOne)
      return res.send(messageFormat.onError("No record found, remove failed"));

    const removeProfile = await profileService.softRemoveOneById(
      id,
      req?.headers?.userInfo
    );

    if (!removeProfile)
      return res.send(messageFormat.onError("Failed to remove profile"));

    return res.send(messageFormat.onSuccess(removeProfile));
  } catch (error) {
    return res
      .status(400)
      .send(
        messageFormat.onError(error?.message || "Failed to remove profile")
      );
  }
});

module.exports = router;
