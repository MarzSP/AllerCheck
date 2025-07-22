/*CREATE DATABASE [allercheck1.0];
GO

USE [allercheck1.0];
GO*/

-- create database if needed
-- CREATE DATABASE [allercheck1.0];
-- GO

USE [allercheck1.0];
GO

-- drop tables in correct order due to FK constraints
IF OBJECT_ID('menuItemIngredient', 'U') IS NOT NULL DROP TABLE menuItemIngredient;
IF OBJECT_ID('ingredientTag', 'U') IS NOT NULL DROP TABLE ingredientTag;
IF OBJECT_ID('tag', 'U') IS NOT NULL DROP TABLE tag;
IF OBJECT_ID('ingredient', 'U') IS NOT NULL DROP TABLE ingredient;
IF OBJECT_ID('menuItem', 'U') IS NOT NULL DROP TABLE menuItem;
IF OBJECT_ID('menu', 'U') IS NOT NULL DROP TABLE menu;
IF OBJECT_ID('auth', 'U') IS NOT NULL DROP TABLE auth;
IF OBJECT_ID('users', 'U') IS NOT NULL DROP TABLE users;
GO

-- users table
CREATE TABLE users
(
    userId BIGINT IDENTITY (1,1) PRIMARY KEY,
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
GO

-- auth table
CREATE TABLE auth
(
    id         BIGINT IDENTITY (1,1) PRIMARY KEY,
    userId     BIGINT   NOT NULL FOREIGN KEY REFERENCES users (userId) ON DELETE CASCADE,
    token      VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE(),
    expires_at DATETIME NOT NULL
);
GO

-- menu table
CREATE TABLE menu
(
    menuId   BIGINT IDENTITY (1,1) PRIMARY KEY,
    userId   BIGINT NOT NULL FOREIGN KEY REFERENCES users (userId) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    isActive BIT DEFAULT 1,
    updated_at  DATETIME DEFAULT GETDATE(),
    created_at  DATETIME DEFAULT GETDATE()
);
GO

-- menuItem table
CREATE TABLE menuItem
(
    menuItemId BIGINT IDENTITY (1,1) PRIMARY KEY,
    menuId     BIGINT NOT NULL FOREIGN KEY REFERENCES menu (menuId) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);
GO

-- ingredient table
CREATE TABLE ingredient
(
    ingredientId BIGINT IDENTITY (1,1) PRIMARY KEY,
    name         VARCHAR(100) NOT NULL
);
GO

-- tag table
CREATE TABLE tag
(
    tagId      BIGINT IDENTITY (1,1) PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    type        VARCHAR(50)  NOT NULL,
    isAllergen BIT DEFAULT 0,
    description VARCHAR(255)
);
GO

-- ingredientTag table
CREATE TABLE ingredientTag
(
    ingredientId BIGINT NOT NULL FOREIGN KEY REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    tagId        BIGINT NOT NULL FOREIGN KEY REFERENCES tag (tagId) ON DELETE CASCADE,
    PRIMARY KEY (ingredientId, tagId)
);
GO

-- menuItemIngredient table
CREATE TABLE menuItemIngredient
(
    menuItemId   BIGINT NOT NULL FOREIGN KEY REFERENCES menuItem (menuItemId) ON DELETE CASCADE,
    ingredientId BIGINT NOT NULL FOREIGN KEY REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    PRIMARY KEY (menuItemId, ingredientId)
);
GO
