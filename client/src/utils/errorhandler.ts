const handleError = (error: any, showMessage: Function) => {
  if (error.response) {
    showMessage(error.response?.data?.message, { variant: "error" });
  } else {
    showMessage(error.message, { variant: "error" });
  }
};

export default handleError;
