-- Create the database
CREATE DATABASE allercheck;
GO

-- Use the database
USE allercheck;
GO

-- Table: users
CREATE TABLE users
(
    userId        INT IDENTITY (1,1) PRIMARY KEY,
    username      NVARCHAR(50)  NOT NULL UNIQUE,
    email         NVARCHAR(100) NOT NULL UNIQUE,
    address       NVARCHAR(255),
    address2      NVARCHAR(255),
    city          NVARCHAR(100),
    postalCode    NVARCHAR(20),
    country       NVARCHAR(100),
    password_hash NVARCHAR(255) NOT NULL,
    created_at    DATETIME DEFAULT GETDATE()
);
GO

-- Table: auth
CREATE TABLE auth
(
    id         INT IDENTITY (1,1) PRIMARY KEY,
    userId     INT           NOT NULL FOREIGN KEY REFERENCES users (userId) ON DELETE CASCADE,
    token      NVARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE(),
    expires_at DATETIME      NOT NULL
);
GO

-- Table: menu
CREATE TABLE menu
(
    menuId      INT IDENTITY (1,1) PRIMARY KEY,
    userId      INT           NOT NULL FOREIGN KEY REFERENCES users (userId) ON DELETE CASCADE,
    name        NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    isActive    BIT           NOT NULL DEFAULT 0,
    updated_at  DATETIME               DEFAULT GETDATE(),
    created_at  DATETIME               DEFAULT GETDATE()
);
GO

-- Table: menuItem
CREATE TABLE menuItem
(
    menuItemId  INT IDENTITY (1,1) PRIMARY KEY,
    menuId      INT           NOT NULL FOREIGN KEY REFERENCES menu (menuId) ON DELETE CASCADE,
    name        NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX)
);
GO

-- Table: ingredient
CREATE TABLE ingredient
(
    ingredientId INT IDENTITY (1,1) PRIMARY KEY,
    name         NVARCHAR(100) NOT NULL
);
GO

-- Table: tag
CREATE TABLE tag
(
    tagId       INT IDENTITY (1,1) PRIMARY KEY,
    name        NVARCHAR(100) NOT NULL UNIQUE,
    type        NVARCHAR(50)  NOT NULL,
    isAllergen  BIT           NOT NULL DEFAULT 0,
    description NVARCHAR(MAX)
);
GO

-- Table: ingredientTag
CREATE TABLE ingredientTag
(
    ingredientId INT NOT NULL FOREIGN KEY REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    tagId        INT NOT NULL FOREIGN KEY REFERENCES tag (tagId) ON DELETE CASCADE,
    PRIMARY KEY (ingredientId, tagId)
);
GO

-- Table: menuItemIngredient
CREATE TABLE menuItemIngredient
(
    menuItemId   INT NOT NULL FOREIGN KEY REFERENCES menuItem (menuItemId) ON DELETE CASCADE,
    ingredientId INT NOT NULL FOREIGN KEY REFERENCES ingredient (ingredientId) ON DELETE CASCADE,
    PRIMARY KEY (menuItemId, ingredientId)
);
GO
