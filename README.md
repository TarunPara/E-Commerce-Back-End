# E-Commerce Back End

Welcome to the E-Commerce Back End repository! This project focuses on creating a robust backend system for an e-commerce platform, enabling seamless management of products, categories, and tags. By leveraging modern technologies such as Node.js, Express.js, and Sequelize, this backend system provides a strong foundation for any e-commerce business to build upon.

## Project Overview

In today's fast-paced digital world, having an efficient online presence is crucial for retail businesses. This project aims to deliver a backend system that empowers e-commerce platforms to manage their inventory and product categorization effectively. Whether you're a small business owner or a large enterprise, this system is designed to scale and adapt to your unique needs.

## Features

- **Product Management**: Easily add, update, and remove products from your inventory.
- **Category Organization**: Organize products into categories for better accessibility.
- **Tagging System**: Assign tags to products, enhancing search functionality and filtering.
- **Database Integration**: Utilizes MySQL for reliable data storage and retrieval.
- **RESTful API**: Provides a set of clear endpoints for interacting with the e-commerce data.

## DEMO VIDEO
https://github.com/TarunPara/E-Commerce-Back-End/assets/134483509/d53950dd-7e51-49e8-9ae4-5e3a7d7fd2d5
## Installation

To set up this project locally, follow these steps:

1. Clone the repository to your local machine:

git clone https://github.com/TarunPara/E-Commerce-Back-End.git

2. Navigate to the project directory:

cd E-Commerce-Back-End

3. Install the required dependencies:

npm install


## Configuration

Before running the application, configure your environment variables:

1. Create a `.env` file in the project root.
2. Add the following variables, replacing the placeholders with your MySQL details:

DB_NAME=ecommerce_db
DB_USER=<your_mysql_username>
DB_PW=<your_mysql_password>


## Running the Application

1. Initialize the database and seed it with sample data:

npm run seed

2. Start the server:

npm start


## Using the API

Once the server is running, you can use API clients like Postman or Insomnia to interact with the API. The API provides endpoints for managing products, categories, and tags.

## Contributing

Contributions to enhance this project are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is released under the MIT License.
