// Define item, promotion, and tax structures
class Item {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

class Promotion {
    constructor(type, item, discount, condition) {
        this.type = type;
        this.item = item;
        this.discount = discount;
        this.condition = condition;
    }
}

class Tax {
    constructor(rate) {
        this.rate = rate;
    }
}

// Function to apply promotions to items
const applyPromotions = (items, promotions) => {
    return items.map(item => {
        const promo = promotions.find(p => p.item === item.name);
        if (promo) {
            if (promo.type === 'BOGO' && item.quantity >= 2) {
                const freeItems = Math.floor(item.quantity / 2);
                item.quantity -= freeItems;
            } else if (promo.type === 'PERCENTAGE' && promo.condition(item)) {
                item.price = item.price * (1 - promo.discount / 100);
            }
        }
        return item;
    });
};

// Function to calculate subtotal
const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

// Function to calculate tax
const calculateTax = (subtotal, taxRate) => {
    return subtotal * (taxRate / 100);
};

// Function to generate output
const generateOutput = (items, promotions, taxRate) => {
    items = applyPromotions(items, promotions);
    const subtotal = calculateSubtotal(items);
    const tax = calculateTax(subtotal, taxRate);
    const total = subtotal + tax;

    console.log('Breakdown of Costs:');
    items.forEach(item => console.log(`${item.name}: ${(item.quantity * item.price).toFixed(2)}`));
    console.log(`Subtotal: ${subtotal.toFixed(2)}`);
    console.log(`Tax: ${tax.toFixed(2)}`);
    console.log(`Total: ${total.toFixed(2)}`);
};

// Define test cases
const testCases = [
    {
        items: [
            new Item("Milk", 2, 1.50),
            new Item("Bread", 3, 2.00)
        ],
        promotions: [
            new Promotion('BOGO', 'Milk', 0, item => true),
            new Promotion('PERCENTAGE', 'Bread', 10, item => item.quantity > 2)
        ],
        tax: new Tax(5),
        expected: {
            subtotal: 6.90,
            tax: 0.35,
            total: 7.25
        }
    },
    {
        items: [
            new Item("Eggs", 12, 0.10),
            new Item("Cheese", 1, 5.00)
        ],
        promotions: [
            new Promotion('PERCENTAGE', 'Cheese', 20, item => true)
        ],
        tax: new Tax(5),
        expected: {
            subtotal: 5.20,
            tax: 0.26,
            total: 5.46
        }
    }
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test Case ${index + 1}:`);
    generateOutput(test.items, test.promotions, test.tax.rate);
    console.log();
});

module.exports = {
    applyPromotions,
    calculateSubtotal,
    calculateTax
};
