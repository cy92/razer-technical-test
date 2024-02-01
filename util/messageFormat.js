const messageStructure = {
  success: true,
  data: null,
  message: null,
};

module.exports = {
  // Success message format
  onSuccess(content) {
    messageStructure.success = true;
    messageStructure.data = content;
    messageStructure.message = null;
    return messageStructure;
  },

  // Fail message format
  onError(error) {
    messageStructure.success = false;
    messageStructure.data = null;
    if (error?.errors) {
      const errorList = error.errors.map((ele) => {
        return ele.msg;
      });
      messageStructure.message = errorList;
    } else {
      messageStructure.message = error;
    }

    return messageStructure;
  },
};
