import os

VIEWER_PAGES = [
    ("SentimentTrends", "Sentiment Trends", "Analyze historical shifts and evolving public opinions over time."),
    ("Universities", "Universities", "Browse sentiment breakdowns and public opinion specifically tailored to individual institutions."),
    ("RegionalAnalysis", "Regional Analysis", "Explore sentiment demographics and geographic distribution of public opinions."),
    ("Topics", "Topics", "Dive into specific topics, policies, and key subjects driving the conversation."),
    ("PublicReports", "Public Reports", "Access published reports and official sentiment summaries."),
]

ANALYST_PAGES = [
    ("TopicModelling", "Topic Modelling", "Advanced NLP topic extraction and cluster analysis."),
    ("TrendAnalysis", "Trend Analysis", "Deep-dive statistical analysis of sentiment trajectories."),
    ("DataSources", "Data Sources", "Manage and monitor data ingestion streams and API connections."),
    ("CollectionJobs", "Collection Jobs", "Schedule and monitor background scraping and ingestion tasks."),
    ("UniversityAnalysis", "University Analysis", "Comparative analytics and metrics tracking for academic institutions."),
    ("RegionalAnalysis", "Regional Analysis", "Geospatial sentiment mapping and demographic breakdowns."),
    ("Search", "Advanced Search", "Full-text search and complex querying across all indexed social posts."),
    ("Reports", "Reports", "Generate and schedule automated analytical reports."),
]

SHARED_PAGES = [
    ("ProfileSettings", "Profile Settings", "Manage your account, credentials, and personal preferences."),
    ("Notifications", "Notifications", "View alerts, system updates, and scheduled job statuses."),
]

TEMPLATE = """import PlaceholderPage from '@/components/ui/PlaceholderPage';

export default function {component_name}() {{
  return (
    <PlaceholderPage 
      title="{title}" 
      description="{description}" 
    />
  );
}}
"""

def create_files(pages, directory):
    os.makedirs(directory, exist_ok=True)
    for comp, title, desc in pages:
        path = os.path.join(directory, f"{comp}.tsx")
        with open(path, "w") as f:
            f.write(TEMPLATE.format(component_name=comp, title=title, description=desc))
        print(f"Created {path}")

create_files(VIEWER_PAGES, "../frontend/src/features/viewer")
create_files(ANALYST_PAGES, "../frontend/src/features/analyst")
create_files(SHARED_PAGES, "../frontend/src/features/shared")
