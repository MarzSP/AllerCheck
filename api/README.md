# Backend for AllerCheck

## Architecture

N-Tier Architecture / Controller-Service-Repository Pattern CSR

The backend is structured into three main layers:

1. **Controller Layer**: This layer handles incoming HTTP requests and routes them to the appropriate service methods.
   It is responsible for validating input and formatting output.
2. **Service Layer**: This layer contains the business logic of the application. It processes data, applies rules, and
   interacts with the repository layer to perform CRUD operations.
3. **Repository Layer**: This layer interacts with the database. It abstracts the data access logic and provides methods
   for querying and manipulating data.
4. **Model Layer**: This layer defines the data structures used in the application. It includes data models that
   represent the entities in the system.

## Stack

- **Language**: Typescript, T-SQL
- **Framework**: Express
- **Database**: SQL Server
- **Tools**: Docker, Cors, Helmet, Morgan,

## Development Setup

1. **Clone the Repository**:
   ```bash
   git clone
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**: <br>
   Create a `.env` file in the root directory and configure the necessary environment variables. You can refer to the
   `.env.example` file for guidance.


4. **Run Docker**:
    ```bash
    docker-compose up
    ```
5. **Start the Application**:
   ```bash
   npm build
   npm run dev
   ```
