USE employee_db;

INSERT INTO department (name)
    VALUES
        ('Reception'),
        ('Sales'),
        ('Finance'),
        ('Human Resources'),
        ('Customer Service');

INSERT INTO role (title, salary, department_id)
    VALUES
        ('CEO', 350000, 1),
        ('Manager', 100000, 2),
        ('Lead Salesperson', 75000, 3),
        ('Salesperson', 60000, 4),
        ('New-hire Salesperson', 40000, 5),
        ('Intern', 25000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)  
    VALUES
        ('Joe', 'Schmoe', 1, NULL),
        ('Jack', 'Sparrow', 2, NULL),
        ('Jayjay', 'Jet', 3, NULL),
        ('Jean', 'Grey', 4, NULL),
        ('Janine', 'Panini', 5, NULL),
        ('Josh', 'Posh', 6, NULL),
        ('Jason', 'Stathum', 7, NULL);
        