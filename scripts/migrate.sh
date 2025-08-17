#!/bin/bash

echo "🚀 Starting database migration..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until npx prisma db push --accept-data-loss; do
  echo "Database not ready, retrying in 5 seconds..."
  sleep 5
done

echo "✅ Database migration completed successfully!"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🎉 All setup completed!"
