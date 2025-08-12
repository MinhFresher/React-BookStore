import { useEffect, useState } from "react";
import { getStatistic } from "../../services/adminService";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

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

    const chartData = {
        labels: ['Chờ xác nhận', 'Đã giao', 'Đã thanh toán'],
        datasets: [{
        label: 'Số đơn hàng',
        data: [
            stats.donHangChoXacNhan || 0,
            stats.donHangDaGiao || 0,
            stats.donHangDaThanhToan || 0
        ],
        backgroundColor: ['#8612f3ff', '#e40df7ff', '#059fffff'],
        borderWidth: 1
        }]
    };

    useEffect (() => {
        fetchStats();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <div>
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

                <div className="Statistic" style={{  margin: 'auto' }} >
                    <h3 className="text-center mb-3">Total Orders</h3>
                    <Doughnut data={chartData} />
                </div>
            </div>

            <div className="top-list">
                <div className="top-book-ad">
                    <div className="book-inlist">
                        <h3>Top Seller</h3>
                        <img src="bookImage/frl1_0.png" title="#1" height="300"/>   
                    </div>
                    
                </div>

                <div className="top-cus">
                    <h3>Most Order</h3>
                    <p>Dan</p>
                </div>
            </div>
        </div>
        
    )
}