-- URL Safety Detection Schema
-- Stores safety check results for URLs to prevent repeated checks
CREATE TABLE IF NOT EXISTS url_safety_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    url_hash CHAR(64) NOT NULL UNIQUE,
    -- SHA-256 hash of normalized URL
    safety_status VARCHAR(20) NOT NULL DEFAULT 'unknown',
    -- safe, warning, danger, unknown
    threat_types TEXT [],
    -- Array of detected threats: phishing, malware, suspicious, etc.
    safety_score INTEGER DEFAULT 0,
    -- 0-100, higher is safer
    confidence_score INTEGER DEFAULT 0,
    -- 0-100, confidence in the assessment
    -- Detailed analysis
    is_https BOOLEAN DEFAULT false,
    has_suspicious_patterns BOOLEAN DEFAULT false,
    has_phishing_keywords BOOLEAN DEFAULT false,
    is_ip_address BOOLEAN DEFAULT false,
    suspicious_tld BOOLEAN DEFAULT false,
    excessive_subdomain BOOLEAN DEFAULT false,
    -- Metadata
    check_method VARCHAR(50) DEFAULT 'heuristic',
    -- heuristic, google_safe_browsing, phishtank, etc.
    details JSONB,
    -- Store additional details about the check
    -- Timestamps
    first_checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    -- Cache expiration (e.g., 24 hours)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_url_safety_url_hash ON url_safety_checks(url_hash);
CREATE INDEX IF NOT EXISTS idx_url_safety_status ON url_safety_checks(safety_status);
CREATE INDEX IF NOT EXISTS idx_url_safety_expires ON url_safety_checks(expires_at);
CREATE INDEX IF NOT EXISTS idx_url_safety_last_checked ON url_safety_checks(last_checked_at);
-- Known malicious domains/patterns table
CREATE TABLE IF NOT EXISTS known_malicious_domains (
    id SERIAL PRIMARY KEY,
    domain TEXT NOT NULL UNIQUE,
    threat_type VARCHAR(50) NOT NULL,
    -- phishing, malware, spam, etc.
    source VARCHAR(100),
    -- Where this information came from
    severity VARCHAR(20) DEFAULT 'high',
    -- low, medium, high, critical
    is_active BOOLEAN DEFAULT true,
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_malicious_domains_domain ON known_malicious_domains(domain);
CREATE INDEX IF NOT EXISTS idx_malicious_domains_active ON known_malicious_domains(is_active);
-- Safety check reports from users
CREATE TABLE IF NOT EXISTS safety_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    -- false_positive, false_negative, new_threat
    reported_by_user_id UUID REFERENCES users(user_id),
    reported_by_session_id UUID,
    current_status VARCHAR(20),
    -- What the system currently says
    user_claimed_status VARCHAR(20),
    -- What the user claims it should be
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    -- pending, reviewed, resolved, rejected
    reviewed_by UUID REFERENCES users(user_id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_safety_reports_status ON safety_reports(status);
CREATE INDEX IF NOT EXISTS idx_safety_reports_url ON safety_reports(url);
-- Seed some known bad patterns (examples - you would expand this)
INSERT INTO known_malicious_domains (domain, threat_type, source, severity)
VALUES (
        'example-phishing-site.com',
        'phishing',
        'manual',
        'high'
    ),
    (
        'malware-example.ru',
        'malware',
        'manual',
        'critical'
    ),
    (
        'free-prize-winner.tk',
        'phishing',
        'manual',
        'high'
    ) ON CONFLICT (domain) DO NOTHING;
-- Function to check if cache is still valid
CREATE OR REPLACE FUNCTION is_safety_check_valid(expires_timestamp TIMESTAMP WITH TIME ZONE) RETURNS BOOLEAN AS $$ BEGIN RETURN expires_timestamp IS NULL
    OR expires_timestamp > NOW();
END;
$$ LANGUAGE plpgsql IMMUTABLE;
-- Function to update safety check timestamp
CREATE OR REPLACE FUNCTION update_safety_check_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER update_url_safety_checks_timestamp BEFORE
UPDATE ON url_safety_checks FOR EACH ROW EXECUTE FUNCTION update_safety_check_timestamp();