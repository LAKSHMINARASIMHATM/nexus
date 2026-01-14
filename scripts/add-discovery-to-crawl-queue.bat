@echo off
echo 🚀 Adding Discovery Documents to Crawl Queue...

REM Check if PostgreSQL is installed
if not exist "C:\Program Files\PostgreSQL\16\bin\psql.exe" (
    echo ❌ PostgreSQL not found at C:\Program Files\PostgreSQL\16\bin\psql.exe
    echo 💡 Please install PostgreSQL or update the path in this script
    pause
    exit /b 1
)

REM Check if PostgreSQL service is running
sc query postgresql-x64-16 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL service is not running
    echo 💡 Starting PostgreSQL service...
    net start postgresql-x64-16
    timeout /t 5 >nul
)

echo 📊 Connecting to database...
set PSQL_PATH="C:\Program Files\PostgreSQL\16\bin\psql.exe"

echo 📝 Adding discovery documents to crawl queue...
%PSQL_PATH% -h localhost -p 5432 -U postgres -d nexus_search -f add-discovery-to-crawl-queue.sql
if %errorlevel% neq 0 (
    echo ❌ Failed to add documents to crawl queue
    pause
    exit /b 1
)
echo ✅ Discovery documents added to crawl queue successfully

echo 📊 Documents are now queued for crawling!
echo.
echo 🔄 Next steps:
echo   1. Start the crawler service
echo   2. Monitor crawl progress
echo   3. Documents will be automatically processed and indexed
echo.
echo 🎉 Discovery documents are now in the crawl queue!
pause
