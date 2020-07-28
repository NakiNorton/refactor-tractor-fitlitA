# FitLit Refactor Tractor 
Mod2 Group Project

### Developers
- [Leigh Larson](https://github.com/leighlars)
- [Linus Leas](https://github.com/Leasw144)
- [Steph Norton](https://github.com/NakiNorton)

### Project Links
- [Repo](https://github.com/NakiNorton/refactor-tractor-fitlitA)
- [Project Board](https://github.com/NakiNorton/refactor-tractor-fitlitA/projects)
- [Project Spec](https://frontend.turing.io/projects/module-2/refactor-tractor.html)

## Abstract 
In this project, we will refactor an existing code base for a fitness / health tracker. We will implement new features of our own, namely SCSS, Accessibility, Fetch API, and testing with Spies. We considered our MVP to fulfill all requirements on the original FitLit spec, score a 95% or higher on Accessibility in Lighthouse, utilize SCSS/SASS in styling, implement Spies and fetching / posting data from/to API server, all of which we fulfilled.   

## Technologies / Systems
- Javascript
- TDD with Mocha/Chai & Spies
- VSCode 
- git / Version control
- Accessibility 
- SCSS / SASS
- API Fetch/Post
- Webpack

## Set Up 

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run git clone (you replace the [...] with the terminal command arguments): git clone [remote-address] [what you want to name the repo]
2. Remove the default remote: git remote rm origin (notice that git remote -v not gives you back nothing)
3. Create a new repo on GitHub with the name of [what you want to name the repo] to be consistent with naming
4. Copy the address that you would use to clone down this repo - something like git@github.com:...
5. Add this remote to your cloned down repo: git remote add origin [address you copied in the previous step] - do not include the brackets
6. Now try to commit something and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.
7. Once you have cloned the repo, change into the directory and install the project dependencies by running npm install.
8. To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` to interact with the application. Enter `control + c` in your terminal to stop the server at any time.

## Gif Showcase

![gif of random user and user's dropdown profile on page load]()</br>
*View a random user on load, and view the user's step info and comparison with friends on the dropdown*

![gif of step card functionality]()</br>
*Viewing step card functionality, including adding minutes and steps, step history, community and user averages*

![gif of hydration card functionality]()</br>
*Viewing hydration card functionality, including adding ounces, ounces history, community and user averages*

![gif of stairs card functionality]()</br>
*Viewing stairs card functionality, including adding flights, stairs history, community and user averages*

![gif of sleep card functionality]()</br>
*VViewing sleep card functionality, including adding hours and quality, sleep history, community and user averages*

![gif of accessibility tabbing]()</br>
*Viewing accessibility features, such as tabbing across the site*

## Reflections / Project Progression
This was an absolute whirlwind of a project, but we learned and grew all the same. We were able to work well as a team to navigate new territories of SCSS, Fetch API, and testing with Spies.
The refactoring took up the majority of this project. We found that it was important to really take our time with the code to understand what was happening and how information was being passed around. In some cases, we learned that it was too much energy trying to decipher what the original coders were trying to do and so it made sense to start some paths totally anew.
Given more time, we would implement more robust testing in general as well as make better use of spies for our dom updates. Additionally, more sad path implementation and testing that would restrict what and how a user could input information for each category, for example, Sleep Quality input should only take in a value between one through five. Preventing duplicate entries being sent to the server was also another feature we debated implementing were it not for the time restrictions.
In terms of new technologies, there were clear opportunities where we could implement inheritance within our code as most methods within each class share similarites to each other. Methods such as accessing data for the day or week could have been refactored using parameters instead of repeating ourselves across each class. Features we would have liked to have implemented for all categories include trending data and leaderboard displays.
Overall, while we did struggle with this project, using the new technologies helped concretize the more nebulous aspects of what we have learned in this mod despite being a particularly trying project.




