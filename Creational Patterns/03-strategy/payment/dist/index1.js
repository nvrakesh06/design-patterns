var CreditCard = /** @class */ (function () {
    function CreditCard() {
    }
    CreditCard.prototype.validate = function (data) {
        // Add real validation logic, like checking card number, expiry date, etc.
        return data.paymentMethod === "CreditCard";
    };
    CreditCard.prototype.payment = function (data) {
        if (this.validate(data)) {
            console.log("Credit Card payment successful");
        }
        else {
            console.log("Credit Card payment unsuccessful");
        }
    };
    return CreditCard;
}());
var PayPal = /** @class */ (function () {
    function PayPal() {
    }
    PayPal.prototype.validate = function (data) {
        // Add real validation logic for PayPal
        return data.paymentMethod === "PayPal";
    };
    PayPal.prototype.payment = function (data) {
        if (this.validate(data)) {
            console.log("PayPal payment successful");
        }
        else {
            console.log("PayPal payment unsuccessful");
        }
    };
    return PayPal;
}());
var Bitcoin = /** @class */ (function () {
    function Bitcoin() {
    }
    Bitcoin.prototype.validate = function (data) {
        // Add real validation logic for Bitcoin
        return data.paymentMethod === "Bitcoin";
    };
    Bitcoin.prototype.payment = function (data) {
        if (this.validate(data)) {
            console.log("Bitcoin payment successful");
        }
        else {
            console.log("Bitcoin payment unsuccessful");
        }
    };
    return Bitcoin;
}());
var User = /** @class */ (function () {
    function User(PaymentStrategy) {
        this.PaymentStrategy = PaymentStrategy;
    }
    // This method doesn't need to accept a payment strategy anymore
    User.prototype.makePayment = function (data) {
        this.PaymentStrategy.payment(data);
    };
    return User;
}());
// Example of a factory to select the correct payment method based on input
function paymentMethodFactory(method) {
    switch (method) {
        case "CreditCard":
            return new CreditCard();
        case "PayPal":
            return new PayPal();
        case "Bitcoin":
            return new Bitcoin();
        default:
            throw new Error("Invalid payment method");
    }
}
// Example usage
var paymentData = {
    paymentMethod: 'Bitcoin',
    details: {
        walletAddress: 'abc123',
        amount: 0.01
    }
};
// Choose payment strategy based on user input
var selectedStrategy = paymentMethodFactory(paymentData.paymentMethod);
// Create a user and set the payment strategy
var userA = new User(selectedStrategy);
// Process the payment
userA.makePayment(paymentData);
