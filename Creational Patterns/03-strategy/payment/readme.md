# Payment Processing System with Multiple Payment Methods

This payment processing system is designed to support multiple payment methods using the **Strategy Pattern**. The goal is to allow users to choose between different payment strategies, such as Credit Card, PayPal, and Bitcoin, through a unified interface for processing payments. The design is flexible, making it easy to add new payment methods without modifying the core processing logic.

## Problem Statement

The system should:

- Support multiple payment strategies (Credit Card, PayPal, Bitcoin).
- Each payment method must have its own validation and processing logic.
- Provide a unified way to select a payment strategy and execute the payment.
- Allow adding new payment methods easily, without changing existing code.

## Requirements

- Implement three payment strategies:
  - **Credit Card**
  - **PayPal**
  - **Bitcoin**
- Each strategy must include validation logic specific to the payment method.
- The system must handle invalid payment details and unimplemented payment methods.
- The design should follow the **Strategy Pattern** to allow future extensibility.

## Input

- The user selects a payment method and provides necessary payment details.

### Example Input:

```json
{
  "paymentMethod": "CreditCard",
  "details": {
    "cardNumber": "1234-5678-9012-3456",
    "name": "John Doe",
    "expiry": "12/24"
  }
}
