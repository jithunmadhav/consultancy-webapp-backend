Job Consultancy Backend

Overview

This is a backend system for a Job Consultancy where companies (clients) can post job requirements through their client portal. The consultancy admin receives these requirements and submits suitable candidate resumes through their portal.

Tech Stack

Node.js: Backend runtime

Express.js: Web framework

Sequelize: ORM for MySQL

MySQL: Database

Joi: Data validation

AWS SES: Email notifications

AWS S3: Media storage

Features

Client Portal: Companies can register, log in, and post job requirements.

Admin Portal: Consultancy admin can receive job requirements and submit candidate resumes.

Email Notifications: AWS SES is used to notify clients and admins about updates.

File Uploads: Candidate resumes and other media are stored securely in AWS S3.

Validation: Data integrity is ensured using Joi validation.

Authentication & Authorization: Secure login for clients and admins.
