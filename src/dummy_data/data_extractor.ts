// // Define the product interface
// interface Product {
//     title: string;
//     category: string;
//     description: string;
//     unit: string;
//     img?: string;
//     price: number;
// }

// // Function to extract products from HTML
// function extractProductsFromHTML() {
//     const productContainers = document.querySelectorAll('.food-box');
//     const products: Product[] = [];

//     productContainers.forEach((container) => {
//         const titleElement = container.querySelector('.food-title');
//         const priceElement = container.querySelector('.food-price');
//         const descriptionElements = container.querySelectorAll('.texts-together p');

//         if (titleElement && priceElement && descriptionElements.length >= 2) {
//             const title = titleElement.textContent.trim();
//             const priceMatch = priceElement.textContent.match(/Ksh\.(\d+)/);
//             const price = priceMatch ? parseInt(priceMatch[1]) : 0;
//             const description = descriptionElements[1].textContent.trim();
//             const unit = descriptionElements[0].textContent.trim();
//             const category = container.parentElement?.classList[2] || '';

//             const imgElement = container.querySelector('.food-img');
//             const img = imgElement ? imgElement.getAttribute('src') || '' : '';

//             const product: Product = {
//                 title,
//                 category,
//                 description,
//                 unit,
//                 img,
//                 price,
//             };

//             products.push(product);
//         }
//     });

//     return products;
// }

// // Call the function to extract products
// const products = extractProductsFromHTML();
// console.log(products);


[
    {
        "title": "Fresh Potatoes",
        "category": "vegetables",
        "description": "Fresh Potatoes Best for Fries",
        "unit": "MOQ 3KGS",
        "img": "img/viazi.jpg",
        "price": 50
    },
    {
        "title": "Fresh Onion",
        "category": "vegetables",
        "description": "Fresh Onion Best for Cooking",
        "unit": "MOQ 2KGS",
        "img": "img/kitungu.jfif",
        "price": 200
    },
    {
        "title": "Fresh Carrots",
        "category": "vegetables",
        "description": "Fresh Carrots Best for Cooking",
        "unit": "MOQ 1KGS",
        "img": "img/carrot.webp",
        "price": 70
    },
    {
        "title": "Fresh Gingers",
        "category": "vegetables",
        "description": "Fresh Gingers Best for Cooking",
        "unit": "MOQ 1KGS",
        "img": "img/tangawizi.webp",
        "price": 65
    },
    {
        "title": "Fresh Tomatoes",
        "category": "vegetables",
        "description": "Fresh Tomatoes Best for Cooking",
        "unit": "MOQ 1KGS",
        "img": "img/tomatoes1.webp",
        "price": 100
    },
    {
        "title": "Fresh Garlic",
        "category": "vegetables",
        "description": "Fresh Garlics Best for Cooking",
        "unit": "MOQ 1KGS",
        "img": "img/garlic.jpg_480Wx480H",
        "price": 160
    },
    {
        "title": "Fresh Pineapple",
        "category": "fruits",
        "description": "Fresh Pineapple Best For Juice",
        "unit": "Per Pc",
        "img": "img/pina.jpg",
        "price": 80
    },
    {
        "title": "Fresh Avocadoes",
        "category": "fruits",
        "description": "Fresh Avocadoes Best For Juice",
        "unit": "Per Pc",
        "img": "img/avocado.jpg",
        "price": 30
    },
    {
        "title": "Fresh Oranges",
        "category": "fruits",
        "description": "Fresh Oranges Best for juice",
        "unit": "Per Pc",
        "img": "img/oranges.jpg",
        "price": 15
    },
    {
        "title": "Fresh Apples",
        "category": "fruits",
        "description": "Fresh Apples Best for juice",
        "unit": "Per Pc",
        "img": "img/apples.webp",
        "price": 25
    },
    {
        "title": "Fresh Mangoes",
        "category": "fruits",
        "description": "Fresh Mangoes Best for juice",
        "unit": "Per Pc",
        "img": "img/mangoes.jpeg",
        "price": 30
    },
    {
        "title": "Fresh Mangoes",
        "category": "fruits",
        "description": "Fresh Mangoes Best for juice",
        "unit": "Per Pc",
        "img": "img/mangoes.jpeg",
        "price": 30
    },
    {
        "title": "Maharagwe",
        "category": "cereals",
        "description": "Availability subject to stocks and seasonality",
        "unit": "MOQ 1KGS",
        "img": "img/maharagwe.webp",
        "price": 120
    },
    {
        "title": "Dengu Nzima",
        "category": "cereals",
        "description": "Availability subject to stocks and seasonality",
        "unit": "MOQ 1KGS",
        "img": "img/lentis.jpg",
        "price": 140
    },
    {
        "title": "Maize Seeds",
        "category": "cereals",
        "description": "Availability subject to stocks and seasonality",
        "unit": "MOQ 1KGS",
        "img": "img/mahindi.jpg",
        "price": 150
    },
    {
        "title": "Pojo Nzima",
        "category": "cereals",
        "description": "Availability subject to stocks and seasonality",
        "unit": "MOQ 1KGS",
        "img": "img/pojo.jpg",
        "price": 130
    },
    {
        "title": "Chick Peas",
        "category": "cereals",
        "description": "Availability subject to stocks and seasonality",
        "unit": "MOQ 1KGS",
        "img": "img/chpea.jpg",
        "price": 240
    },
    {
        "title": "White Beans",
        "category": "cereals",
        "description": "Availability subject to stocks and seasonality",
        "unit": "MOQ 1KGS",
        "img": "img/whitebeans.jpg",
        "price": 120
    }
]