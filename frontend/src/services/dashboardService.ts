
import api from "./api";
import type {
  DashboardOverview,
  ConsultationTrend,
  FacilityPerformance,
  RoutingPerformance,
  OperationalAlert,
} from "../types/dashboard";

export const dashboardService = {
  async getOverview(): Promise<DashboardOverview> {
    const response = await api.get<DashboardOverview>(
      "/api/dashboard/overview"
    );
    return response.data;
  },

  async getTrends(): Promise<ConsultationTrend[]> {
    const response = await api.get<ConsultationTrend[]>(
      "/api/dashboard/trends"
    );
    return response.data;
  },

  async getFacilities(): Promise<FacilityPerformance[]> {
    const response = await api.get<FacilityPerformance[]>(
      "/api/dashboard/facilities"
    );
    return response.data;
  },

  async getRouting(): Promise<RoutingPerformance[]> {
    const response = await api.get<RoutingPerformance[]>(
      "/api/dashboard/routing"
    );
    return response.data;
  },

  async getAlerts(): Promise<OperationalAlert[]> {
    const response = await api.get<OperationalAlert[]>(
      "/api/dashboard/alerts"
    );
    return response.data;
  },
};
