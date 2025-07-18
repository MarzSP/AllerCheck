
CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(100),
    postalCode VARCHAR(20),
    country VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auth (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE menu (
    menuId SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL REFERENCES users(userId) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    isActive boolean NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menuItem (
    menuItemId SERIAL PRIMARY KEY,
    menuId INTEGER NOT NULL REFERENCES menu(menuId) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE ingredient (
    ingredientId SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Tag (
    tagId SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL,
    isAllergen BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT
);

/* TODO: Are these necessary? */
CREATE TABLE ingredientTag (
    ingredientId INTEGER NOT NULL REFERENCES ingredient(ingredientId) ON DELETE CASCADE,
    tagId INTEGER NOT NULL REFERENCES Tag(tagId) ON DELETE CASCADE,
    PRIMARY KEY (ingredientId, tagId)
);

CREATE TABLE menuItemIngredient (
    menuItemId INTEGER NOT NULL REFERENCES menuItems(menuItemId) ON DELETE CASCADE,
    ingredientId INTEGER NOT NULL REFERENCES ingredient(ingredientId) ON DELETE CASCADE,
    PRIMARY KEY (menuItemId, ingredientId)
);