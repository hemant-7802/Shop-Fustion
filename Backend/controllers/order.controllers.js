import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Create New Order
export const newOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        })

        res.status(200).json(order)
    } catch (error) {
        console.log("Error in new order controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// get single order
export const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({ Error: "Order not found with this id" })
        }

        res.status(200).json(order)
    } catch (error) {
        console.log("Error in get single order controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// get logged in user order
export const myOrders = async (req, res) => {
    try {
        const order = await Order.findById({ user: req.user._id })

        res.status(200).json(order)
    } catch (error) {
        console.log("Error in my order controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// get all orders --admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()

        let totalAmount = 0

        orders.forEach((order) => {
            totalAmount += order.totalPrice
        })

        res.status(200).json({ orders, totalAmount })
    } catch (error) {
        console.log("Error in get all orders controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// update order status --admin
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order.orderStatus === "Delivered") {
            return res.status(500).json({ message: "You have already delivered this order" })
        }

        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity)
        })

        order.orderStatus = req.body.status

        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now()
        }

        await order.save({ validateBeforeSave: true })

        res.status(200).json({ order })
    } catch (error) {
        console.log("Error in update orders controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id)

    product.stock -= quantity

    await product.save()
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if(!order) {
            return res.status(500).json({message:"Order not found with this ID"})
        }

        await order.deleteOne();

        res.status(200).json({ message: "Order deleted successfully" })
    } catch (error) {
        console.log("Error in delete order controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}