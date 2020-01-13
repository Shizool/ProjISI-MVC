const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.find()
      .then(products => {
        res.render('index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/'
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getProducts = (req, res, next) => {
    Product.find()
      .then(products => {
        res.render('products', {
          prods: products,
          pageTitle: 'All Products',
          path: '/products'
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        res.render('product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
      })
      .catch(err => console.log(err));
  };

  exports.getAddProduct = (req, res, next) => {
    res.render('edit-product', {
      pageTitle: 'Add Product',
      path: '/add-product',
      editing: false
    });
  };

  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
      title: title,
      price: price,
      description: description
    });
    product
      .save()
      .then(result => {
        console.log('Created Product');
        res.redirect('/products');
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return res.redirect('/');
        }
        res.render('edit-product', {
          pageTitle: 'Edit Product',
          path: '/edit-product',
          editing: editMode,
          product: product
        });
      })
      .catch(err => console.log(err));
  };
  
  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
  
    Product.findById(prodId)
      .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        return product.save();
      })
      .then(result => {
        console.log('Updated product');
        res.redirect('/products');
      })
      .catch(err => console.log(err));
  };

  exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
      .then(() => {
        console.log('Deleted product');
        res.redirect('/products');
      })
      .catch(err => console.log(err));
  };