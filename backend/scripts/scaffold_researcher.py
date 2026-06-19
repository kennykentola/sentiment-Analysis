import os

RESEARCHER_PAGES = [
    ("ResearchProjects", "Research Projects", "Manage your ongoing research projects and collaborate with peers."),
    ("SentimentAnalysis", "Sentiment Analysis", "Deep-dive into sentiment metrics and comparative sentiment research."),
    ("TopicModelling", "Topic Modelling", "Analyze latent topics and themes across large text corpora."),
    ("TrendAnalysis", "Trend Analysis", "Identify and analyze long-term shifts in public opinion."),
    ("UniversityAnalysis", "University Analysis", "Compare sentiment and public discourse across different institutions."),
    ("RegionalAnalysis", "Regional Analysis", "Geospatial sentiment tracking and demographic correlations."),
    ("Reports", "Reports", "Generate and export comprehensive academic reports."),
    ("SavedQueries", "Saved Queries", "Access and rerun your frequently used data queries."),
    ("ExportCenter", "Export Center", "Manage your batch exports and download history."),
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
        if not os.path.exists(path):
            with open(path, "w") as f:
                f.write(TEMPLATE.format(component_name=comp, title=title, description=desc))
            print(f"Created {path}")

create_files(RESEARCHER_PAGES, "../frontend/src/features/researcher")
