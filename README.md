1. This game is not a real time game - Ship placement of each player is visible in visible in the same screen
2. Game id considered as the session identification
3. refered to an AI agent only to write tailwind CSS

<h3>Design patterns used:</h3>

1. Singleton Pattern - service layer is always using one shared axios instance
2. Decorator Pattern - HttpClient class uses axios interceptor to attach session token to the request header. By doing this API requests are wrapped with an additional property
3. used error boundary concept in react - to prevent the failures affecting to rest of the app
