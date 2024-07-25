const { applyPromotions, calculateSubtotal, calculateTax } = require('./groceryStore');

test('applyPromotions should apply BOGO promotion correctly', () => {
    const items = [
        { name: 'Milk', quantity: 2, price: 1.50 }
    ];
    const promotions = [
        { type: 'BOGO', item: 'Milk', discount: 0, condition: item => true }
    ];
    const updatedItems = applyPromotions(items, promotions);
    expect(updatedItems[0].quantity).toBe(1);
});

test('applyPromotions should apply percentage discount correctly', () => {
    const items = [
        { name: 'Bread', quantity: 3, price: 2.00 }
    ];
    const promotions = [
        { type: 'PERCENTAGE', item: 'Bread', discount: 10, condition: item => item.quantity > 2 }
    ];
    const updatedItems = applyPromotions(items, promotions);
    expect(updatedItems[0].price).toBe(1.80);
});

test('calculateSubtotal should return correct subtotal', () => {
    const items = [
        { name: 'Milk', quantity: 1, price: 1.50 },
        { name: 'Bread', quantity: 3, price: 2.00 }
    ];
    const subtotal = calculateSubtotal(items);
    expect(subtotal).toBe(7.50);
});

test('calculateTax should return correct tax amount', () => {
    const subtotal = 6.90;
    const taxRate = 5;
    const tax = +(calculateTax(subtotal, taxRate).toFixed(3));
    expect(tax).toBe(0.345);
});
