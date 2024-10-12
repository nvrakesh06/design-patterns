class UserSessionManager {
    // Private static variable to hold the single instance
    static instance = null;
    
    // Private constructor to prevent direct instantiation
    constructor() {
      this.user = null;
    }
  
    // Static method to get the singleton instance of the class
    static getInstance() {
      if (this.instance === null) {
        this.instance = new UserSessionManager();
      }
      return this.instance;
    }

    login(username) {
      if (username) {
        this.user = username;
      }
    }
  
    getUser() {
      return this.user;
    }

    logout() {
      this.user = null;
    }
  }

  // Get the singleton instance of UserSessionManager
  const session1 = UserSessionManager.getInstance();
  
  session1.login("john_doe");

  console.log(session1.getUser()); // Output: "john_doe"

  const session2 = UserSessionManager.getInstance();
  
  console.log(session2.getUser()); // Output: "john_doe"

  session2.logout();
  
  console.log(session1.getUser()); // Output: null (session reset)
  
  console.log(session1 === session2);// Output: true