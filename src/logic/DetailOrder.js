export const formatPrice = (price) => {
  if (!price && price !== 0) return "0";
  return price.toLocaleString("id-ID");
};

export const calculateTotal = (
  basePrice, 
  selectedToppings, 
  quantity, 
  availableToppings, 
  selectedOptions, 
  availableOptions // { 'size': [{ value: 'Medium', price: 5000 }, ...], ... }
) => {
  let totalExtraPrice = 0;

  // 1. Hitung total harga Topping
  const toppingTotal = selectedToppings.reduce((sum, toppingName) => {
    const found = availableToppings.find((item) => item.name === toppingName);
    return sum + (found ? Number(found.price) : 0);
  }, 0);
  
  // 2. Hitung total harga Opsi (Size, Sugar, Ice, Portion, dll.)
  for (const optionName in selectedOptions) {
    const selectedValue = selectedOptions[optionName];
    
    // Pastikan nama opsi di selectedOptions (misal: 'portion') cocok dengan availableOptions
    const optionsForName = availableOptions[optionName]; 
    
    if (optionsForName) {
        // Cari harga tambahan untuk nilai yang dipilih (misal: 'Medium')
        const foundOption = optionsForName.find(opt => opt.value === selectedValue);
        
        if (foundOption) {
            totalExtraPrice += Number(foundOption.price);
        }
    }
  }

  // Total = (base price + total extra options + total extra topping) * quantity
  const finalTotal = (Number(basePrice) + totalExtraPrice + toppingTotal) * quantity;
  
  return finalTotal;
};