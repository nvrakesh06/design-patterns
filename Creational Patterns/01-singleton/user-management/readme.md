# UserSessionManager

## Description

The `UserSessionManager` is a class that manages user sessions in a web application using the **Singleton Design Pattern**. This ensures that only one instance of the session manager exists throughout the application, providing consistent session data across different parts of the app.

This class provides methods to log in a user, retrieve the logged-in user's information, and log out, effectively managing the session state.

## Features

- **Singleton Pattern**: Ensures only one instance of `UserSessionManager` exists.
- **Session Management**: Allows logging in, retrieving, and logging out users with session data consistency.
- **Encapsulation**: Protects the session data from direct access, making it available only through methods.

## Requirements

- Only one `UserSessionManager` instance should exist in the entire application.
- A logged-in user's information is accessible across different parts of the app.
- Calling the `logout()` method should clear the session data, resetting the instance state.

## Methods

- `login(username)`: Starts a session by storing the user’s username.
- `getUser()`: Retrieves the currently logged-in user's username.
- `logout()`: Terminates the session, clears the session data, and resets the state.
- `getInstance()`: Static method that returns the single instance of `UserSessionManager`.

## Example Usage

```js
// Get the singleton instance of UserSessionManager
const session1 = UserSessionManager.getInstance();

// Start a new session by logging in a user
session1.login("john_doe");

// Retrieve the logged-in user's username
console.log(session1.getUser()); // Output: "john_doe"

// Get another instance (actually the same instance due to Singleton pattern)
const session2 = UserSessionManager.getInstance();

// Confirm that it's the same instance by checking the user data
console.log(session2.getUser()); // Output: "john_doe"

// Logout the user
session2.logout();

// Check the session state again
console.log(session1.getUser()); // Output: null (session reset)
```