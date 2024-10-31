export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch((error) => {
      console.error("Caught error:", error); // Log the error
      next(error);
    });
  };
};