DROP DATABASE IF EXISTS company_DB;

CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE roles (
	roll_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT(10) NOT NULL,
    department_id INT(10) NOT NULL,
    PRIMARY KEY(roll_id)
);

CREATE TABLE employees (
	employee_id INT(10) AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10) NULL,
    PRIMARY KEY(employee_id)
);