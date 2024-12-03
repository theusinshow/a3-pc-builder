exports.optimize = (components, remainingBudget) => {
  return components.map((component) => {
    if (remainingBudget > 0) {
      return {
        ...component,
        price: component.price + remainingBudget * 0.5,
        performance: component.performance + 10, // Simula uma melhoria
      };
    }
    return component;
  });
};
