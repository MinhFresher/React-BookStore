import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getStatistic } from "../../services/adminService";
import "../../styles/DashBoardPafe.css"

export default function Dashboard(){
    const [stats, setStats] = useState([]);

    const fetchStats = async () => {
        try {
        const data = await getStatistic();
        setStats(data);
        } catch (err) {
        console.error("❌ Failed to fetch Statistics:", err);
        }
    };

    useEffect (() => {
        fetchStats();
    }, []);

    return (
        <div class="dashboard-wrapper">
            <div>
                <h2>Admin Dashboard</h2>
                <div className="stats-form">
                    <div className="stat">
                        <p className="n-stat">Total Người dùng</p>
                        <p className="d-stat">{stats.totalNguoiDung}</p>
                    </div>
                    <div className="stat">
                        <p className="n-stat">Total Đơn hàng</p>
                        <p className="d-stat">{stats.totalDonHang}</p>
                    </div>
                    <div className="stat">
                        <p className="n-stat">Đơn đã giao</p>
                        <p className="d-stat">{stats.donHangDaGiao}</p>
                    </div>
                    <div className="stat">
                        <p className="n-stat">Doanh thu</p>
                        <p className="d-stat">{stats.totalDoanhThu}</p>
                    </div>
                </div>

                <div className="Statistic">

                </div>
            </div>
        </div>
        
    )
}