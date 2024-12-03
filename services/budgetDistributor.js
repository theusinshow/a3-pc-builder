exports.distributeBudget = (budget, profile) => {
    const distributions = {
      1: { GPU: 0.35, CPU: 0.25, RAM: 0.15, Storage: 0.10, Motherboard: 0.10, PSU: 0.03, Case: 0.02 }, // Jogos
      2: { CPU: 0.40, GPU: 0.20, RAM: 0.15, Storage: 0.10, Motherboard: 0.10, PSU: 0.03, Case: 0.02 }, // Edição de Vídeo
      3: { CPU: 0.40, GPU: 0.20, RAM: 0.15, Motherboard: 0.10, Storage: 0.10, PSU: 0.03, Case: 0.02 }, // CAD
      4: { CPU: 0.40, GPU: 0.20, RAM: 0.15, Storage: 0.10, Motherboard: 0.10, PSU: 0.03, Case: 0.02 }, // Uso Básico
    };
  
    const allocation = distributions[profile] || {};
    const allocatedBudget = {};
  
    for (const [type, percentage] of Object.entries(allocation)) {
      allocatedBudget[type] = parseFloat((budget * percentage).toFixed(2));
    }
  
    return allocatedBudget;
  };
  