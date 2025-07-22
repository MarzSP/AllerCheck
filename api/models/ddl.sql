/*CREATE DATABASE [allercheck1.0];
GO

USE [allercheck1.0];
GO*/
CREATE TABLE users
(
    userId        BIGINT PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    address       VARCHAR(255),
    address2      VARCHAR(255),
    city          VARCHAR(100),
    postalCode    VARCHAR(20),
    country       VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    created_at    DATETIME DEFAULT GETDATE()
);

CREATE TABLE auth
(
    id         BIGINT PRIMARY KEY,
    userId     BIGINT       NOT NULL REFERENCES users (userId) ON DELETE CASCADE,
    token      VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE(),
    expires_at TIMESTAMP    NOT NULL
);

CREATE TABLE menu
(
    menuId      BIGINT PRIMARY KEY,
    userId      BIGINT       NOT NULL REFERENCES users (userId) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    isActive    BIT,
    updated_at  DATETIME DEFAULT GETDATE(),
    created_at  DATETIME DEFAULT GETDATE()
);

CREATE TABLE menuItem
(
    menuItemId  BIGINT PRIMARY KEY,
    menuId      BIGINT       NOT NULL REFERENCES menu (menuId) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE ingredient
(
    ingredientId BIGINT PRIMARY KEY,
    name         VARCHAR(100) NOT NULL
);

CREATE TABLE tag
(
    tagId       BIGINT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    type        VARCHAR(50)  NOT NULL,
    isAllergen  BIT,
    description VARCHAR(255)
);

CREATE TABLE ingredientTag
(
    ingredientId BIGINT NOT NULL REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    tagId        BIGINT NOT NULL REFERENCES tag (tagId) ON DELETE CASCADE,
    PRIMARY KEY (ingredientId, tagId)
);

CREATE TABLE menuItemIngredient
(
    menuItemId   BIGINT NOT NULL REFERENCES menuItem (menuItemId) ON DELETE CASCADE,
    ingredientId BIGINT NOT NULL REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    PRIMARY KEY (menuItemId, ingredientId)
);