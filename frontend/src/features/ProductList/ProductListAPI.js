// A mock function to mimic making an async request for data

// let user = JSON.parse(localStorage.getItem("user"))
export function FetchProduct(token) {
  return new Promise(async (resolve) => {
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/products",

    {
      headers: {
        "Content-Type": "application/json",
        authorization:token ,
      },
    }
    );
    let data = await response.json();
    resolve(data);
    // console.log(data);
  });
}

// add product
export function CreateProduct(product,token) {
  return new Promise(async (resolve) => {
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json",
      authorization:token ,
    },
    });

    let data = await response.json();
    resolve(data);
    // console.log(data);
  });
}

export function FilterProduct(filter, sort, pagination,search_qurey,token) {
  let queryString = "";
  console.log(search_qurey,"search_qurey")

  // filter
  // https://mern-e-commerce-blond.vercel.app /products?category=smartphones
  // https://mern-e-commerce-blond.vercel.app /products?brand=apple

  for (let key in filter) {
    let categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  // sort
  // https://mern-e-commerce-blond.vercel.app /products?_sort=asc&
  // https://mern-e-commerce-blond.vercel.app /products?_sort=desc&
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in search_qurey) {
    if(search_qurey.search){
      queryString += `${key}=${search_qurey[key]}&`;
    }

  }

  // pagination
  // https://mern-e-commerce-blond.vercel.app /products?_limit=10&_page=3

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  console.log(queryString, "queryString");
  return new Promise(async (resolve) => {
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/products?" + queryString,
    {
      headers: {
        "Content-Type": "application/json",
        authorization:token ,
      },
    }
    );
    let data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: data, totalproduct: totalItems });
    console.log(data);
  });
}

export function selectedProduct(id,token) {
  console.log(token);
  return new Promise(async (resolve) => {
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/products/" + id,

    {
      headers: {
        "Content-Type": "application/json",
        authorization:token ,
      },
    }
    );
    let data = await response.json();
    resolve(data);
    console.log(data);
  });
}
// edit product

export function updateProduct(product,token) {
  return new Promise(async (resolve) => {
    let response = await fetch(`https://mern-e-commerce-blond.vercel.app/products/` + product.id, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json",
      authorization:token ,

    },
    });

    let data = await response.json();
    resolve(data);
    // console.log(data);
  });
}

// delete product
