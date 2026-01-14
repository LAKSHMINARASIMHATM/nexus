#!/bin/bash

# Script to add discovery page documents to crawl queue
# This adds URLs to the crawler system instead of direct database insertion

echo "🚀 Adding Discovery Documents to Crawl Queue..."

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# Get database connection details
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-nexus_search}
DB_USER=${DB_USER:-postgres}

echo "📊 Connecting to database: $DB_HOST:$DB_PORT/$DB_NAME"

# Run the SQL script to add documents to crawl queue
echo "📝 Adding discovery documents to crawl queue..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f scripts/add-discovery-to-crawl-queue.sql

if [ $? -eq 0 ]; then
    echo "✅ Discovery documents added to crawl queue successfully"
else
    echo "❌ Failed to add documents to crawl queue"
    exit 1
fi

echo "📊 Documents are now queued for crawling!"
echo ""
echo "🔄 Next steps:"
echo "  1. Start the crawler service"
echo "  2. Monitor crawl progress"
echo "  3. Documents will be automatically processed and indexed"
echo ""
echo "🎉 Discovery documents are now in the crawl queue!"
