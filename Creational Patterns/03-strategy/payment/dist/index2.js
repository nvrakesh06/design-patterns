// 1. Define a Payment Strategy Interface
// 2. Concrete Strategies
// Credit Card Payment Strategy
// Credit Card Payment Strategy
var CreditCardPayment = /** @class */ (function () {
    function CreditCardPayment() {
    }
    CreditCardPayment.prototype.pay = function (amount, details) {
        // Fix: Validate if the card number is NOT 16 digits
        if (details.cardNumber.length !== 16) {
            return { success: false, message: 'Invalid Credit Card details' };
        }
        return { success: true, message: "Paid $".concat(amount, " using Credit Card") };
    };
    return CreditCardPayment;
}());
// PayPal Payment Strategy
var PayPalPayment = /** @class */ (function () {
    function PayPalPayment() {
    }
    PayPalPayment.prototype.pay = function (amount, details) {
        if (!details.email) {
            return { success: false, message: 'Invalid PayPal account details' };
        }
        return { success: true, message: "Paid $".concat(amount, " using PayPal") };
    };
    return PayPalPayment;
}());
// Bitcoin Payment Strategy
var BitcoinPayment = /** @class */ (function () {
    function BitcoinPayment() {
    }
    BitcoinPayment.prototype.pay = function (amount, details) {
        if (!details.walletAddress) {
            return { success: false, message: 'Invalid Bitcoin wallet address' };
        }
        return { success: true, message: "Paid $".concat(amount, " using Bitcoin") };
    };
    return BitcoinPayment;
}());
// 3. Context class: PaymentProcessor
var PaymentProcessor = /** @class */ (function () {
    function PaymentProcessor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    PaymentProcessor.prototype.processPayment = function (amount, details) {
        return this.paymentMethod.pay(amount, details); // Delegates the payment process to the chosen strategy
    };
    return PaymentProcessor;
}());
// 4. Factory function to simulate user choosing payment strategy
function getPaymentStrategy2(method) {
    switch (method) {
        case 'CreditCard':
            return new CreditCardPayment();
        case 'PayPal':
            return new PayPalPayment();
        case 'Bitcoin':
            return new BitcoinPayment();
        default:
            throw new Error('Unsupported payment method');
    }
}
// 5. Client code to choose strategy and process payment
try {
    // Example 1: Pay using Credit Card
    var paymentMethod1 = getPaymentStrategy2('CreditCard');
    var processor1 = new PaymentProcessor(paymentMethod1);
    var result1 = processor1.processPayment(100, {
        cardNumber: '1234567812345678',
        name: 'John Doe',
        expiry: '12/24',
    });
    console.log(result1); // { success: true, message: 'Paid $100 using Credit Card' }
    // Example 2: Pay using PayPal
    var paymentMethod2 = getPaymentStrategy2('PayPal');
    var processor2 = new PaymentProcessor(paymentMethod2);
    var result2 = processor2.processPayment(200, {
        email: 'john.doe@example.com',
    });
    console.log(result2); // { success: true, message: 'Paid $200 using PayPal' }
    // Example 3: Pay using Bitcoin
    var paymentMethod3 = getPaymentStrategy2('Bitcoin');
    var processor3 = new PaymentProcessor(paymentMethod3);
    var result3 = processor3.processPayment(300, {
        walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    });
    console.log(result3); // { success: true, message: 'Paid $300 using Bitcoin' }
}
catch (error) {
    console.log(error.message); // Handle any errors (e.g., unsupported payment methods)
}
