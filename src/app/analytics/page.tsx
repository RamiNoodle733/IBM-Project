import { AnalyticsDashboardClient } from "@/components/analytics/AnalyticsDashboardClient";

export default function AnalyticsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Engagement Analytics</h1>
        <p>Track demo engagement, lead scores, and recommended next actions.</p>
      </div>
      <AnalyticsDashboardClient />
    </div>
  );
}
