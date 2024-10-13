interface PaymentStrategy {
    validate(data: any): boolean;
    payment(data: any): void;
}

class CreditCard implements PaymentStrategy {
    validate(data: any): boolean {
        // Add real validation logic, like checking card number, expiry date, etc.
        return data.paymentMethod === "CreditCard";
    }

    payment(data: any): void {
        if (this.validate(data)) {
            console.log("Credit Card payment successful");
        } else {
            console.log("Credit Card payment unsuccessful");
        }
    }
}

class PayPal implements PaymentStrategy {
    validate(data: any): boolean {
        // Add real validation logic for PayPal
        return data.paymentMethod === "PayPal";
    }

    payment(data: any): void {
        if (this.validate(data)) {
            console.log("PayPal payment successful");
        } else {
            console.log("PayPal payment unsuccessful");
        }
    }
}

class Bitcoin implements PaymentStrategy {
    validate(data: any): boolean {
        // Add real validation logic for Bitcoin
        return data.paymentMethod === "Bitcoin";
    }

    payment(data: any): void {
        if (this.validate(data)) {
            console.log("Bitcoin payment successful");
        } else {
            console.log("Bitcoin payment unsuccessful");
        }
    }
}

class User {
    private PaymentStrategy: PaymentStrategy;

    constructor(PaymentStrategy: PaymentStrategy) {
        this.PaymentStrategy = PaymentStrategy;
    }

    // This method doesn't need to accept a payment strategy anymore
    makePayment(data: any): void {
        this.PaymentStrategy.payment(data);
    }
}

// Example of a factory to select the correct payment method based on input
function paymentMethodFactory(method: string): PaymentStrategy {
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
const paymentData = {
    paymentMethod: 'Bitcoin',
    details: {
        walletAddress: 'abc123',
        amount: 0.01
    }
};

// Choose payment strategy based on user input
const selectedStrategy = paymentMethodFactory(paymentData.paymentMethod);

// Create a user and set the payment strategy
const userA = new User(selectedStrategy);

// Process the payment
userA.makePayment(paymentData);
