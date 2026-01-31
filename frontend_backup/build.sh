#!/bin/bash

echo "=== Building React Frontend ==="

# Install dependencies
npm install

# Build for production
npm run build

echo "✅ React build completed"
