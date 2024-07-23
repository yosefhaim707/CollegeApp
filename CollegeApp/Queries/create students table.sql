CREATE TABLE Students (
    ID INT IDENTITY PRIMARY KEY,
    StudentName VARCHAR(50),
    StudentNAT INT UNIQUE,
    StudentDebt INT
);