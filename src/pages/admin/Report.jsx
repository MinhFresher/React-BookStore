import { LineChart,  Line, XAxis,  YAxis,  CartesianGrid,  Tooltip,  Legend,  ResponsiveContainer } from "recharts";

export default function ReportPage (){
    const revenueData = [
        { month: "Jan", revenue: 150000 },
        { month: "Feb", revenue: 200000 },
        { month: "Mar", revenue: 180000 },
        { month: "Apr", revenue: 220000 },
        { month: "May", revenue: 240000 },
        { month: "Jun", revenue: 210000 },
        { month: "Jul", revenue: 260000 },
        { month: "Aug", revenue: 300000 }
    ];

    const ordersData = [
        { week: "Week 1", orders: 120 },
        { week: "Week 2", orders: 135 },
        { week: "Week 3", orders: 150 },
        { week: "Week 4", orders: 160 },
        { week: "Week 5", orders: 140 }
    ];

    return (
        <div className="management-container">
            <h2 className="section-title">Report</h2>

            <div className="chart-style">
                <h2>Doanh Thu Each Month</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#6366f1', strokeWidth: 2 }}
                        activeDot={{ r: 7, fill: '#6366f1', strokeWidth: 2, boxShadow: '0 0 10px #6366f1' }}
                    />
                    </LineChart>
                </ResponsiveContainer>

                <h2 style={{ marginTop: "40px" }}> Đơn Hàng Each Week</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} đơn`} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#10b981', strokeWidth: 2 }}
                        activeDot={{ r: 7, fill: '#10b981', strokeWidth: 2, boxShadow: '0 0 10px #10b981' }}
                    />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}