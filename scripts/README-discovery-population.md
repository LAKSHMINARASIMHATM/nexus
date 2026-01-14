# Discovery Page Database Population

This directory contains scripts to populate the database with all documents referenced in the discovery page.

## Files Overview

### SQL Scripts
- **`insert-discovery-documents.sql`** - Inserts all discovery page documents into the database
- **`add-document-metadata.sql`** - Creates categories table and adds metadata for all documents

### Population Scripts
- **`populate-discovery-documents.sh`** - Bash script for Linux/macOS
- **`populate-discovery-documents.ps1`** - PowerShell script for Windows

## Documents Included

### Categories
1. **Neural Architecture** - Advanced neural network architectures and AI research
2. **Deep Space Bio** - Astrobiology and space exploration research
3. **Web3 Ecosystems** - Blockchain and decentralized finance
4. **Sustainable Cities** - Urban planning and green infrastructure
5. **Quantum Computing** - Quantum mechanics and computing applications
6. **Ethical AI** - AI ethics and responsible AI development

### Trending Documents
- Neural Link Protocol V1.0-V5.0 Integration Guides
- Each with detailed technical specifications and implementation guides

### Popular Documents
- Quantum Computing Basics
- Sustainable Urban Planning
- AI Ethics Framework
- Web3 Infrastructure

### Recent Documents
- Neural Architecture Optimization
- Deep Space Biology Findings
- Web3 Security Protocols
- Sustainable Energy Solutions
- Quantum Computing Applications

### Featured Documents
- The Future of Neural Networks
- Sustainable Computing Practices

## Database Schema

### Tables Created
- **`categories`** - Category information with names, descriptions, and colors
- **`document_categories`** - Junction table linking documents to categories
- **`document_metadata`** - Extended metadata for documents (author, institution, etc.)

### Document Metadata
Each document includes:
- Author name and institution
- Word count and reading time
- Publication date and category
- Rating and view counts
- Abstract and keywords
- Featured reason (for featured documents)

## Usage

### Prerequisites
1. PostgreSQL must be running
2. Database `nexus_search` must exist
3. Base schema must be created (run `scripts/schema.sql` first)

### Windows Options

#### Option 1: Seed 1000 URLs (Recommended)
This script populates the crawl queue with a comprehensive list of 1000 URLs across various categories.
```bash
npx tsx scripts/seed-1000-urls.ts
```

#### Option 2: Node.js Script (Discovery Docs)
```bash
# Navigate to project root
cd d:/search-engine-spec

# Install dependencies if not already done
npm install

# Run the Node.js population script
node scripts/populate-discovery-documents.js
```

#### Option 2: Batch File (Simple)
```cmd
# Navigate to scripts directory
cd d:/search-engine-spec/scripts

# Run the batch file
populate-discovery-documents.bat
```

#### Option 3: PowerShell Script (Fixed)
```powershell
# Navigate to scripts directory
cd d:/search-engine-spec/scripts

# Run the PowerShell script
.\populate-discovery-documents.ps1
```

#### Option 4: Direct psql (If in PATH)
```cmd
# Navigate to scripts directory
cd d:/search-engine-spec/scripts

# Run SQL files directly
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -p 5432 -U postgres -d nexus_search -f insert-discovery-documents.sql
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -h localhost -p 5432 -U postgres -d nexus_search -f add-document-metadata.sql
```

### Linux/macOS (Bash)
```bash
# Navigate to project root
cd /path/to/search-engine-spec

# Install dependencies if not already done
npm install

# Run the Node.js population script
node scripts/populate-discovery-documents.js
```

Or use the bash script:
```bash
# Make script executable
chmod +x scripts/populate-discovery-documents.sh

# Run the population script
./scripts/populate-discovery-documents.sh
```

### Manual SQL Execution
```bash
# Insert documents
psql -h localhost -p 5432 -U postgres -d nexus_search -f scripts/insert-discovery-documents.sql

# Add categories and metadata
psql -h localhost -p 5432 -U postgres -d nexus_search -f scripts/add-document-metadata.sql
```

## Environment Variables

Optional environment variables for database connection:
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: nexus_search)
- `DB_USER` - Database user (default: postgres)
- `DB_PASSWORD` - Database password (default: password)

## Document URLs

All documents have realistic URLs pointing to:
- arxiv.org for research papers
- nature.com for scientific articles
- ieeexplore.ieee.org for technical papers
- sciencedirect.com for academic research
- nasa.gov for space research
- Various specialized domains for specific topics

## Search Integration

After populating the database:
1. Documents will be searchable through the Nexus search interface
2. Category filtering will work in the discovery page
3. All metadata will be available for search results
4. Click tracking will work for all documents

## Verification

After running the scripts, you can verify the data:

```sql
-- Check document count
SELECT COUNT(*) FROM documents;

-- Check categories
SELECT * FROM categories;

-- Check document metadata
SELECT title, author, institution, word_count FROM document_metadata LIMIT 5;

-- Check document categories
SELECT d.title, c.name FROM documents d
JOIN document_categories dc ON d.doc_id = dc.doc_id
JOIN categories c ON dc.category_id = c.category_id
LIMIT 10;
```

## Troubleshooting

### Common Issues
1. **PostgreSQL not running** - Start PostgreSQL service
2. **Database doesn't exist** - Create the database first
3. **Permission errors** - Check database user permissions
4. **Connection failed** - Verify connection parameters

### Error Messages
- `relation "documents" does not exist` - Run base schema first
- `duplicate key value violates unique constraint` - Documents already exist
- `permission denied` - Check database user permissions

## Next Steps

After populating the database:
1. Test search functionality with discovery page queries
2. Verify category filtering works
3. Check document preview displays correctly
4. Test click tracking functionality
5. Verify search result rankings
