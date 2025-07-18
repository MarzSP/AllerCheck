
The purpose of AllerCheck is to provide a web-based platform where restaurant customers can view menu items and associated allergen or dietary information without logging in. Restaurants can manage their menus, ingredients, and tags (both standard allergens and custom-defined tags) via a secure login. <br>
<br>
1.1 Scope<br>
AllerCheck is a multi-tier application consisting of:<br>
A frontend (customer- and restaurant-facing web UI)<br>
A backend REST API providing services to the frontend<br>
A SQL database to persist data<br>
<br>
The system allows restaurants to upload and manage menus, dishes, ingredients, and associated tags. Customers can view menus and allergen/dietary information through a QR code or code input.<br><br>
1.2 Definitions<br>
Tag:	A label associated with an ingredient, either a standard allergen or a custom-defined property<br>
MenuItem:	A dish or offering available on a menu<br>
Menu: A collection of MenuItems<br>
<br>
2. Product Description<br>
   2.1 Product Perspective<br>
   AllerCheck is a stand-alone web application. The backend is implemented in TypeScript, following a tiered architecture(MVC) with Controllers, Services, Repositories, and Helpers. The frontend communicates with the backend via REST.<br>
   <br>
   2.2 Product Functions<br>
   Customers can view menus and allergen/dietary information without login.<br>
   Restaurants can log in securely.<br>
   Restaurants can manage their profile, menus, menu items, ingredients, and tags.<br>
   <br>
   2.3 User Classes

| User Class   |	Description                                        |
| ------------ | ----------------------------------------------------- |
| Customer     | Can view menus and allergen/dietary information       |
| Restaurant   | Can log in and manage menus, ingredients, and tags    |
<br>
2.4 Assumptions

    Users have access to a web browser.

    Restaurants manage their own data.

    Standard tags (allergens) are preloaded into the system.
3. Requirements

| Requirement                                                | Priority            |
| ---------------------------------------------------------- | ------------------- |
| Customer can view a restaurant menu without logging in     | **Must**            |
| Customer can see tags (e.g., allergens) per menu item      | **Must**            |
| Restaurant can log in                                      | **Must**            |
| Restaurant can create/update/delete its profile            | **Must**            |
| Restaurant can create/update/delete menus                  | **Must**            |
| Restaurant can create/update/delete menu items             | **Must**            |
| Restaurant can create/update/delete ingredients            | **Must**            |
| Restaurant can link/unlink tags to ingredients             | **Must**            |
| Restaurant can create custom tags                          | **Should**          |
| Preview customer view before publishing                    | **Should**          |
| Restaurant can view all standard tags                      | **Should**          |
| View menu in preferred language / translations             | **Should**          |
| Restaurant can upload menu in bulk (CSV/JSON)              | **Could**           |
| Notifications or reminders for incomplete allergen tagging | **Could**           |
| Enable/disable dishes temporarily without deleting         | **Could**           |
| Customer can search/filter menu items by tag               | **Could**           |
| Customer can see “safe for pregnancy” or other custom tags | **Could**           |
| Restaurant can see audit log of changes                    | **Won’t (for now)** |
| Restaurant can import their ordertickets                   | **Won’t (for now)** |


| Requirement                                     | Priority   |
| ----------------------------------------------- | ---------- |
| Secure password storage (hashed)                | **Must**   |
| secure method authentication                    | **Must**   |
| Accessibility-compliant UI (WCAG)               | **Must**   |
| Responsive design (mobile-friendly)             | **Must**   |
| Input validation & error handling               | **Must**   |
| Logs errors & important events                  | **Must**   |
| Scales up to at least 50 concurrent restaurants | **Should** |
| Supports i18n (multi-language)                  | **Could**  |
| Fully integration tested                        | **Must**   |
