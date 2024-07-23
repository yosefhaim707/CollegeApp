CREATE TABLE Teachers (
    ID INT IDENTITY PRIMARY KEY,
    TeacherName VARCHAR(50),
    HourlyPrice INT,
    CONSTRAINT TName UNIQUE(TeacherName)
);