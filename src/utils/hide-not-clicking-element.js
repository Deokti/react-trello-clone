const hideNotClickingElement = (event, pathRef, func) => {
  if (pathRef && !event.path.includes(pathRef.current)) {
    func(false);
  }
};

export default hideNotClickingElement;
