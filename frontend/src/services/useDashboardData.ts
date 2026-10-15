
import { useCallback, useEffect, useState } from "react";
import { dashboardService } from "./dashboardService";
import type {
  DashboardOverview,
  ConsultationTrend,
  FacilityPerformance,
  RoutingPerformance,
  OperationalAlert,
} from "../types/dashboard";

interface DashboardData {
  overview: DashboardOverview | null;
  trends: ConsultationTrend[];
  facilities: FacilityPerformance[];
  routing: RoutingPerformance[];
  alerts: OperationalAlert[];
}

const initialData: DashboardData = {
  overview: null,
  trends: [],
  facilities: [],
  routing: [],
  alerts: [],
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [overview, trends, facilities, routing, alerts] =
        await Promise.all([
          dashboardService.getOverview(),
          dashboardService.getTrends(),
          dashboardService.getFacilities(),
          dashboardService.getRouting(),
          dashboardService.getAlerts(),
        ]);

      setData({ overview, trends, facilities, routing, alerts });
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError(
        "Unable to load dashboard data. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return { ...data, loading, error, refresh: loadDashboard };
}
