# Devis Management 
Description


## Comment ça Marche
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


## BDD
+-----------+          +----------+
|   User    |          | Customer |
+-----------+          +----------+
| id        |          | id       |
| name      |          | name     |
| email     |          | socity   |
| password  |          | adress   |
+-----------+          | cp       |
        |              | phone    |
        |              +----------+
        |                    |
        |                    |
        |                    |
        |                    |
+---------------+         +------------+       +------------+
|  Order        |---------|  Material  |       |  Service   |
+---------------+         +------------+       +------------+
| id            |         | id         |       | id         |
| devis_number  |         | nom        |       | nom        |
| creation_date |         | cout       |       | cout       |
| update_date   |         +------------+       +------------+
| statut        |         |            |       |            |
| cost          |         |            |       |            |
| days          |         |            |       |            |
| type_of_work  |         |            |       |            |
| description   |         |            |       |            |
+---------------+         +------------+       +------------+
        |                    |                    |
        |                    |                    |
        |                    |                    |
        |                    |                    |
+----------------------+  +-----------------------+
|   Material_Order     |  |    Service_Order      |
+----------------------+  +-----------------------+
| id                   |  | id                    |
| order_id             |  | order_id              |
| material_id          |  | service_id            |
| quantity             |  | quantity              |
+----------------------+  +-----------------------+
