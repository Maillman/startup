# Cipher Application
A Startup Application for BYU CS 260
## Elevator Pitch
Have you ever been on the internet, perhaps on an online forum discussing a puzzle solution, when you suddenly get hit with the "gur vasbezngvba vf va gur gnfx". Or you're watching your favorite kids show containing a big mystery element when you spot some text in the credits looking like this: "judylwb idoov". These types of text are called cipher text, and they are used to hide important information from the reader unless they are willing to decipher the text themselves. Perhaps you have some important information yourself that you want to encrypt into cipher text. That's where the Cipher application comes into play. With this application, you can encipher/decipher text into its encrypted/decrypted self. There is also a discussion forum to discuss these types of ciphers especially in the case where you are unable to decipher the text yourself.
## Design
![DesignImage1](StartupDesignP1.png)
![DesignImage2](StartupDesignP2.png)
![DesignImage3](StartupDesignP3.png)
## Key Features
- Secure login over HTTPS
- Ability to select the cipher to encrypt/decrypt
- Ability to encrypt/decrypt a plaintext/cipher message
- Ability to communicate with other users through a discussion forum
- Ability to create a new thread and comment on existing threads in realtime
## Technologies
I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Four HTML pages. One for login, one for encrypting/decrypting, one for viewing threads, and one for viewing/commenting on a specific thread.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Provides login, cipher text display, display threads, display users' comments on threads, and use of React for routing and components.
- **Service** - Backend service with endpoints for:
  - login
  - retrieving threads and associated comments
  - submitting threads and associated comments
- **DB/Login** - Store users, threads, and comments in database. Register and login users. Credentials securely stored in database. Can't comment on threads unless authenticated.
- **WebSocket** - As each user comments on a thread, their comment is broadcast to all other users.
