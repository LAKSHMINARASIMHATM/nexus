# 🤖 Autonomous Browser System

## Overview

The Autonomous Browser System automatically tests your search engine, demonstrates features, and collects real metrics like CTR (Click-Through Rate), engagement time, and conversion rates.

## Features

✅ **Automated Testing** - Validates search functionality, recommendations, and click tracking  
✅ **Realistic User Simulation** - Three personas with different behavior patterns  
✅ **Metrics Collection** - Real CTR, engagement, and performance data  
✅ **Visual Recording** - Captures demo sessions on video  
✅ **Comprehensive Reports** - JSON and CSV exports with detailed analytics

## Quick Start

### 1. Run Demo Mode

Shows a visual demonstration of different user personas:

```bash
npm run browser:demo
```

This will:
- Open a browser window
- Simulate casual, power, and research users
- Record video of the session (saved to `./recordings`)
- Generate a report with metrics

### 2. Collect Metrics

Run 20 automated sessions to gather real data:

```bash
npm run browser:metrics
```

This will:
- Run 20 sessions with random personas
- Collect CTR and engagement metrics  
- Generate `autonomous-browser-report.json`
- Export `autonomous-browser-metrics.csv`

### 3. Run Tests

Validate core functionality:

```bash
npm run browser:test
```

Tests:
- ✅ Search functionality
- ✅ Recommendations display
- ✅ Click tracking

## User Personas

### 👤 Casual User
- **Behavior**: Quick browsing, 1-2 searches
- **Engagement**: Low (50% CTR)
- **Session Duration**: 10-30 seconds

### ⚡ Power User
- **Behavior**: Multiple targeted searches
- **Engagement**: High (80% CTR)
- **Uses Recommendations**: Yes
- **Session Duration**: 30-60 seconds

### 🔬 Research User
- **Behavior**: Deep exploration, 5+ searches
- **Engagement**: Very High (90%+ CTR)
- **Clicks per Session**: 5-10
- **Session Duration**: 60-120 seconds

## Command Line Options

```bash
# Run in headless mode (no browser window)
npx tsx scripts/autonomous-browser.ts --headless

# Custom number of sessions
npx tsx scripts/autonomous-browser.ts --metrics --sessions=50

# Different modes
npx tsx scripts/autonomous-browser.ts --demo
npx tsx scripts/autonomous-browser.ts --metrics
npx tsx scripts/autonomous-browser.ts --test
```

## Output Files

After running, you'll get:

### `autonomous-browser-report.json`
Complete metrics including:
```json
{
  "summary": {
    "totalSessions": 20,
    "overallCTR": 65.5,
    "avgSessionDuration": 45000,
    "recommendationCTR": 42.3
  },
  "personas": {
    "casual": { "ctr": 45.2, "avgClicks": 0.8 },
    "power": { "ctr": 78.5, "avgClicks": 2.4 },
    "research": { "ctr": 92.1, "avgClicks": 7.2 }
  }
}
```

### `autonomous-browser-metrics.csv`
CSV export for analysis in Excel/Google Sheets:
```csv
Persona,Duration(s),Searches,Clicks,RecommendationsViewed,CTR(%)
power,45.2,3,2,5,66.67
research,87.5,5,8,10,90.00
casual,12.3,1,0,0,0.00
```

### `./recordings/` (Demo mode only)
Video recordings of browser sessions

## Sample Report

```
═══════════════════════════════════════════
           AUTONOMOUS BROWSER REPORT        
═══════════════════════════════════════════

📊 OVERALL METRICS

Total Sessions: 20
Overall Statistics: 45
Total Clicks: 28
Overall CTR: 62.22%
Engagement Rate: 85.00%
Avg Session Duration: 42.3s

🎯 RECOMMENDATION METRICS

Total Recommendations Shown: 75
Recommendation Clicks: 32
Recommendation CTR: 42.67%

👥 METRICS BY PERSONA

Casual Users (7 sessions):
  Avg Duration: 18.5s
  Avg Clicks: 0.7
  CTR: 48.57%

Power Users (6 sessions):
  Avg Duration: 48.2s
  Avg Clicks: 2.5
  CTR: 83.33%

Research Users (7 sessions):
  Avg Duration: 68.9s
  Avg Clicks: 6.1
  CTR: 91.43%

💡 INSIGHTS

✅ Good CTR (62%) - Strong user engagement
✅ Recommendations are performing well (43% CTR)
✅ Moderate session engagement (42s avg)
```

## Use Cases

### 1. **Resume Validation**
Generate real metrics to back up your resume claims:
- Get actual CTR percentages
- Measure recommendation performance
- Prove engagement improvements

### 2. **Feature Demonstration**
Record videos showing:
- Search functionality
- AI recommendations
- User engagement patterns

### 3. **Performance Testing**
Validate your search engine:
- Response times
- Result quality
- Click tracking accuracy

### 4. **Continuous Testing**
Integrate into CI/CD for automated testing

## Architecture

```
autonomous-browser.ts      # Main orchestrator
  ├─ browser-scenarios.ts  # User personas & behaviors
  └─ metrics-collector.ts  # Analytics & reporting
```

## Tips

1. **Run demo mode first** to see how it works
2. **Increase sessions** for more reliable metrics (`--sessions=50`)
3. **Use headless mode** for CI/CD (`--headless`)
4. **Analyze CSV exports** in spreadsheets for deeper insights

## Troubleshooting

**Browser doesn't open:**
```bash
# Install Playwright browsers
npx playwright install chromium
```

**No results found:**
- Make sure dev server is running: `npm run dev`
- Check that port 3000 is accessible

**Recordings not saving:**
- Check `./recordings` directory exists
- Ensure you have write permissions

## Next Steps

1. Run metrics collection with more sessions
2. Analyze the CSV data
3. Use insights to improve search ranking
4. Add custom scenarios for specific features
5. Integrate into automated testing pipeline

---

**Pro Tip:** Run `npm run browser:metrics` overnight with `--sessions=100` to gather comprehensive data for your resume!
