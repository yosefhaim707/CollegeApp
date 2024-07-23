CREATE TABLE Cycles (
    ID INT IDENTITY PRIMARY KEY,
    CycleName VARCHAR(50) UNIQUE,
    StartDate DATE,
    EndDate DATE,
    CoursePrice INT,
    CourseID INT FOREIGN KEY REFERENCES Courses(ID),
);