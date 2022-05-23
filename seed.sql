USE employees_db;

INSERT INTO department (name)
VALUES 
('Egineering'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 95000, 1),
('Accountant', 85000, 2),
('Paralegal', 60000, 3),
('Manager', 80000, 4),
('Engineer', 90000, 5),
('Sales Rep', 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Liam', 'Neeson', 1, 458),
('Emma', 'Watson', 2, 276),
('Brad', 'Pitt', 3, 486),
('Bill', 'Murray', 4, 126),
('Jessica', 'Alba', 5, 724),
('Gal', 'Gadot', 6, 157);
