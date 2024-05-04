import Product from "../models/product.model.js"
import ApiFeature from "../utils/apifeatures.js";

// create product
export const createProduct = async (req, res) => {
    try {
        req.body.user = req.user.id
        const product = await Product.create(req.body);
        res.status(201).json(product)
    } catch (error) {
        console.log("Error in create product controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// get all products
export const getAllproducts = async (req, res) => {
    try {
        const resultPerPage = 10;

        const apiFeature = new ApiFeature(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage)
        const products = await apiFeature.query;

        res.status(200).json(products)
    } catch (error) {
        console.log("Error in get all product controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// get product details
export const getProductDetails = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(500).json({ message: "Product not found" })
        }

        res.status(200).json({ product, productCount })
    } catch (error) {
        console.log("Error in get product detail controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// update product
export const updateProduct = async (req, res) => {
    try {
        let product = Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({ message: "Product not found" })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log("Error in update product controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(500).json({ message: "Product not found" })
        }

        await product.deleteOne();
        res.status(200).json({ message: "Product delete successfully" })
    } catch (error) {
        console.log("Error in delete product controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }

}

// creara new revies or update review
export const createProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body

        const review = {
            user: req.user._id,
            name: req.user.fullName,
            rating: Number(rating),
            comment,
        }

        const product = await Product.findById(productId)

        const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString())
                    (rev.rating = rating), (rev.comment = comment)
            });
        } else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }
        let avg = 0

        product.reviews.forEach((rev) => {
            avg += rev.rating
        })
        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false })

        res.status(200).json({ message: "review done successfully" })
    } catch (error) {
        console.log("Error in product review controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// get all reviews of products
export const getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id)

        if (!product) {
            return res.status(404).json({ Error: "Product Not Found" })
        }

        res.status(200).json({
            reviews: product.reviews
        })
    } catch (error) {
        console.log("Error in get product review controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// delete reviews
export const deleteReview = async (req, res) => {
    try {
        const product = await Product.findById(req.query.productId)

        if (!product) {
            return res.status(404).json({ Error: "Product Not Found" })
        }

        const reviews = product.reviews.filter((rev) => { rev._id.toString() !== req.query.id.toString() })

        let avg = 0
        reviews.forEach((rev) => {
            avg += rev.rating
        })
        const ratings = avg / reviews.length;

        const numOfReviews = reviews.length

        await Product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({ message: "Product Delete Successfully" })
    } catch (error) {
        console.log("Error in delete product review controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}