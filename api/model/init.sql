-- Drop tables in correct order
DROP TABLE IF EXISTS menuItemIngredient;
DROP TABLE IF EXISTS ingredientTag;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS menuItem;
DROP TABLE IF EXISTS menu;
DROP TABLE IF EXISTS auth;
DROP TABLE IF EXISTS users;

-- users table
CREATE TABLE users
(
    userId        BIGSERIAL PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    address       VARCHAR(255),
    address2      VARCHAR(255),
    city          VARCHAR(100),
    postalCode    VARCHAR(20),
    country       VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- auth table
CREATE TABLE auth
(
    id         BIGSERIAL PRIMARY KEY,
    userId     BIGINT       NOT NULL REFERENCES users (userId) ON DELETE CASCADE,
    token      VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP    NOT NULL
);

-- menu table
CREATE TABLE menu
(
    menuId      BIGSERIAL PRIMARY KEY,
    userId      BIGINT       NOT NULL REFERENCES users (userId) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    isActive    BOOLEAN   DEFAULT TRUE,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- menuItem table
CREATE TABLE menuItem
(
    menuItemId  BIGSERIAL PRIMARY KEY,
    menuId      BIGINT       NOT NULL REFERENCES menu (menuId) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

-- ingredient table
CREATE TABLE ingredient
(
    ingredientId BIGSERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL
);

-- tag table
CREATE TABLE tag
(
    tagId       BIGSERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    type        VARCHAR(50)  NOT NULL,
    isAllergen  BOOLEAN DEFAULT FALSE,
    description VARCHAR(255)
);

-- ingredientTag table
CREATE TABLE ingredientTag
(
    ingredientId BIGINT NOT NULL REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    tagId        BIGINT NOT NULL REFERENCES tag (tagId) ON DELETE CASCADE,
    PRIMARY KEY (ingredientId, tagId)
);

-- menuItemIngredient table
CREATE TABLE menuItemIngredient
(
    menuItemId   BIGINT NOT NULL REFERENCES menuItem (menuItemId) ON DELETE CASCADE,
    ingredientId BIGINT NOT NULL REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    PRIMARY KEY (menuItemId, ingredientId)
);
