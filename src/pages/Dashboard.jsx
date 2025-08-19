import { BarChart3, Users, DollarSign, Activity } from "lucide-react";
import { useUser } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

/**
 * Dashboard page - main authenticated view
 * Features: Welcome message, stats cards, user-specific content
 */

const stats = [
  {
    name: "Total Users",
    stat: "71,897",
    icon: Users,
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Revenue",
    stat: "$405,091.00",
    icon: DollarSign,
    change: "4.05%",
    changeType: "increase",
  },
  {
    name: "Active Sessions",
    stat: "58.16%",
    icon: Activity,
    change: "2.02%",
    changeType: "decrease",
  },
  {
    name: "Performance",
    stat: "24.57%",
    icon: BarChart3,
    change: "0.95%",
    changeType: "increase",
  },
];

export function Dashboard() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {item.stat}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span
                    className={
                      item.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {item.changeType === "increase" ? "+" : "-"}
                    {item.change}
                  </span>
                  <span className="text-gray-500"> from last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-900">
                Create New Project
              </div>
              <div className="text-sm text-gray-600">
                Start a new project or initiative
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-900">
                Invite Team Members
              </div>
              <div className="text-sm text-gray-600">
                Add new users to your workspace
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-900">View Reports</div>
              <div className="text-sm text-gray-600">
                Access detailed analytics and insights
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Project Alpha completed
                </p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  New user registration
                </p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  System maintenance scheduled
                </p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <BarChart3 className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              React SPA Template
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                This is a demo dashboard for the React SPA template. Customize
                this page and add your own features, data, and functionality.
                The template includes:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Authentication with React Query</li>
                <li>Responsive layout with sidebar navigation</li>
                <li>API integration with Axios</li>
                <li>Error handling and loading states</li>
                <li>Tailwind CSS styling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
