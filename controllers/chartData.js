const ChartData = require("../models/chartData");

exports.getChartDataRoute = async (req, res, next) => {
    
    try {
        const data = await ChartData.find().exec();
        if (!data) return res.status(401).json({ message: "Unauthorized." });
            
        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." })
    }
}

exports.addChartDataRoute = async (req, res, next) => {
    
    const { title, price } = req.body;

    try {
        const chart = await ChartData.create({
            title, 
            price
        });
        
        res.status(201).json({
            success: true,
            chartdata: chart
        });
    } catch (err) {
        next(err);
    }
}