// A mock function to mimic making an async request for data

let user = JSON.parse(localStorage.getItem("user"))
export function AddToCart(item) {
  return new Promise(async (resolve, reject) => {
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json",
      authorization:user.token , },
    });

    try {
      let data = await response.json();
      console.log(data);
      resolve({data});
    } catch (error) {
      reject("something wrong");
    }
  });
}
export function getUserCart(user_id) {
  return new Promise(async (resolve) => {
    console.log(user_id);
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/cart/" + user_id,
    {
      headers: { "content-type": "application/json",
      authorization:user.token , },
    }

    );
    let data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
export function removeProduct(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://mern-e-commerce-blond.vercel.app/cart/" + productId, {
      method: "DELETE",
      body: JSON.stringify({ id: productId }),
      headers: { "content-type": "application/json" ,
      authorization:user.token },
    });
    let data = await response.json();
    console.log(data);
    resolve({ productId });
  });
}
export function handelqunatity(value) {
  return new Promise(async (resolve) => {

    const response = await fetch("https://mern-e-commerce-blond.vercel.app/cart/" + value.id, {
      method: "PATCH",
      body: JSON.stringify(value),
      headers: { "content-type": "application/json",
      authorization:user.token  },
    });
    let data = await response.json();
    console.log(data);
    resolve({ data});
  });
}
export function resetCart(user_id) {
  return new Promise(async (resolve) => {
    console.log(user_id);
    let response = await getUserCart(user_id);
    let items = await response.data;
    console.log(items);
    for (let item of items) {
      await removeProduct(item.id);
    }

    console.log(items);
    resolve({ success: "success" });
  });
}
