# E-shop REST API

### Datebase Structure
<img src="https://github.com/iAngkur/eshop_restapi/blob/main/design/DB.PNG" alt="database structure" width="500px" height="400px" />

## How to use the API

### API Base URL: http://localhost:3000/api/v1

### PRODUCTS:
| Method       | Endpoint       | Description   |
| :---         | :---           |          ---: |
| GET          | /products     | Select all the products    |
| POST         | /products      | Insert a product      |
| DELETE       | /products/:productID     | Delete a product    |
| PUT          | /products/:productID       | Update a product      |

### CATEGORIES:
| Method       | Endpoint       | Description   |
| :---         | :---           |          ---: |
| GET          | /categories     | Select all the categories    |
| POST         | /categories      | Insert a category      |
| DELETE       | /categories/:categoryID     | Delete a category    |
| PUT          | /categories/:categoryID       | Update a category      |
