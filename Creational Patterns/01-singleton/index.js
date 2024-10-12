class Singleton {
    // static property to hold the singleton instance
    static instance = null;

    // private constructor to prevent direct instantiation
    constructor() {
        if (Singleton.instance) {
            // If an instance already exists, return the existing instance
            console.log("Returning the existing instance!");
            return Singleton.instance;
        }

        // If no instance exists, create one
        console.log("Creating a new instance!");
        Singleton.instance = this; // Assign this object as the singleton instance
    }
}

// Usage:
const objectInstance1 = new Singleton(); // "Creating a new instance!"
const objectInstance2 = new Singleton(); // "Returning the existing instance!"

console.log(objectInstance1 === objectInstance2); // true
