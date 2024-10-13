// 1. Define a Payment Strategy Interface

interface PaymentStrategy2 {
    pay(amount: number, details: any): { success: boolean; message: string };
  }
  
  // 2. Concrete Strategies
  
  // Credit Card Payment Strategy
// Credit Card Payment Strategy
  class CreditCardPayment implements PaymentStrategy2 {
    pay(amount: number, details: { cardNumber: string; name: string; expiry: string }): { success: boolean; message: string } {
      
      // Fix: Validate if the card number is NOT 16 digits
      if (details.cardNumber.length !== 16) {
        return { success: false, message: 'Invalid Credit Card details' };
      }

      return { success: true, message: `Paid $${amount} using Credit Card` };
    }
  }
  
  // PayPal Payment Strategy
  class PayPalPayment implements PaymentStrategy2 {
    pay(amount: number, details: { email: string }): { success: boolean; message: string } {

      if (!details.email) {
        return { success: false, message: 'Invalid PayPal account details' };
      }

      return { success: true, message: `Paid $${amount} using PayPal` };
    }
  }
  
  // Bitcoin Payment Strategy
  class BitcoinPayment implements PaymentStrategy2 {
    pay(amount: number, details: { walletAddress: string }): { success: boolean; message: string } {

      if (!details.walletAddress) {
        return { success: false, message: 'Invalid Bitcoin wallet address' };
      }

      return { success: true, message: `Paid $${amount} using Bitcoin` };
    }
  }
  
  // 3. Context class: PaymentProcessor
  
  class PaymentProcessor {
    private paymentMethod: PaymentStrategy2;
  
    constructor(paymentMethod: PaymentStrategy2) {
      this.paymentMethod = paymentMethod;
    }
  
    processPayment(amount: number, details: any): { success: boolean; message: string } {
      return this.paymentMethod.pay(amount, details); // Delegates the payment process to the chosen strategy
    }
  }
  
  // 4. Factory function to simulate user choosing payment strategy
  
  function getPaymentStrategy2(method: string): PaymentStrategy2 {
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
    const paymentMethod1 = getPaymentStrategy2('CreditCard');
    const processor1 = new PaymentProcessor(paymentMethod1);
    const result1 = processor1.processPayment(100, {
      cardNumber: '1234567812345678',
      name: 'John Doe',
      expiry: '12/24',
    });
    console.log(result1); // { success: true, message: 'Paid $100 using Credit Card' }
  
    // Example 2: Pay using PayPal
    const paymentMethod2 = getPaymentStrategy2('PayPal');
    const processor2 = new PaymentProcessor(paymentMethod2);
    const result2 = processor2.processPayment(200, {
      email: 'john.doe@example.com',
    });
    console.log(result2); // { success: true, message: 'Paid $200 using PayPal' }
  
    // Example 3: Pay using Bitcoin
    const paymentMethod3 = getPaymentStrategy2('Bitcoin');
    const processor3 = new PaymentProcessor(paymentMethod3);
    const result3 = processor3.processPayment(300, {
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    });
    console.log(result3); // { success: true, message: 'Paid $300 using Bitcoin' }
  
  } catch (error) {
    console.log((error as Error).message); // Handle any errors (e.g., unsupported payment methods)
  }
  