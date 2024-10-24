import React from 'react';


export function Home() {
    return(
        <main>
            <div class="card container-fluid">
                <span id="picture" class="picture-box"><img width="60%" src="assets/placeholder.jpg" alt="random" /></span>
                <p>
                    Have you ever been on the internet, perhaps on an online forum discussing a puzzle solution, when you suddenly get hit with the "gur vasbezngvba vf va gur gnfx". Or you're watching your favorite kids show containing a big mystery element when you spot some text in the credits looking like this: "judylwb idoov".
                    <br/><br/>
                    These types of text are called cipher text, and they are used to hide important information from the reader unless they are willing to decipher the text themselves. Perhaps you have some important information yourself that you want to encrypt into cipher text. That's where the Cipher application comes into play.
                    <br/><br/>
                    <li>With this application, you can encipher/decipher text into its encrypted/decrypted self.</li>
                    <li>There is also a discussion forum to discuss these types of ciphers especially in the case where you are unable to decipher the text yourself.</li>
                </p>
                <br/>
                <hr/>
                <p style={{ textAlign: 'center' }}>This is the beginning of something great. Stay tuned for more updates!</p>
                <p style={{ textAlign: 'right', fontStyle: 'italic' }}>Application Created by Melvin Whitaker...</p>
            </div>
        </main>
    );
}