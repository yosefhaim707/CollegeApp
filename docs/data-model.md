# Data Model ERD

```mermaid
erDiagram
  User ||--o{ Favorite : owns
  Driver ||--o{ Result : participates
  Constructor ||--o{ Result : fields
  Race ||--o{ Result : hosts
  Race ||--o{ LapTime : contains
  Race ||--o{ PitStop : includes
```
