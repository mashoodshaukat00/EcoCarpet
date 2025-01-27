# Steps to Enable Team Collaboration
1. Include Migration Files in Version Control:

- When you run `Add-Migration InitiateCreate`, Entity Framework creates migration files (e.g., `InitialCreate.cs`) in a `Migrations` folder.
- Ensure this folder is committed to your Git repository so others can access the same migration history.
  
2. **Team Member Workflow to Create Database:** Once a team member clones the repository, they can use the following steps to create or update their local database:

- Open a terminal or the Package Manager Console.
  
**Run:**
bash

`dotnet ef database update`
- This command applies all migrations and creates the database (EcoCarpetDB) and tables on their local SQL Server instance.
# Database Connection String:

If team members use different SQL Server instances, ensure the connection string in **appsettings.json** is configured properly.

- Example for a shared development environment:

` "ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=bDB;Trusted_Connection=True;"
} `
- Team members can override this by creating an appsettings.Development.json file or environment variables if needed.
# Seeding Data (Optional):

If your project seeds the database with initial data (e.g., admin accounts), this will run automatically when they execute dotnet ef database update.

# Managing Migrations for Team Collaboration
- **When Adding a New Migration:** Only one person should add a migration for a specific schema change. For example:

- Add a migration using:
bash
<br>

`dotnet ef migrations add AddNewTable`
<br>
- Commit and push the migration file to the repository.
- **When Pulling Updates:** Other team members should apply new migrations by running:

bash
<br>
   `dotnet ef database update`
## Benefits of This Approach
1. No Manual SQL Scripts: Your team won't need to manually create or update the database schema.
2. Consistency: Everyone works with the same database schema, reducing errors.
3. Ease of Updates: Schema changes are versioned, and applying them is straightforward.
