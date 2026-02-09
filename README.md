# Insurance Policy Management System

A full-stack application for managing insurance policies with Spring Boot backend and React frontend.

## Features

- ✅ User authentication with JWT
- ✅ Role-based access control (Admin/Customer)
- ✅ Policy management
- ✅ Claims processing
- 🚧 Email notifications (experimental)
- 🚧 Dark mode support (experimental)
- 🚧 Audit logging (experimental)

## Tech Stack

### Backend
- Spring Boot 3.2.5
- Spring Security with JWT
- PostgreSQL Database
- Maven
- Lombok

### Frontend
- React 18
- Redux Toolkit
- TailwindCSS
- Vite
- Axios

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL
- Maven

### Database Setup
```sql
CREATE DATABASE insurance_db;
CREATE USER insurance_user WITH PASSWORD 'insurance_pass';
GRANT ALL PRIVILEGES ON DATABASE insurance_db TO insurance_user;
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.yml`:
- Database credentials
- JWT secret
- Server port

### Frontend Configuration
Create `frontend/.env`:
```
VITE_API_URL=http://localhost:8080
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Policies
- `GET /api/policies` - List all policies
- `POST /api/policies` - Create new policy
- `PUT /api/policies/{id}` - Update policy
- `DELETE /api/policies/{id}` - Delete policy

## Known Issues

- 🐛 Email service needs SMTP configuration
- 🐛 Dark mode doesn't persist properly
- 🐛 Audit logging is in-memory only
- 🐛 No proper error handling for network issues

## TODO

- [ ] Add email templates
- [ ] Implement proper audit logging with database
- [ ] Add file upload for documents
- [ ] Implement password reset functionality
- [ ] Add data export features
- [ ] Improve mobile responsiveness
- [ ] Add unit tests
- [ ] Add integration tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

Project maintained by Naren - contact@naren.dev

---

**Note**: This is a development project with some experimental features. Production deployment requires additional configuration and security hardening.
