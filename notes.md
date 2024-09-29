# Notes
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
## Startup Notes
You can now reach my startup using https://melvinwhitaker.com instead of the elastic IP address.
Caddy is really useful in generating certificates to give to the user.
I also realize how important it is to have Vim, especially when SSH'ing into my server.
