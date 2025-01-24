# Notes
## Startup TODO:
- [X] Add Affine and A1Z26 Ciphers.
- [ ] Finish Thread side CSS animation.
- [X] Make a new component for users creating a new thread.
- [ ] Color?
- [ ] Figure out what the main page is for.
- [ ] Stop Thread from being loaded twice.
- [ ] I'm afraid I might be feature creeping. Don't feature creep.
- [X] Successive backoff on the Gemini API.
- [X] Add replies to discussion in database.
- [X] Fix bug where the cookie is stored and website still asks for a login
## Git Notes
Resolving conflicts is pretty hard. I would recommend trying to avoid doing such things. Always pull first, make the changes and push. I'd honestly would rather resolve the conflicts on GitHub and not on VS Code.
Github Copilot is extremely powerful, make sure to renew my Github Student Education plan to maintain access to that feature.
## AWS Notes
Honestly, it's a good thing I was practically walked the whole way through as it was very easy to get lost. So I'm pretty thankful for the instructions on setting up an EC2 instance and create an elastic IP address.

My elastic IP address is 34.200.36.24

To SSH into my EC2 instance from the CS260 folder in Git Bash, use this command:

ssh -i inclass.pem ubuntu@34.200.36.24
## HTML Notes
**HTML Structure:** Don't forget that you not only have to open a tag, but close the tag as well or else things will start looking a little wierd and it will be very frustrating trying to figure out what was wrong. Perhaps I will also learn more with time.
Also, I really like how you can take an image from anywhere and if linked will show up on your HTML page.

**HTML Input:** The color type seems to act a little weird whenever you mess with it on the HTML page and also try to edit it in HTML. Looking at the GitHub page and even [it's associated link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) is also extremely useful when trying to figure out implementing input into an html page. Especially when trying to deal with regex and patterns like emails and whatnot!

**HTML Media:** This one was actually really fun to try. I had to do a lot of finagling around, but after a lot of trial and research, I not only managed to grab video and audio from Reddit, but I also even managed to combine separate audio and video together! I can definitely see myself looking more into this in the future.

**Startup HTML:** Doing the HTML for my startup was pretty fun. Really taking the time to look at the [Mozilla documentation for HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) is particularly useful, I have found myself going through it very often and find new ways to use elements I was unfamiliar with. Copilot can also be of some assistance as well getting things fairly close to what you need and then modifying it to exactly where you want it. I also found myself stylizing the discussion page already in line and then realized I was copying and pasting the same style across multiple elements, it is probably wiser to move that all into a CSS document instead.
## CSS Notes
**CSS Practice:** I am not particularly well-versed in the syntax of CSS and using codepen.io doesn't help me autocomplete a property or element like it would in VS Code. So I had to go through the Mozilla documentation a lot more that I normally would. But I'll understand properties and syntax more as time goes on. CSS is extremely powerful, it's just a pain to learn IMO.

**CSS Flexbox:** Centering text both horizontally and vertically felt like the hardest thing to try to implement. I was getting so frustrated trying to get the text to center vertically primarily. I eventually just gave up trying to center the text in the section, so I removed the section and put the text I wanted centered, just in main, rather than in section which was in main. Ended up turning a whole debacle into something trivial at that point. I'm pretty mad right now, NGL!
Honestly, CSS seems to be coming to me much harder than anything else. For some reason, the contents and form of CSS just aren't sticking in my head as much as I'd like. Here's the link to the [Codepen](https://codepen.io/Maillman/pen/VwoeyYQ) for reference.
## Startup Notes
You can now reach my startup using https://melvinwhitaker.com instead of the elastic IP address.
Caddy is really useful in generating certificates to give to the user.
I also realize how important it is to have Vim, especially when SSH'ing into my server.

## React Notes
**React Components:** It's extremely useful that React breaks code down into components and allows those components to be reused. When I finished the header and had to copy and paste the code for each HTML, I was questioning if there was a better way to do this and React is the answer to that question. I'm grateful other people had to go through the pain and trouble of making this so I could use this for my startup, even if it is wierd that you can find HTML, CSS, and Javascript all in one file in such a wierd manner.

**React Reactivity:** This is probably the single biggest useful aspect of React that I'm definitely going to use in my startup. I want to be able to show the text being encrypted/decrypted in real-time which will make the user experience so much better! I just hope I don't get lost in the sauce to badly...

**Startup React:** Getting switched over to React using Vite was a bit of a struggle, there was a little bit of some pain there. However, things are now going very smoothly.
One thing to note, the way React handles CSS and HTML is different from what you see in their original formats. You cannot just copy and paste the HTML into a component and expect to be done there.

Here are some things I have found I needed to address when I converted regular HTML to JSX/React:
- Every tag must be closed in JSX. For example, <**br**> in HTML is fine as it is. But in JSX, you need <**br/**>.
- Using in-line CSS styling in HTML won't work if you try to import it as it is into JSX. **style="text-align: right; font-style: italic;"** in HTML turns into **style={{ textAlign: 'right', fontStyle: 'italic' }}** in JSX.

In case you're wondering about the differences between HTML and JSX, [W3Schools](https://www.w3schools.com/react/react_jsx.asp) provides a good overview.

After finishing my React deliverable, there are a couple more things I want to note down.
- People said getting Jest tests to work for my startup would take a while... it didn't! It was a little picky with my wording but it was fine and helped me easily debug my low-level code, which I still plan on using once I add more ciphers.
- CSS animations are horrendous to work with, I don't know why '> *' selectors work the way they do. Also, trying to make an element's position absolute while inside another container when grabbing the position ignores the container altogether has got to be the craziest thing I've seen so far!


## Service Notes
**Startup Service:** Holy crap did I take more time on this than I needed to. I'm to the point where I now feel like I'm feature creeping. I'm making fetches to three different services:

1. Several from the frontend to the backend for logging in and out, and to get and store challenges.
2. One from the frontend to picsum.photos for placeholder pictures.
3. One from the backend to Gemini-1.5-Flash to generate the quotes for the challenges.

Getting Gemini to work took longer than I wanted, and I honestly should have been fine with only having the first two. Regardless, here we are now with a fully working quote generator for my challenges!

**Gemini API:** Finding out you can access the Gemini API by getting an API key for free was the lifesaver for me and I would honestly recommend it to anyone who's task isn't servicible by an existing free API.

It's a little slow and the model does get overloaded, so you have to make several fetches to the API before Gemini can actually give you a response. But if your application doesn't need a speedy response, then Gemini is definitely the way to go! 

## Database/Login Notes
**Startup Database/Login:** Nothing much I want to say here. Probably just remember that if you want to find an object by it's id in the mongoDB database, you'll need to call it like such: 
 - _id: ObjectId.createFromHexString(id)

One thing that confuses me is the fact that you have to put your endpoints that don't require authentication above the enpoints that do, despite me explicitly calling secureAPIRouter on the endpoints that do need authentication and APIrouter on endpoints that don't. Not sure why that's the case.

## Midterm Notes

Midterm Questions
**In the following code, what does the link element do?**
It is used to define the relationship between the current document and an external resource.

**In the following code,  what does a div tag do?**
It serves as a container for other HTML elements and is one of the most commonly used tags for structuring web pages.

**In the following code, what is the difference between the #title and .grid selector?**
The # symbol is used to select an element with a specific id attribute. An ID must be unique within a page, meaning that only one element should have a specific ID.ID selectors have a higher specificity than class selectors. This means that if an element has both an ID and a class, styles defined with the ID selector will take precedence over those defined with the class selector.
The . symbol is used to select elements with a specific class attribute. Multiple elements can share the same class. You can apply the same class to multiple elements, allowing for consistent styling across those elements. Class selectors have lower specificity than ID selectors. This means that if both an ID and a class are applied to the same element, styles from the ID will override styles from the class.

**In the following code, what is the difference between padding and margin?**
Padding is the space between the content of an element and its border. It is inside the element's border.
Margin is the space outside an element's border, separating it from other elements. It is outside the element's border.

**Given this HTML and this CSS how will the images be displayed using flex?**

**What does the following padding CSS do?**

**What does the following code using arrow syntax function declaration do?**

**What does the following code using map with an array output?**

**What does the following code output using getElementByID and addEventListener?**

**What does the following line of Javascript do using a # selector?**

**Which of the following are true? (mark all that are true about the DOM)**
The **Document Object Model (DOM)** is a programming interface for web documents. It represents the structure of a document as a tree of objects, allowing programs to manipulate the content, structure, and styles of web pages. Here are some key truths about the DOM:

### 1. **Tree Structure**
- The DOM represents the document as a hierarchical tree structure, where each node is an object representing a part of the document (e.g., elements, text, attributes).
- The root of the tree is the `document` object, and the branches are elements, text nodes, and attributes.

### 2. **Dynamic Interaction**
- The DOM allows for dynamic changes to the content and structure of a web page. JavaScript can be used to add, remove, or modify elements and their attributes at runtime.
- Changes made through the DOM are immediately reflected in the displayed web page.

### 3. **Language-Independent**
- The DOM is a language-independent interface, meaning it can be used with various programming languages, but is most commonly manipulated using JavaScript in web development.
  
### 4. **Events Handling**
- The DOM supports event handling, allowing developers to create interactive web pages. You can listen for events (like clicks, key presses, or form submissions) and respond with JavaScript functions.

### 5. **Standardized Interface**
- The DOM is standardized by the World Wide Web Consortium (W3C) and the Web Hypertext Application Technology Working Group (WHATWG), ensuring consistency across different web browsers.
  
### 6. **Access and Manipulation**
- You can access elements in the DOM using various methods (like `getElementById`, `getElementsByClassName`, `querySelector`, etc.) and manipulate their properties (like `innerHTML`, `style`, `classList`, etc.).

### 7. **Support for CSS Styles**
- The DOM allows you to manipulate CSS styles directly via JavaScript. You can change styles dynamically based on user interactions or other conditions.

### 8. **Document Object Model Levels**
- The DOM has different levels, including the Core DOM (the basic model), the HTML DOM (the model specific to HTML documents), and the XML DOM (for XML documents).

**By default, the HTML span element has a default CSS display property value of:** 
The default CSS display value of the HTML <span> element is inline.

**How would you use CSS to change all the div elements to have a background color of red?**
div {
  background-color = red;
}

**How would you display an image with a hyperlink in HTML?**
<a href="https://www.example.com">
  <img src="image.jpg" alt="Description of the image">
</a>

**In the CSS box model, what is the ordering of the box layers starting at the inside and working out?**
[ Content ] → [ Padding ] → [ Border ] → [ Margin ]

**Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?**

**What will the following code output when executed using a for loop and console.log?**

**How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?**
// Select the element with the ID "byu"
let element = document.getElementById("byu");

// Change the text color to green
element.style.color = "green";


**What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?**
p, ol, ul, h2, h1, h3
**How do you declare the document type to be html?**
<!doctype html>

**What is valid javascript syntax for if, else, for, while, switch statements?**
if (condition) {
  // Code to run if the condition is true
} else if (anotherCondition) {
  // Code to run if the second condition is true
} else {
  // Code to run if all conditions are false
}
for (initialization; condition; increment) {
  // Code to run in each iteration
}
while (condition) {
  // Code to run as long as the condition is true
}
switch (expression) {
  case value1:
    // Code to run if expression === value1
    break;
  case value2:
    // Code to run if expression === value2
    break;
  default:
    // Code to run if none of the cases match
}

**What is the correct syntax for creating a javascript object?**
Object literal syntax: { key: value }
new Object(): let obj = new Object();
Constructor function: function ConstructorName() { this.property = value; }
Class syntax (ES6): class ClassName { constructor() { ... } }
Object.create(): let obj = Object.create(proto);
The object literal syntax is the most commonly used due to its simplicity.


**Is it possible to add new properties to javascript objects?**
Yes; using dot notation, bracket notation, and Object.defineProperty()

**If you want to include JavaScript on an HTML page, which tag do you use?**
<script></script>

**Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?**

**Which of the following correctly describes JSON?**
JSON (JavaScript Object Notation) is a type of lightweight data-interchangeable format that is often provided when an HTTP protocol is used.

**What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?**
chmod: Changes the file permissions. You can set the read, write, and execute permissions for the owner, group, and others (e.g., chmod 755 file).

pwd: Stands for "print working directory." It shows the current directory you are in.

cd: Stands for "change directory." It allows you to navigate to a different directory (e.g., cd /path/to/directory).

ls: Lists the contents of a directory. Variations like ls -la can give more detailed output, including hidden files.

vim: A text editor used to create or edit files in the terminal. It's quite powerful but has a steeper learning curve than other editors.

nano: Another text editor, simpler than vim, often easier for beginners to use for editing text files.

mkdir: Stands for "make directory." It is used to create new directories (e.g., mkdir new_folder).

mv: Moves or renames files and directories. For example, mv file1 /new/location/ moves file1, and mv file1 newname renames file1.

rm: Removes (deletes) files or directories. rm -r allows you to delete directories and their contents recursively.

man: Stands for "manual." It shows the manual or help documentation for other commands (e.g., man ls will show the manual for ls).

ssh: Stands for "Secure Shell." It allows you to connect securely to a remote machine over a network (e.g., ssh user@hostname).

ps: Displays a snapshot of the current processes running on the system. ps aux shows a detailed list of all processes.

wget: A command-line utility for downloading files from the web. For example, wget http://example.com/file downloads the file from that URL.

sudo: Stands for "superuser do." It allows you to execute a command with elevated (administrator or root) privileges (e.g., sudo apt update).


**Which of the following console command creates a remote shell session?**
ssh

**Which of the following is true when the -la parameter is specified for the ls console command?**
ls -la shows a detailed long-format listing of all files, including hidden ones, in the directory.

**Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?**
Top level domain = .click
Root domain = bozo.click
Subdomain = banana.fruit.bozo.click

**Is a web certificate is necessary to use HTTPS?**
Yes, an SSL certificate is necessary for an HTTPS web address

**Can a DNS A record can point to an IP address or another A record?**
A DNS A record can only point to an IP address but not another A record.

**Port 443, 80, 22 is reserved for which protocol?**
Port 443 is reserved for the HTTPS protocol (Hypertext Transfer Protocol Secure), port 80 is for HTTP (Hypertext Transfer Protocol), and port 22 is for SSH (Secure Shell) protocol.
 
**What will the following code using Promises output when executed?**

## Final Notes
**What is the default port for HTTP/HTTPS/SSH?**
Port 443 is reserved for the HTTPS protocol (Hypertext Transfer Protocol Secure), port 80 is for HTTP (Hypertext Transfer Protocol), and port 22 is for SSH (Secure Shell) protocol.

**What does an HTTP status code in the range of 300/400/500 indicate?**
In HTTP status codes, a code in the 300 range indicates a redirection, a 400 range signifies a client error (issue with the user's request), and a 500 range indicates a server error (problem on the server side).

**What does the HTTP header content-type allow you to do?**
The HTTP header "Content-Type" allows a server to inform the client about the media type of the data being sent.

**What does a “Secure cookie”/”Http-only cookie”/”Same-site cookie” do? https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies**
- A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol. It's never sent with unsecured HTTP (except on localhost), which means man-in-the-middle attackers can't access it easily. Insecure sites (with http: in the URL) can't set cookies with the Secure attribute. However, don't assume that Secure prevents all access to sensitive information in cookies. For example, someone with access to the client's hard disk (or JavaScript if the HttpOnly attribute isn't set) can read and modify the information.
- A cookie with the HttpOnly attribute can't be accessed by JavaScript, for example using Document.cookie; it can only be accessed when it reaches the server. Cookies that persist user sessions for example should have the HttpOnly attribute set — it would be really insecure to make them available to JavaScript. This precaution helps mitigate cross-site scripting (XSS) attacks.
- A cookie with the Same-site attribute is a cookie with the security feature that prevents a website's cookie from being sent along with requests to different websites, essentially limiting its usage to the same domain, thus helping to mitigate the risk of Cross-Site Request Forgery (CSRF) attacks and other cross-site vulnerabilities by controlling when a cookie is included in cross-site requests. 

**Assuming the following Express middleware, what would be the console.log output for an HTTP GET request with a URL path of /api/document?**

**Given the following Express service code: What does the following front end JavaScript that performs a fetch return?**

**Given the following MongoDB query, select all of the matching documents {name:Mark}**

**How should user passwords be stored?**
It should be hashed and stored in the backend.

**Assuming the following node.js websocket code in the back end, and the following front end websocket code, what will the front end log to the console?**

**What is the websocket protocol intended to provide?**
The WebSocket protocol enables full-duplex interaction between a web browser and a web server making it possible to open a two-way interactive communication session between the browser and server.

**What do the following acronyms stand for? JSX, JS, AWS, NPM, NVM**

JSX: JavaScript XML
- A syntax extension for JavaScript used in React to write HTML-like code directly within JavaScript.

JS: JavaScript
- A programming language used for web development to make web pages interactive.

AWS: Amazon Web Services
- A cloud platform providing services like computing power, storage, and databases.

NPM: Node Package Manager
- A package manager for JavaScript, primarily used to install libraries and tools for Node.js.

NVM: Node Version Manager
- A tool to manage multiple versions of Node.js on the same system.

**Assuming an HTML document with a body element. What text content will the following React component generate?  The react component will use parameters.**

**Given a set of React components that include each other, what will be generated**

**What does a React component with React.useState do?**
A React component with React.useState allows you to add state to your functional components. When the state changes, React re-renders the component to reflect the updated data.

**What are React Hooks used for?**
React Hooks are functions that let you "hook into" React state and lifecycle features from within function components. They were introduced in React 16.8 as a way to add state and other React features to functional components without having to convert them to class components.

**What does the State Hook/Context Hook/Ref Hook/Effect Hook/Performance Hook do? https://react.dev/reference/react/hooks**

**State Hooks** - Lets a component “remember” information like user input. For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.

**Context Hooks** - Lets a component receive information from distant parents without passing it as props. For example, your app’s top-level component can pass the current UI theme to all components below, no matter how deep.

**Ref Hooks** - Lets a component hold some information that isn’t used for rendering, like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.

**Effect Hooks** - Lets a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.

**Performance Hooks** - A common way to optimize re-rendering performance is to skip unnecessary work. For example, you can tell React to reuse a cached calculation or to skip a re-render if the data has not changed since the previous render.

**Given React Router code, select statements that are true.**

**What does the package.json file do?**
A "package.json" file acts as a manifest for a Node.js project, storing crucial metadata like the project's name, version, description, dependencies (other packages required to run the project), and scripts, allowing the npm package manager to effectively identify and manage the project's components and dependencies across different environments.

**What does the fetch function do?**
The Fetch API provides a JavaScript interface for making HTTP requests and processing the responses. Fetch is the modern replacement for XMLHttpRequest.

**What does node.js do?**
Node.js is an open-source, cross-platform runtime environment that allows developers to execute JavaScript code on the server-side, enabling them to create web applications and server-side tools using the same language they use for client-side scripting, essentially letting you write JavaScript code that runs outside of a web browser, giving access to system functionalities like file system operations and network requests. 

**What does pm2 do?**
PM2, or Process Manager 2, is an open-source process manager that helps you manage Node.js applications.

**What does Vite do?**
Vite is a JavaScript build tool that helps developers build and develop front-end applications for the web.