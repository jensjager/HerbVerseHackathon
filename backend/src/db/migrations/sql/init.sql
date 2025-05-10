CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
image TEXT,
seller VARCHAR(255) NOT NULL,
description TEXT,
category VARCHAR(100),
stock INT DEFAULT 0,
rating DECIMAL(2, 1),
discount DECIMAL(5, 2)
);

INSERT INTO products (name, price, image, seller, description, category, stock, rating, discount) VALUES
('Herbal Tea', 10.99, '[https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress\&cs=tinysrgb\&w=1260\&h=750\&dpr=2](https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 'HerbCo', 'A soothing blend of herbal tea.', 'Beverages', 50, 4.5, 10),
('Aloe Vera Gel', 15.49, '[https://images.pexels.com/photos/15725408/pexels-photo-15725408/free-photo-of-close-up-of-a-succulent.jpeg?auto=compress\&cs=tinysrgb\&w=1260\&h=750\&dpr=2](https://images.pexels.com/photos/15725408/pexels-photo-15725408/free-photo-of-close-up-of-a-succulent.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 'NatureCare', 'Pure aloe vera gel for skincare.', 'Skincare', 30, 4.8, NULL),
('Essential Oil', 8.99, '[https://images.pexels.com/photos/932577/pexels-photo-932577.jpeg?auto=compress\&cs=tinysrgb\&w=1260\&h=750\&dpr=2](https://images.pexels.com/photos/932577/pexels-photo-932577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 'AromaWorld', 'High-quality essential oil for aromatherapy.', 'Aromatherapy', 100, 4.2, NULL);

CREATE TABLE inventory (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
stock INT NOT NULL,
category VARCHAR(100) NOT NULL
);

INSERT INTO inventory (name, price, stock, category) VALUES
('Herbal Tea', 10.99, 50, 'Beverages'),
('Aloe Vera Gel', 15.49, 30, 'Skincare'),
('Essential Oil', 8.99, 100, 'Aromatherapy'),
('Lavender Soap', 5.99, 20, 'Bath & Body'),
('Chamomile Tea', 12.99, 40, 'Beverages');

CREATE TABLE orders (
id SERIAL PRIMARY KEY,
customer\_name VARCHAR(255) NOT NULL,
total\_amount DECIMAL(10, 2) NOT NULL,
status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'Shipped', 'Delivered')),
date DATE NOT NULL DEFAULT CURRENT\_DATE
);

CREATE TABLE order\_items (
id SERIAL PRIMARY KEY,
order\_id INT REFERENCES orders(id) ON DELETE CASCADE,
product\_name VARCHAR(255) NOT NULL,
quantity INT NOT NULL
);

INSERT INTO orders (customer\_name, total\_amount, status, date) VALUES
('John Doe', 45.99, 'Pending', '2025-05-08'),
('Jane Smith', 25.49, 'Shipped', '2025-05-07'),
('Alice Johnson', 15.99, 'Delivered', '2025-05-06');

INSERT INTO order\_items (order\_id, product\_name, quantity) VALUES
(1, 'Herbal Tea', 2),
(1, 'Aloe Vera Gel', 1),
(2, 'Essential Oil', 3),
(3, 'Herbal Tea', 1);
