const User = require("../models/UserModel");
const Car = require("../models/CarModel");

exports.getAnalytics = async (req, res) => {
  try {
    // ✅ Counts from DB
    const totalBuyers = await User.countDocuments({ role: "buyer" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalCars = await Car.countDocuments();

    // ✅ Revenue from DB (assuming price field exists)
    const cars = await Car.find();
    const totalRevenue = cars.reduce((sum, car) => sum + (car.price || 0), 0);

    // ✅ Monthly data from DB
    const monthlyDataRaw = await Car.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          sales: { $sum: 1 },
          revenue: { $sum: "$price" },
        },
      },
      { $sort: { "_id": 1 } }
    ]);

    // Convert month number → name
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const monthlyData = monthlyDataRaw.map(item => ({
      month: months[item._id - 1],
      sales: item.sales,
      revenue: item.revenue,
    }));

    // ✅ Top seller (based on number of cars)
    const topSellerData = await Car.aggregate([
      {
        $group: {
          _id: "$seller",
          totalCars: { $sum: 1 },
        },
      },
      { $sort: { totalCars: -1 } },
      { $limit: 1 },
    ]);

    let topSeller = "N/A";
    if (topSellerData.length > 0) {
      const seller = await User.findById(topSellerData[0]._id);
      topSeller = seller?.name || "N/A";
    }

    // ✅ Most listed car (by name)
    const topCarData = await Car.aggregate([
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const topCar = topCarData[0]?._id || "N/A";

    // ✅ Approval rate
    const approvedCount = await Car.countDocuments({ approved: true });
    const approvalRate = totalCars === 0 ? 0 : Math.round((approvedCount / totalCars) * 100);

    // ✅ Best month (highest sales)
    let bestMonth = "N/A";
    if (monthlyData.length > 0) {
      const max = monthlyData.reduce((a, b) => (a.sales > b.sales ? a : b));
      bestMonth = max.month;
    }

    res.json({
      totalBuyers,
      totalSellers,
      totalCars,
      totalRevenue,
      monthlyData,
      topSeller,
      topCar,
      approvalRate,
      bestMonth,
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const totalBuyers = await User.countDocuments({ role: "buyer" });
    const totalCars = await Car.countDocuments();

    // Revenue
    const cars = await Car.find();
    const totalRevenue = cars.reduce((sum, car) => sum + (car.price || 0), 0);

    // Pending cars (not approved)
    const pendingCars = await Car.countDocuments({ approved: false });

    res.json({
      totalBuyers,
      totalCars,
      totalRevenue,
      pendingCars,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};