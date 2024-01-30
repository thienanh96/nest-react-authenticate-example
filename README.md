# Nest React Authentication Example

This project is a demonstration of user authentication with signup, login, and logout functionality using NestJS for the API and ReactJS for the front-end. Tailwind CSS is used for styling, and Vite is employed as the build tool for the React project.

## Project Structure

- **api**: NestJS backend server for handling authentication logic.
- **website**: ReactJS frontend for the user interface.

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/thienanh96/nest-react-authenticate-example.git
    ```

2. **Navigate to the project folder:**

    ```bash
    cd nest-react-authenticate-example
    ```

3. **Install dependencies:**

    ```bash
    # For NestJS server
    cd api
    npm install

    # For ReactJS client
    cd ../website
    npm install
    ```

4. **Configure environment variables:**

    - Copy the `.env.example` file in the `api` folder to a new file named `.env` and update the variables accordingly.

5. **Run the server:**

    ```bash
    # Inside the api folder
    npm run start
    ```

6. **Run the client:**

    ```bash
    # Inside the website folder
    npm run dev
    ```

7. **Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the application.**

## Usage

- Visit the signup page on the website to create a new user account.
- Use the login page to log in with the created credentials.
- Log out using the provided logout functionality.

## Contributing

Feel free to contribute to this project. Follow the standard [GitHub Flow](https://guides.github.com/introduction/flow/) for pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
