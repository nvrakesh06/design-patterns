# Singleton API Request Manager

## Description

The `APIRequestManager` class is responsible for managing all outgoing API requests in a web application. By utilizing the Singleton pattern, it ensures that only **one instance** of the request manager exists throughout the entire application. This centralizes control over API requests, allowing for efficient **rate-limiting** and **response caching**.

The main goal of this class is to manage requests to external APIs effectively, ensuring that:
- API rate limits are respected.
- Duplicate requests are avoided.
- Responses are cached when needed.

## Features

- **Singleton Pattern**: Guarantees that only one instance of `APIRequestManager` is used across the app.
- **Response Caching**: Avoids redundant API calls by caching and reusing recent responses for identical requests.

## Requirements

1. The `APIRequestManager` should ensure that only **one instance** of the request manager is created across the entire app.
2. Handle API requests and return corresponding responses.
4. **Cache responses** to prevent duplicate API calls within a short time window.