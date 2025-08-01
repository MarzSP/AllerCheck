insert into Users (username, email, address, address2, city, postalCode, country, password_hash)
VALUES ('testuser',
        'test@testcom',
        '123 Test St',
        'Apt 4B',
        'Beek',
        '12345',
        'Test Country',
        'hashed_password_example');

INSERT INTO auth (userId, token, expires_at)
VALUES (1,
        'dummyauthtoken123',
        CURRENT_TIMESTAMP + INTERVAL '7 days');

INSERT INTO menuItem (menuId, name, description)
VALUES (1,
        'Smokey Burger',
        'A delicious test dish.');

INSERT INTO ingredient (name)
VALUES ('Test Ingredient 1'),
       ('Test Ingredient 2');

INSERT INTO tag (name, type, isAllergen, description)
VALUES ('Gluten', 'Allergen', 1, 'Gluten allergen'),
       ('Vegan', 'Dietary', 0, 'Suitable for vegans');

INSERT INTO menuItemIngredient (menuItemId, ingredientId)
VALUES (1, 1),
       (1, 2);

