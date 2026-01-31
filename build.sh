#!/bin/bash

echo "=== Building Django + React Application ==="

# Install Python dependencies
pip install -r requirements.txt
pip install gunicorn psycopg2-binary whitenoise

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

echo "✅ Build completed"
