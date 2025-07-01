DROP DATABASE IF EXISTS DrawingWebsiteDB;
CREATE DATABASE IF NOT EXISTS DrawingWebsiteDB;
USE DrawingWebsiteDB;

CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(255),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(20),
    Role ENUM('client', 'admin') DEFAULT 'client'
);
CREATE TABLE Passwords (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Password VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);
CREATE TABLE Categories (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL
);
CREATE TABLE Drawings (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryID INT,
    Source VARCHAR(255),
    Description TEXT,
    Name VARCHAR(100),
    FOREIGN KEY (CategoryID) REFERENCES Categories(ID)
);
CREATE TABLE Comments (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    DrawingID INT,
    AuthorID INT,
    CommentText TEXT,
    FOREIGN KEY (DrawingID) REFERENCES Drawings(ID),
    FOREIGN KEY (AuthorID) REFERENCES Users(ID)
);
CREATE TABLE Orders (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CategoryID INT,
    Description TEXT,
    Status ENUM('open', 'in_progress', 'completed') DEFAULT 'open',
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CompletionDate TIMESTAMP ,
    price double,
    ReferenceImagePath VARCHAR(255), 
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(ID)
);

INSERT INTO users (id, name, role, address, email, phone) VALUES
(1, 'Shiri Black', 'admin', '12 Rakafot St, Tel Aviv', 'dana@example.com', '0501234567'),
(2, 'Roi Cohen', 'client', '3 Haruv St, Jerusalem', 'roi@example.com', '0527654321'),
(3, 'Shira Ben David', 'client', '9 Hadr St, Haifa', 'shira@example.com', '0542345678'),
(4, 'Noam Peretz', 'client', '1 Tzalon St, Ashdod', 'noam@example.com', '0539876543'),
(5, 'Tal Cohen', 'client', '22 Wheat St, Beersheba', 'tal@example.com', '0582468101'),
(6, 'Lior Azulay', 'client', '18 Olive St, Netanya', 'lior@example.com', '0508765432'),
(7, 'Maya Ron', 'client', '5 Palm St, Ramat Gan', 'maya@example.com', '0523344556'),
(8, 'Oren Katz', 'client', '34 Pine St, Holon', 'oren@example.com', '0535566778');
INSERT INTO categories (id, name) VALUES
(1, 'realistic'),
(2, 'Monochrome'),
(3, 'Comic style'),
(4, 'Animal');
INSERT INTO Drawings (id, categoryId, source, description, name) VALUES
(1, 4, 'dog.jpg', 'yuli smiling at you!', 'Yuli the hasky'),
(2, 2, 'grandfather.jpg', 'the portrait were maid after the grandfather pased away', 'Grandpa Klien'),
(3, 3, 'grandParents.jpg', 'a present for the grandparents anniversary', 'Grandparents Lev'),
(4, 3, 'maranovadya.jpg', 'we all miss him', 'Maran Harav Ovadya Yosef'),
(5, 1, 'michalOrtzel.jpg', "a gift for my friend's birthday", 'Michal'),
(6, 2, 'selfPortrait.jpg', 'my first painting-of-self', 'Your obidient servent:)'),
(7, 1, 'teenage.jpg', 'super rialistic portrait', 'Ayelet'),
(8, 3, 'twoFriends.jpg', 'a painting of two friends', 'Shiri and Osnat');
INSERT INTO comments (id, DrawingID, AuthorID, CommentText) VALUES
(1, 1, 1, 'This portrait is amazing!'),
(2, 2, 3, 'Love the colors and detail.'),
(3, 4, 5, 'So funny and well drawn!'),
(4, 3, 4, 'Beautiful expression.'),
(5, 2, 1, 'Reminds me of a childhood story.'),
(6, 6, 7, 'Such emotional depth in this painting.'),
(7, 5, 6, 'Very creative scene.'),
(8, 8, 8, 'Feels like a dream – love it!');
INSERT INTO orders (id, userId, categoryId, description, status, OrderDate, CompletionDate,price) VALUES
(1, 1, 1, 'Portrait based on uploaded photo', 'open', '2025-06-01', NULL,250),
(2, 3, 2, 'Forest animals digital illustration', 'in_progress', '2025-06-02', NULL,400),
(3, 4, 3, 'Comic page for personal book', 'completed', '2025-05-15', '2025-06-01',600),
(4, 5, 1, 'Classic family portrait', 'open', '2025-06-03', NULL,NULL),
(5, 1, 2, 'Room decor drawing for children', 'in_progress', '2025-05-28', NULL,740),
(6, 7, 3, 'Comic for birthday gift', 'completed', '2025-05-10', '2025-05-27',370),
(7, 6, 1, 'Black and white portrait with shading', 'open', '2025-06-04', NULL,400),
(8, 8, 2, 'Nature illustration', 'open', '2025-06-05', NULL,NULL);
INSERT INTO passwords (id, userId, password) VALUES
(1, 1, '!shiriB'),
(2, 2, 'Art@Home7'),
(3, 3, 'Draw#2024'),
(4, 4, 'Paint$Life1'),
(5, 5, 'Canvas*88'),
(6, 6, 'MyArt!99'),
(7, 7, 'Color%Wave'),
(8, 8, 'Line&Shape3');
-- select * from comments where DrawingID=5;
-- select * from comments
-- SELECT * FROM drawings WHERE categoryId =1  and id > 5 LIMIT 1
-- SELECT * FROM drawings WHERE categoryId = 3 ORDER BY ID LIMIT 2 OFFSET 2
-- SELECT * FROM orders WHERE id =1
-- select * from drawings ;
-- delete  from drawings where id=9;
-- ALTER TABLE categories
-- ADD COLUMN is_active BOOLEAN not null DEFAULT TRUE;
-- UPDATE categories
-- SET is_active = TRUE;
--  select * from categories;
-- select * from users;
-- delete from passwords where UserID=16;
-- delete from users where ID=16;