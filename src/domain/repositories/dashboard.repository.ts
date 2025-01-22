export interface DashboardRepository {
  getDashboard(userId: any): Promise<any>;
}
