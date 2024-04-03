# Devis Management 
Description


## Site
1- /: Dashboard
...
7- *: Page d'erreur 404 pour les routes non définies.


## Technologies Utilisées
Backend: Node.js, Express.js
Frontend: React.js, React Router


## Utilisation
Backend
ouvrir le backend ```cd backend```
mettre à jours les dépendances : ```npm install```
lancer le serveur : ```npx nodemon server.js```
Frontend
ouvrir le frontend ```cd frontend```
mettre à jours les dépendances : ```npm install```
lancer le site : ```npm start```


## BDD - MLD
User: id, email, password, name_socity, name, phone, adress, cp, city, country
Customer: id, name_socity, name, phone, adress, cp, city, country
Order: id, devis_number, start_date, creation_date, update_date, days, tva, statut, cost, type_of_work, description, customer_id, user_id
Material: id, name, cost
Services: id, name, cost
Material_Order: id, order_id, material_id, quantity
Service_Order: id, order_id, service_id, quantity

## API
1- /: Dashboard
...
7- *: Page d'erreur 404 pour les routes non définies.