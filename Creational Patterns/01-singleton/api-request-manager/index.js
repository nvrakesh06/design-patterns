class APIRequestManager {
    constructor() {
        if (APIRequestManager.instance) {
            return APIRequestManager.instance;
        }

        // Singleton instance
        APIRequestManager.instance = this;

        // Initialize cache and queue
        this.cache = new Map(); // Cache for storing responses
        this.requestQueue = []; // Queue for managing requests
        this.isProcessingQueue = false; // Throttle control

        // API rate limit configurations
        this.rateLimit = 5; // Max requests per time window
        this.timeWindow = 20000; // Time window in milliseconds (e.g., 60 seconds)
        this.requestTimestamps = []; // Timestamps of recent requests

        return this;
    }

    // Method to make an API request
    async makeRequest(url, options = {}) {
        // Check if response is cached
        const cacheKey = this.getCacheKey(url, options);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey); // Return cached response
        }

        // Throttle requests if rate limit exceeded
        if (this.isRateLimited()) {
            throw new Error("Rate limit exceeded. Please try again later.");
        }

        try {
            const response = await this.sendRequest(url, options);
            this.cache.set(cacheKey, response); // Cache the response
            return response;
        } catch (error) {
            throw new Error("API request failed: " + error.message);
        }
    }

    // Method to send the actual API request
    async sendRequest(url, options) {
        // Update request timestamps for rate limiting
        this.updateRequestTimestamps();

        // Simulate an API request using fetch
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
        }

        return response.json();
    }

    // Check if API rate limit is exceeded
    isRateLimited() {
        const now = Date.now();
        this.requestTimestamps = this.requestTimestamps.filter(
            (timestamp) => now - timestamp < this.timeWindow
        );

        return this.requestTimestamps.length >= this.rateLimit;
    }

    // Update the request timestamps
    updateRequestTimestamps() {
        this.requestTimestamps.push(Date.now());
    }

    // Create a unique key for caching based on URL and options
    getCacheKey(url, options) {
        return `${url}:${JSON.stringify(options)}`;
    }

    // Clear the cache (optional method)
    clearCache() {
        this.cache.clear();
    }
}

// Example usage:
const apiManager = new APIRequestManager();
const apiManager1 = new APIRequestManager();
const apiManager2 = new APIRequestManager();

async function fetchAllTodos() {
    try {
        // API Manager 1
        const data1 = await apiManager.makeRequest('https://jsonplaceholder.typicode.com/todos/1');
        console.log(data1);
        const data2 = await apiManager.makeRequest('https://jsonplaceholder.typicode.com/todos/2');
        console.log(data2);

        // API Manager 2
        const data3 = await apiManager1.makeRequest('https://jsonplaceholder.typicode.com/todos/3');
        console.log(data3);
        const data4 = await apiManager1.makeRequest('https://jsonplaceholder.typicode.com/todos/4');
        console.log(data4);

        // API Manager 3
        const data5 = await apiManager2.makeRequest('https://jsonplaceholder.typicode.com/todos/5');
        console.log(data5);
        const data6 = await apiManager2.makeRequest('https://jsonplaceholder.typicode.com/todos/6'); // rate limits if singleton works as expected.
        console.log(data6);
    } catch (error) {
        console.error(error);
    }
}

fetchAllTodos();
