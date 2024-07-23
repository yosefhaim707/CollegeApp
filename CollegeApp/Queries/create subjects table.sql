CREATE TABLE Subjects(
    ID INT IDENTITY PRIMARY KEY,
    SubjectName VARCHAR(50),
    HoursAmount INT,
    TeacherID INT FOREIGN KEY REFERENCES Teachers(ID),
    CONSTRAINT SName UNIQUE(SubjectName)
);