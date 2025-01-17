CREATE TABLE CoursesSubjects (
    ID INT IDENTITY PRIMARY KEY,
    SubjectID INT FOREIGN KEY REFERENCES Subjects(ID),
    CourseID INT FOREIGN KEY REFERENCES Courses(ID),
    CONSTRAINT CSDup UNIQUE(SubjectID, CourseID)
);