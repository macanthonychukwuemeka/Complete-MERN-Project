Install nodemon globally: You can install nodemon globally on your system so that it's available as a command in any directory. Run the following command:

Copy code
npm install -g nodemon
After installing nodemon globally, you should be able to run npm run dev without any issues.

Install nodemon locally: If you prefer not to install nodemon globally, you can install it locally in your project. This way, it will be available only within your project directory. Run the following command in your project directory:

css
Copy code
npm install nodemon --save-dev
This will install nodemon as a dev dependency in your project. Then, you can modify your package.json file to use the locally installed nodemon. Update your "dev" script in package.json as follows:

json
Copy code
{
"scripts": {
"dev": "nodemon --exec babel-node app.js"
}
}
After making this change, you should be able to run npm run dev successfully.
#   C o m p l e t e - M E R N - P r o j e c t  
 