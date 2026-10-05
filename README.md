# Iotnect Factory Detection Dashboard

A Laravel demonstration dashboard for factory activity monitoring, including:

- Mobile phone usage detection
- Leave-post and absence detection
- Camera tracking and re-identification
- Floorplan route tracking
- Evidence review and incident status controls

## Local setup

```bash
composer install
npm install
copy .env.example .env
php artisan key:generate
php artisan migrate
npm run build
php artisan serve
```

The demo login defaults are:

```text
Username: admin
Password: admin123
```

Override them with `DEMO_USERNAME` and `DEMO_PASSWORD` in `.env`.
